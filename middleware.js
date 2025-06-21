const Listing = require("./models/listing");


module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    try {
        let { id } = req.params;
        let listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        if (!listing.owner._id.equals(req.user._id)) {
            req.flash("error", "You don't have permission to do that");
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/listings");
    }
};

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in");
        return res.redirect("/login");
    }
    res.locals.currentUser = req.user;
    next();
};

module.exports.validateAndFindListing = async function validateAndFindListing(id, req, res) {
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
};