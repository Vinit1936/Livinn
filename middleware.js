const Listing = require("./models/listing");
const Review = require("./models/reviews");

module.exports.isLoggedIn= (req, res, next )=>{
    if(!req.isAuthenticated()){
    req.session.redirectUrl= req.originalUrl;
    req.flash("error", "Please login to continue!");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirect = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

   if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    const action =
      req.method === "DELETE"
        ? "delete"
        : req.method === "PUT"
        ? "update"
        : "edit";

    req.flash("error", `You don't have permission to ${action} this listing.`);
    return res.redirect(`/listings/${id}`);
  }

  next(); // only runs if ownership verified
};


module.exports.isReviewAuthor = async (req, res, next) => {
  const { id,reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

   if (!review.author._id.equals(res.locals.currentUser._id)) {
    const action =
      req.method === "DELETE"
        ? "delete"
        : req.method === "PUT"
        ? "update"
        : "edit";

    req.flash("error", `You don't have permission to ${action} this review.`);
    return res.redirect(`/listings/${id}`);
  }

  next(); // only runs if ownership verified
};
