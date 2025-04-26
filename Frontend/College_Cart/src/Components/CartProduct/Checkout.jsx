import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { UserDataContext } from '../Header/context';
import './checkout.css'

const Checkout = ({ cartItem }) => {
    console.log(cartItem)
    const [loading, setLoading] = useState(false);
    const backend_url = import.meta.env.VITE_BACKEND_API_URL;
    const { data } = useContext(UserDataContext);
    const razorpay_key = import.meta.env.VITE_RAZORPAY_KEY_ID;

    const calculateTotalAmount = () => {
        return cartItem.reduce((total, item) => total + item.totalPrice, 0);
    };

    const handlePayment = async () => {
        try {
            setLoading(true);
            const totalAmount = calculateTotalAmount();

        
            const itemsDescription = cartItem.map(item => item.name || 'Product').join(', ');
            
            const response = await axios.post(`${backend_url}/create-order`, {
                amount: totalAmount,
                currency: 'INR',
                receipt: `rcpt_${Date.now()}`,
                notes: `Payment for multiple items`,
                sealUser: {
                    sealUserId: cartItem[0]?.userId?._id, 
                    sealUserName: cartItem[0]?.userId?.name,
                },
                buyUser: {
                    buyUserId: data?._id,
                    buyUserName: data?.name,
                    buyUserEmail: data?.email
                },
                cartItems: cartItem
            });

            console.log(response.data)

            if (!response.data.success) {
                throw new Error('Failed to create order');
            }

            const { order } = response.data;

            const options = {
                key: razorpay_key,
                amount: order.amount,
                currency: order.currency,
                name: 'College Cart',
                image:'https://example.com/default-image.jpg',
                description: `Purchase of ${cartItem.length} items`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyResponse = await axios.post(`${backend_url}/verify-payment`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });
                        //   console.log(verifyResponse.data.success)
                        if (verifyResponse.data.success) {
                            toast.success('Payment successful! Your order has been placed.');
                        } else {
                            toast.error('Payment verification failed');
                        }
                    } catch (err) {
                        toast.error('Payment verification failed');
                        console.error(err);
                    }
                },
                prefill: {
                    name: `${data?.name || ''}`,
                    email: `${data?.email || ''}`,
                    contact: ''
                },
                notes: { description: `Payment for multiple items` },
                theme: {
                    color: '#3399cc'
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
            console.error('Payment error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <Toaster position="top-center" reverseOrder={false} />
            <button
                className="pay-button-cart-Item"
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? 'Processing...' : (<p>Pay &#8377;{calculateTotalAmount()}</p>)}
            </button>
        </div>
    );
};

export default Checkout;