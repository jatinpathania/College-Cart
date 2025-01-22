const mongoose = require("mongoose")

const verifyEmailForPassword = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    verificationCode: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 30 * 60 * 1000) 
    }
}, { timestamps: true });

const emailVeirfyForPassword = mongoose.model("emailVeirfyForPassword", verifyEmailForPassword);

module.exports = emailVeirfyForPassword;