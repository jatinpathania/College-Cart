const mongoose = require("mongoose")

const PRODUCT_CATEGORIES = [
    "Electronics",
    // "Furniture",
    "Clothing",
    "Books",
    // "Stationary",
    "Sports Equipment",
    // "Miscellaneous",
    "Grocery",
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
    quantity:{
       type:Number,
       required:[true, "Quantity is required"],
       default:1
    },
    selectHostel: {
        type: String,
        enum: ["Hostler", "Day_Scholar"],
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
        required: function() { return this.selectHostel === "Day_Scholar"; },
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
    },
    stock:{
        type:Number,
        required:false,
        default:1,
    }
},{timestamps:true})

productAddFormSchema.pre('save', function(next){
    if(this.quantity === 0){
        this.remove();
    }
    next();
})

const ProductAdd = mongoose.model("ProductAdd",productAddFormSchema);

module.exports = ProductAdd;