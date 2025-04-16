const mongoose = require("mongoose")
const bookExchangeOrderSchema =  new mongoose.Schema({
    bookId:{
        type:String,
        required:true
    },
    bookName:{
     type:String,
     required:true
    },
    sealUser:{
        type:Object
    },
    buyUser:{
        type:Object
    },
    selectOption:{
        type: String,
        enum: ["Hostler", "Day_Scholar"],
        required: true
    },
    hostleName: {
        type: String,
        enum: ["Boss", "Aryabhata", "Sarabhai", "Kalpana", "Gargi", "Teresa", "New girls hostel"],
        required: function () { return this.selectOption === "Hostler"; }
    },
    roomNumber: {
        type: String,
        required: function () { return this.selectOption === "Hostler"; },
        trim: true
    },
    dayScholarContectNumber: {
        type: String,
        required: function () { return this.selectOption === "Day_Scholar"; },
        trim: true
    },

},{timestamps:true});

const  bookExchangeOrder = mongoose.model("bookExchangeOrder",bookExchangeOrderSchema)

module.exports = bookExchangeOrder;
