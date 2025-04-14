const Razorpay = require("razorpay")
const Order = require("../Model/order")
const crypto = require("crypto");
require('dotenv').config();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt,sealUser,buyUser } = req.body;
    // const notes = typeof req.body.notes === 'object' ? req.body.notes : {};
    const notes = typeof req.body.notes === 'object'
      ? req.body.notes
      : (typeof req.body.notes === 'string' ? { description: req.body.notes } : {});
      
    const options = {
      amount: amount * 100,
      currency,
      receipt,
      notes
    };
    // console.log('Razorpay request options:', JSON.stringify(options));

    const order = await razorpay.orders.create(options)
   // console.log(order)

    await Order.create({
      orderId: order.id,
      amount: amount,
      currency,
      receipt,
      notes,
      status: 'created',
      sealUser,
      buyUser,
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Could not create order'
    });
  }
}

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Verify the signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

     // console.log(generatedSignature)

    if (generatedSignature === razorpay_signature) {
      // Payment is successful
      //Update order status in your database
      const updatedOrder = await Order.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: 'paid', paymentId: razorpay_payment_id },
        { new: true }
      );
      //console.log(updatedOrder)

      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Could not verify payment'
    });
  }
}