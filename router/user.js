const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { storeReturnTo } = require("../middleware.js");
const userController = require("../controllers/user.js");


//signup form
router.get("/signup",(userController.renderSignup));


//signup route
router.post("/signup",(userController.signup));


//login form
router.get("/login", (userController.renderLogin));


//login route
router.post("/login",
    storeReturnTo, // middleware to store the returnTo value from session
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
    }),
    (userController.login)
);

//logout route
router.get("/logout", (userController.logout));

module.exports = router;