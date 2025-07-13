const mongoose = require("mongoose")

const emailVerificationSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    pendingUserData:{
        name: String,
        username: String,
        email: String,
        password: String
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:1800
    }
   
},{timestamps:true})

const Verify = mongoose.model("Verify", emailVerificationSchema);

module.exports = Verify;