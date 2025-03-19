const Listing = require("../models/listing.js");
const validateAndFindListing = require("../utils/listingUtils.js");

module.exports.index = async (req, res) => {
    try {
        const allListings = await Listing.find({}).populate("review");
        res.render("./listings/index.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings:", err);
        req.flash("error", "Failed to fetch listings");
        res.render("./listings/error.ejs", { err });
    }
};

module.exports.renderNew = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.profile = async (req, res) => {
    try {
        const user = req.user;
        console.log("User ID:", user._id);

        // Fetch listings with reviews populated
        const listings = await Listing.find({ "owner._id": user._id.toString() })
            .populate({
                path: "review",
                populate: {
                    path: "name"
                }
            });

        console.log("Found listings:", listings.length);

        // Calculate total reviews
        const totalReviews = listings.reduce((total, listing) => {
            console.log("Listing ID:", listing._id, "Reviews:", listing.review);
            return total + (listing.review ? listing.review.length : 0);
        }, 0);

        console.log("Total Reviews:", totalReviews);

        res.render("./listings/profile.ejs", {
            user,
            listings,
            totalReviews,
            totalProperties: listings.length
        });
    } catch (err) {
        console.error("Error fetching profile data:", err);
        req.flash("error", "Failed to fetch profile data");
        res.redirect("/listings");
    }
};

module.exports.create = async (req, res) => {
    try {
        console.log("Full request body:", req.body);
        console.log("File details:", req.file);

        // Initialize listing data
        const listingData = {
            title: req.body.listing?.title,
            description: req.body.listing?.description,
            price: req.body.listing?.price,
            location: req.body.listing?.location,
            country: req.body.listing?.country
        };

        // Validate required fields
        const missingFields = Object.entries(listingData)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            console.log("Missing fields:", missingFields);
            req.flash("error", `Missing required fields: ${missingFields.join(", ")}`);
            return res.redirect("/listings/new");
        }

        // Create new listing
        const newListing = new Listing({
            ...listingData,
            owner: {
                _id: req.user._id,
                email: req.user.email,
                username: req.user.username
            }
        });

        // Handle image
        if (!req.file) {
            req.flash("error", "Image is required");
            return res.redirect("/listings/new");
        }

        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };

        console.log("Saving listing:", newListing);
        await newListing.save();
        req.flash("success", "Nest added successfully");
        res.redirect("/listings");
    } catch (err) {
        console.error("Error creating listing:", err);
        req.flash("error", `Error creating listing: ${err.message}`);
        return res.redirect("/listings/new");
    }
};


module.exports.show = async (req, res) => {
    try {
        const { error, listing } = await validateAndFindListing(req.params.id, req, res);
        if (error) return res.redirect("/listings");

        res.render("./listings/show.ejs", { listing, currUser: req.user });
    } catch (err) {
        console.error("Error finding listing:", err);
        req.flash("error", "Listing not found");
        res.redirect("/listings");
    }
};

module.exports.renderEdit = async (req, res) => {
    try {
        const { error, listing } = await validateAndFindListing(req.params.id, req, res);
        if (error) return res.redirect("/listings");
        res.render("./listings/edit.ejs", { listing });
    } catch (err) {
        console.error("Error finding listing:", err);
        req.flash("error", "Error finding listing");
        res.redirect("/listings");
    }
}

module.exports.update = async (req, res) => {
    try {
        let { id } = req.params;

        // Validate listing exists and user has permission
        const { error, listing } = await validateAndFindListing(id, req, res);
        if (error) return res.redirect("/listings");

        // Update basic listing data
        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            { ...req.body.listing },
            { new: true, runValidators: true }
        );

        // Handle image update if new file is uploaded
        if (req.file) {
            updatedListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
            await updatedListing.save();
            console.log("Image updated:", updatedListing.image);
        }

        req.flash("success", "Nest updated successfully");
        res.redirect(`/listings/${updatedListing._id}`);
    } catch (err) {
        console.error("Error updating listing:", err);
        req.flash("error", "Error updating listing");
        res.redirect(`/listings/${req.params.id}/edit`);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const { error, listing } = await validateAndFindListing(req.params.id, req, res);
        if (error) return res.redirect("/listings");

        await listing.deleteOne();
        req.flash("success", "Nest deleted successfully");
        res.redirect("/listings");
    } catch (err) {
        console.error("Error deleting listing:", err);
        req.flash("error", "Error deleting listing");
        res.redirect("/listings");
    }
};

