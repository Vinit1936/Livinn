const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirect } = require("../middleware");
const {
  postSignup,
  postLogin,
  logout,
  renderSignUp,
  renderLogin,
} = require("../controllers/user");

//Sign Up
router.route("/signup")
.get(renderSignUp)
.post(wrapAsync(postSignup));

//Log in
router.route("/login")
.get(renderLogin)
.post(
  saveRedirect,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  postLogin
);

//LOGOUT

router.get("/logout", logout);

module.exports = router;
