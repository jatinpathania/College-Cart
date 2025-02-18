const mongoose = require("mongoose")
const cartProductSchema = new mongoose.Schema({
    productId: String,
    name: String,
    brand: String,
    category: String,
    selectHostel: String,
    hostleName: String,
    roomNumber: String,
    dayScholarContectNumber: String,
    price: Number,
    prevPrice: Number,
    totalPrice: Number,
    image: String,
    description: String,
    productQuantity: Number,
    quantity: Number,
   userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
       }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartProductSchema)
module.exports = Cart