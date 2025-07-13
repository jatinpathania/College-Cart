const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    cloudinaryId: {
        type: String,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profileImage:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41A81cAVOwJ6e58SZMxg_Fh-VSwnYIWb3Bw&s",
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;