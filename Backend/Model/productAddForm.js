const mongoose = require("mongoose")

const productAddFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Hostler", "Day Scholar"],
        default: "Hostler",
        required: true
    },
    hostleName:{
        type:String,
        enum:["Boss","Aryabhata","Sarabhai"],
        required:false,
    },
    roomNumber:{
        type:String,
        required:false,
    },
    dayScholarContectNumber:{
       type:String,
       required:false,
    },
    prevAmount: {
        type: Number,
        required: true,
        min: [0, 'Previous amount must be a positive number']
    },
    newAmount: {
        type: Number,
        required: true,
        min: [0, 'New amount must be a positive number']
    },
    image: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true,
    }
})

const ProductAdd = mongoose.model("ProductAdd",productAddFormSchema);

module.exports = ProductAdd;