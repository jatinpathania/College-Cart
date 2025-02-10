const mongoose = require("mongoose")
require('dotenv').config();
const connectMongdb=()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Mongodb Connected"))
}

module.exports = connectMongdb

