const mongoose = require("mongoose")

const exchangeBookSchema = new mongoose.Schema({
    cloudinaryPublicId: {
        type: String,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    selectHostel: {
        type: String,
        enum: ["Hostler", "Day_Scholar"],
        required: [true, "Category is required"]
    },
    hostleName: {
        type: String,
        enum: ["Boss", "Aryabhata", "Sarabhai", "Kalpana", "Gargi", "Teresa", "New girls hostel"],
        required: function () { return this.selectHostel === "Hostler"; }
    },
    roomNumber: {
        type: String,
        required: function () { return this.selectHostel === "Hostler"; },
        trim: true
    },
    dayScholarContectNumber: {
        type: String,
        required: function () { return this.selectHostel === "Day_Scholar"; },
        trim: true
    },
    image: {
        type: String,
        required: [true, "Product image is required"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},{timestamps:true})

const exchange = mongoose.model("exchange", exchangeBookSchema)

module.exports = exchange;