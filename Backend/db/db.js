const mongoose = require("mongoose")
require('dotenv').config();
const connectMongdb=()=>{
    mongoose.connect(process.env.Connection_URL)
    .then(()=>console.log("Mongodb Connected"))
}

module.exports = connectMongdb

