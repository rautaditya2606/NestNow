// Environment variables setup
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

// Required modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Models and Routes
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user");
const listingRouter = require("./router/listings.js");
const reviewRouter = require("./router/review.js");
const userRouter = require("./router/user.js");
const { isLoggedIn } = require("./middleware.js");

// Initialize Express app
const app = express();
const port = process.env.PORT || 8080;
const dbUrl = process.env.ATLASDB_URL;

// Verify environment variables
if (!dbUrl) {
  console.error("FATAL ERROR: ATLASDB_URL is not defined in environment variables.");
  process.exit(1);
}

// Database connection
async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
}

// Connection event listeners
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Mongoose disconnected");
});

// Express configuration
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session configuration
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.SECRET
  }
});

store.on("error", function(e) {
  console.error("SESSION STORE ERROR", e);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  },
  rolling: true
};

app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  
  if (!['/login', '/logout', '/register'].includes(req.originalUrl)) {
    req.session.previousUrl = req.originalUrl;
  }
  
  next();
});

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Home route
app.get("/", async (req, res) => {
  try {
    const listings = await Listing.find({}).limit(6);
    res.render("listings/home.ejs", { listings });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.render("listings/home.ejs", { listings: [] });
  }
});

// About route
app.get("/about", (req, res) => {
  res.render("listings/about.ejs");
});

// Contact route
app.get("/contact", (req, res) => {
  const success = req.query.success === 'true';
  res.render("listings/contact.ejs", { success });
});

// Search route
app.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.redirect("/listings");

    const searchResults = await Listing.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    res.render("listings/search.ejs", {
      listings: searchResults,
      searchQuery: q
    });
  } catch (err) {
    console.error("Search error:", err);
    req.flash("error", "Error performing search");
    res.redirect("/listings");
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("listings/error.ejs", { err: "Page Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("listings/error", { err });
});

// Start server only after DB connection
main().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(err => {
  console.error("Failed to start server:", err);
});