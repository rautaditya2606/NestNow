const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const methodOverride = require("method-override");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js")

// File filter function to check file size and type
const fileFilter = (req, file, cb) => {
    // Check file type
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Updated multer configuration with size limits
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

router.use(methodOverride("_method"));

router.get("/", listingController.index);
router.get("/new", isLoggedIn, listingController.renderNew);
router.get("/privacy", (req, res) => res.render("./listings/privacy.ejs"));
router.get("/tnc", (req, res) => res.render("./listings/tnc.ejs"));
router.get("/profile", isLoggedIn, listingController.profile);

// POST route
router.post("/",
    isLoggedIn,
    (req, res, next) => {
        upload.single("image")(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'File size too large. Maximum size is 5MB');
                    return res.redirect('/listings/new');
                }
            }
            next();
        });
    },
    listingController.create
);

router.get("/:id", listingController.show);
router.get("/:id/edit", isLoggedIn, listingController.renderEdit);
router.put("/:id",
    isLoggedIn,
    isOwner,
    (req, res, next) => {
        upload.single("image")(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'File size too large. Maximum size is 5MB');
                    return res.redirect(`/listings/${req.params.id}/edit`);
                }
            }
            next();
        });
    },
    listingController.update
);
router.delete("/:id", isLoggedIn, isOwner, listingController.delete);

module.exports = router;