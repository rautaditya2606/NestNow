const { isValidObjectId } = require("mongoose");
const Listing = require("../models/listing.js");

async function validateAndFindListing(id, req, res) {
    if (!isValidObjectId(id)) {
        req.flash("error", "Invalid listing ID");
        return { error: true };
    }

    const listing = await Listing.findById(id)
        .populate({
            path: "review",
            populate: {
                path: "name"
            }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Nest does not exist");
        return { error: true };
    }

    return { listing };
}

module.exports = validateAndFindListing;
