if(process.env.NODE_ENV != "production"){
require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
//routes require
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

//
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User  = require("./models/user.js");
const multer = require("multer");
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const port = 3000;

//Setting MongoDB
//const mongo_url = "mongodb://127.0.0.1:27017/livinn";
dbURL= process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dbURL);
}


//Mongo store

const store = MongoStore.create({
  mongoUrl:dbURL,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter: 24*3600,
});

store.on("error", ()=>{
  console.log("Eroor in Mongo Session Store",err);
});

//sessions and flash
const sessionOptions = {
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7*25*60*60*1000,
    maxAge: 7*25*60*60*1000,
    httpOnly: true,
  },
}





//Routes


app.use(session(sessionOptions));
app.use(flash());

//Passport
app.use(passport.initialize());//middleware that initialises the passport
app.use(passport.session());//give the abality to identify use when user moves from one page to another
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());   // save user ID in session so login “sticks”
passport.deserializeUser(User.deserializeUser()); // get full user info from session ID on each request


app.use((req, res, next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter)

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found:("));
});


//Error Handeling Middleware
app.use((err, req, res, next) => {
  let { statusCode = 404, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
  // res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`app listening to port ${port}`);
});
