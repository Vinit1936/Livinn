const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema (
    {
        email:{
            type:String,
            required:true,
        }
    }
);

userSchema.plugin(passportLocalMongoose);//This function adds that (mentioned below) 
module.exports = mongoose.model('User', userSchema);

//We have not added username and password field in the schma becuase 
// passport-local-mongoose by default 
//adds a hashed and slated password and username in schema.