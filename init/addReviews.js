require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const Review = require("../models/review.js");

const dburl = process.env.ATLASDB_URL;

const sampleReviews = [
    {
        comment: "Absolutely stunning property! The views are breathtaking and the amenities are top-notch.",
        rating: 5
    },
    {
        comment: "Great location and very clean. Would definitely recommend to others.",
        rating: 4
    },
    {
        comment: "Perfect for a weekend getaway. The host was very responsive and helpful.",
        rating: 5
    },
    {
        comment: "Beautiful place with amazing architecture. The interior design is impeccable.",
        rating: 4
    },
    {
        comment: "Excellent value for money. The property exceeded our expectations.",
        rating: 5
    },
    {
        comment: "Peaceful and quiet location. Perfect for relaxation and unwinding.",
        rating: 4
    },
    {
        comment: "Modern amenities with a touch of luxury. Highly recommended!",
        rating: 5
    },
    {
        comment: "The property is exactly as described. Very satisfied with our stay.",
        rating: 4
    }
];

async function addReviews() {
    try {
        await mongoose.connect(dburl);
        console.log("Connected to MongoDB");

        // Get all listings
        const listings = await Listing.find({});
        const users = await User.find({});

        if (listings.length === 0) {
            console.log("No listings found. Please run the init script first.");
            process.exit(1);
        }

        if (users.length === 0) {
            console.log("No users found. Please run the init script first.");
            process.exit(1);
        }

        console.log(`Found ${listings.length} listings and ${users.length} users`);

        // Add reviews to each listing
        for (let i = 0; i < listings.length; i++) {
            const listing = listings[i];
            
            // Add 2-4 reviews per listing
            const numReviews = Math.floor(Math.random() * 3) + 2; // 2-4 reviews
            
            for (let j = 0; j < numReviews; j++) {
                const reviewData = sampleReviews[Math.floor(Math.random() * sampleReviews.length)];
                const randomUser = users[Math.floor(Math.random() * users.length)];
                
                const review = new Review({
                    name: randomUser._id,
                    comment: reviewData.comment,
                    rating: reviewData.rating
                });
                
                await review.save();
                
                // Add review to listing
                listing.review.push(review._id);
            }
            
            await listing.save();
            console.log(`Added ${numReviews} reviews to listing: ${listing.title}`);
        }

        console.log("Reviews added successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error adding reviews:", error);
        process.exit(1);
    }
}

addReviews(); 