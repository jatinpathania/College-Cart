const mongoose = require("mongoose")

const connectMongdb=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/IP_PROJECT")
    .then(()=>console.log("Mongodb Connected"))
}

module.exports = connectMongdb

