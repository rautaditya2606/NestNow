require("dotenv").config();
if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
// const Mongo_URL = "mongodb://127.0.0.1:27017/nestnow";
const path = require("path");
const ejsMate = require("ejs-mate");
const Review = require("./models/review.js");
const listingRouter = require("./router/listings.js");
const reviewRouter = require("./router/review.js");
const userRouter = require("./router/user.js");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const { isLoggedIn, isOwner } = require("./middleware.js");
const MongoStore = require("connect-mongo");
const dburl = process.env.ATLASDB_URL;



// Middleware
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



//mongo session store
const store = MongoStore.create({
  mongoUrl: dburl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.SECRET,
  },
  mongoOptions: {
    serverSelectionTimeoutMS: 60000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    ssl: true,
    tls: true,
    tlsAllowInvalidHostnames: false,
    tlsAllowInvalidCertificates: false,
    minPoolSize: 0
  }
});

// Session Configuration 
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  },
  rolling: true
};

// Session must be before passport
app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global middleware for templates and session management
app.use((req, res, next) => {
  // current user available in templates
  res.locals.currentUser = req.user;

  // flash messages 
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  // Store original url in session if it's not a login or logout request
  if (!['/login', '/logout', '/register'].includes(req.originalUrl)) {
    req.session.previousUrl = req.originalUrl;
  }

  next();
});

// Route handlers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// MongoDB Connection
async function connectWithRetry() {
  const options = {
    serverSelectionTimeoutMS: 60000,
    heartbeatFrequencyMS: 2000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    bufferCommands: true,
    ssl: true,
    tls: true,
    tlsAllowInvalidHostnames: false,
    tlsAllowInvalidCertificates: false,
    minPoolSize: 0
  };

  try {
    await mongoose.connect(dburl, options);
    console.log("MongoDB Connection Successful");
    return true;
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    return false;
  }
}

async function main() {
  // Try to connect up to 5 times
  for (let i = 0; i < 5; i++) {
    const connected = await connectWithRetry();
    if (connected) {
      break;
    }
    if (i < 4) { // Don't wait after the last attempt
      console.log(`Retrying connection in 5 seconds... (Attempt ${i + 2}/5)`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  // Set up connection event handlers
  mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    connectWithRetry(); // Try to reconnect
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected successfully');
  });
}

main();

// Home Route
app.get("/", async (req, res) => {
  try {
    const listings = await Promise.race([
      Listing.find({}).limit(6),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), 15000)
      )
    ]);
    res.render("listings/home.ejs", { listings });
  } catch (err) {
    console.error("Error fetching listings:", err);
    if (!res.headersSent) {
      res.render("listings/home.ejs", { listings: [] });
    }
  }
});

app.get("/about", (req, res) => {
  res.render("./listings/about.ejs");
});

app.get("/contact", (req, res) => {
  const success = req.query.success === 'true';
  res.render("./listings/contact.ejs", { success });
});

app.get("/home", isLoggedIn, (req, res) => {
  // const currUser = req.user;
  res.render("./listings/home.ejs");

});

// Add this before the 404 Error Middleware
app.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.redirect("/listings");
    }

    const searchResults = await Listing.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    res.render("./listings/search.ejs", {
      listings: searchResults,
      searchQuery: q
    });
  } catch (err) {
    console.error("Search error:", err);
    req.flash("error", "Error performing search");
    res.redirect("/listings");
  }
});

// 404 Error Middleware
app.use((req, res) => {
  res.status(404).render("./listings/error.ejs", { err: "Page Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  if (!res.headersSent) {
    res.status(statusCode).render("./listings/error", { err });
  }
});

// Server Listen
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please try another port or kill the process using this port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});