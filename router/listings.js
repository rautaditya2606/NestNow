const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const methodOverride = require("method-override");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js") 
const upload = multer({ storage });

router.use(methodOverride("_method"));

router.get("/", listingController.index);
router.get("/new", isLoggedIn, listingController.renderNew);
router.get("/privacy", (req, res) => res.render("./listings/privacy.ejs"));
router.get("/tnc", (req, res) => res.render("./listings/tnc.ejs"));
router.get("/profile", isLoggedIn, listingController.profile);

// POST route
router.post("/", 
    isLoggedIn,
    upload.single("image"), 
    listingController.create
);

router.get("/:id", listingController.show);
router.get("/:id/edit", isLoggedIn, listingController.renderEdit);
router.put("/:id", 
    isLoggedIn, 
    isOwner, 
    upload.single("image"),  // Move upload middleware before the controller
    listingController.update
);
router.delete("/:id", isLoggedIn, isOwner, listingController.delete);

module.exports = router;