const mongoose = require("mongoose")
const requestSchema = new mongoose.Schema({
    bookId:String,
    approvedUserByBook:Object,
    approvedBookForUser:Object,
    approvedStatus:{
        type:String,
        enum:["Approve", "Cancel"],
        default:"Pending"
    },
    bookName:String,
},{timestamps:true})

const request = mongoose.model("request", requestSchema)

module.exports = request;