const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// Create a review
router.post("/", isLoggedIn, (reviewController.new));

// Delete a review
router.delete("/:reviewId", isLoggedIn, (reviewController.delete));

module.exports = router;
