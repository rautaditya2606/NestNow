const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/nestnow";

async function main() {
    try {
        await mongoose.connect(Mongo_URL);
        console.log("Connection Successful");

        await initDB();
    } catch (err) {
        console.error("Connection Error:", err);
    }
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        // Access the listings from initData.data[0] (as it's wrapped inside an array)
        await Listing.insertMany(initData.data[0]);

        console.log("Data was initialized");
    } catch (error) {
        console.error("Error initializing data:", error);
    }
};

main();
