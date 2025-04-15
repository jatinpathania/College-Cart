import axios from 'axios'; 
import React, { useContext, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import './checkout.css';
import { UserDataContext } from '../Header/context';

const Checkout = ({ product }) => {
   
    const [loading, setLoading] = useState(false);
    const backend_url = import.meta.env.VITE_BACKEND_API_URL;
    const {data} = useContext(UserDataContext);
    const razorpay_key = import.meta.env.VITE_RAZORPAY_KEY_ID

    const handlePayment = async () => {
        try {
            setLoading(true);
        
            const response = await axios.post(`${backend_url}/create-order`, {
                amount: product?.product?.newAmount,
                currency: 'INR',
                receipt: `rcpt_${Date.now()}`,
                notes: `Payment for ${product?.product?.name}`,
                sealUser:{
                    sealUserId:product?.product?.userId?._id,
                    sealUserName:product?.product?.userId?.name,
                },
                buyUser:{
                    buyUserId:data?._id,
                    buyUserName:data?.name,
                    buyUserEmail:data?.email
                }
            });

            if (!response.data.success) {
                throw new Error('Failed to create order');
            }
            // console.log(razorpay_key)
            // console.log(response.data)
            const { order } = response.data;

            const options = {
                key:razorpay_key,
                amount: order.amount,
                currency: order.currency,
                name: 'College Cart',
                image:`${product?.product?.image}`,
                description: `Purchase of ${product?.product?.name}`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                      
                        const verifyResponse = await axios.post(`${backend_url}/verify-payment`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });
                        
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
                    name:`${data.name}`,
                    email: `${data.email}`,
                    contact: ''
                },
                notes:  { description: `Payment for ${product?.product?.name}` },
                
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
                className="pay-button"
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? 'Processing...' :( <p>Pay &#8377;{product?.product?.newAmount}</p>)}
            </button>
        </div>
    );
};

export default Checkout;