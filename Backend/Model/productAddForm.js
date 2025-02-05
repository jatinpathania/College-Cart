const mongoose = require("mongoose")

const PRODUCT_CATEGORIES = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
    "Stationary",
    "Sports Equipment",
    "Miscellaneous"
];

const productAddFormSchema = new mongoose.Schema({
    cloudinaryPublicId: {
        type: String,
        default: null
    },
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim:true
    },
    brand: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true
    },
    category: {
        type: String,
        enum: PRODUCT_CATEGORIES,
        required: [true, "Product category is required"]
    },
    selectHostel: {
        type: String,
        enum: ["Hostler", "Day Scholar"],
        required: [true, "Category is required"]
    },
    hostleName:{
        type: String,
        enum: ["Boss", "Aryabhata", "Sarabhai"],
        required: function() { return this.selectHostel === "Hostler"; }
    },
    roomNumber: {
        type: String,
        required: function() { return this.selectHostel === "Hostler"; },
        trim: true
    },
    dayScholarContectNumber: {
        type: String,
        required: function() { return this.selectHostel === "Day Scholar"; },
        trim: true
    },
    prevAmount: {
        type: Number,
        required: [true, "Previous amount is required"],
        min: [0, 'Previous amount must be a positive number']
    },
    newAmount: {
        type: Number,
        required: [true, "New amount is required"],
        min: [0, 'New amount must be a positive number']
    },
    image: {
        type: String,
        required: [true, "Product image is required"]
    },
    description:{
        type:String,
        required: [true, "Product description is required"],
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps:true})

const ProductAdd = mongoose.model("ProductAdd",productAddFormSchema);

module.exports = ProductAdd;