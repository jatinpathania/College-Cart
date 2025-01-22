const jwt = require("jsonwebtoken")
require('dotenv').config();

exports.jwtToken = (userId)=>{
   return jwt.sign({userId:userId},process.env.JWT_SECRET,{expiresIn:"2 day"});
}