const { Schema, model, default: mongoose } = require("mongoose");

const paymentSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "INR"
    },
    receipt: {
        type: String,
        required: true,
    },
    notes:  mongoose.Schema.Types.Mixed,
    status: {
        type: String,
        enum: ['created', 'paid', 'failed'],
        default: 'created'
    },
    paymentId: {
        type: String
    },
    sealUser:{
        type:Object,
        required:true,
    },
    buyUser:{
        type:Object,
        required:true,
    }
}, { timestamps: true });

const Order = model("Order", paymentSchema);

module.exports = Order;
