const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.new= async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return res.status(404).send("Listing not found");
      }
  
      const newReview = new Review({
          name: req.body.name,
          comment: req.body.comment,
          rating: parseInt(req.body.review.rating), // Make sure to parse the rating
        });
      newReview.name= req.user._id;
      console.log(newReview);
      await newReview.save();
  
      // Initialize the review array if it doesn't exist
      if (!listing.review) {
        listing.review = [];
      }
  
      // Add the new review to the listing's review array
      listing.review.push(newReview); 
      await listing.save();
      req.flash("success","New review added");
      res.redirect(`/listings/${listing._id}`);
    } catch (err) {
      console.error("Error creating review:", err);
      res.status(500).send("Error creating review");
    }
  }

  module.exports.delete = async (req, res) => {
    const { id, reviewId } = req.params; // id is passed from the parent route
    try {
      // Pull the review from the listing's reviews array
      await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
      // Delete the review document itself
      await Review.findByIdAndDelete(reviewId);
      req.flash("success","Review deleted");
      res.redirect(`/listings/${id}`);
    } catch (err) {
      console.error("Error deleting review:", err);
      res.status(500).send("Error deleting review");
    }
  }