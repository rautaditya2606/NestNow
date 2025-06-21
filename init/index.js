require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const dburl = process.env.ATLASDB_URL;

async function main() {
    try {
        await mongoose.connect(dburl);
        console.log("Connection Successful");

        await initDB();
    } catch (err) {
        console.error("Connection Error:", err);
    }
}

const initDB = async () => {
    try {
        // Clear existing data
        await Listing.deleteMany({});
        await User.deleteMany({});
        
        // Create a test user first
        const testUser = new User({
            email: "rautaditya2606@gmail.com",
            username: "adityaraut"
        });
        
        // Register the user (this will hash the password)
        const registeredUser = await User.register(testUser, "testpassword123");
        console.log("Test user created:", registeredUser.username);
        
        // Update the sample data with the actual user ID
        const updatedListings = initData.data[0].map(listing => ({
            ...listing,
            owner: {
                _id: registeredUser._id,
                email: registeredUser.email,
                username: registeredUser.username
            }
        }));
        
        // Insert the listings
        await Listing.insertMany(updatedListings);
        console.log("Sample listings inserted successfully");
        
        console.log("Database initialized with dummy data!");
        process.exit(0);
    } catch (error) {
        console.error("Error initializing data:", error);
        process.exit(1);
    }
};

main();
