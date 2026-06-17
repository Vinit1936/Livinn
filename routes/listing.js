const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { JoiListingSchema } = require("../schema.js");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner } = require("../middleware.js");
const {storage}= require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

const {
  index,
  show,
  newListing,
  create,
  edit,
  update,
  deleteListing,
} = require("../controllers/listing.js");

function validateListing(req, res, next) {
  let { error } = JoiListingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

router.route("/")
.get(wrapAsync(index))//index route
.post(isLoggedIn, upload.single("listing[image]"), wrapAsync(create));//create route


//New Route
router.get("/new", isLoggedIn, newListing);

router.route("/:id")
.get(wrapAsync(show))//Show route
.put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(update))//update route
.delete(isLoggedIn, isOwner, wrapAsync(deleteListing));//delete route




//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(edit));

module.exports = router;
