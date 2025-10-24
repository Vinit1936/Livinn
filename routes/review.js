const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { JoiReviewSchema } = require("../schema.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");
const { postReview, deleteReview } = require("../controllers/review.js");

function validateReview(req, res, next) {
  let { error } = JoiReviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

//Reviews
//Post Route
router.post("/", validateReview, isLoggedIn, wrapAsync(postReview));

//Delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(deleteReview)
);

module.exports = router;
