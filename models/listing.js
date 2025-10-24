const mongoose = require("mongoose");
const reviews = require("./reviews");
const user= require("./user");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image:{
        url:{
            type:String,
            default:"https://images.unsplash.com/photo-1682502524896-6d78b9e8413a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1183"
        },
        filename:{
            type: String
        }
    }
    ,
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    // Category 
    category: {
        type: String,
        enum: [
            'Beach',
            'City',
            'Mountain',
            'Lake',
            'Ski',
            'Desert',
            'Cabin',
            'Villa',
        ],
    },
    reviews :[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner :
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        },
    //GeoJSON
    geometry:{
        type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    },


});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await reviews.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;