import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserDataContext } from '../Header/context';
import { getToken } from '../../util/tokenService';

const backend_url = import.meta.env.VITE_BACKEND_API_URL;

const ProductPriceDetails = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]); 
  const { data } = useContext(UserDataContext); 

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken()
      try {
        const res = await axios.get(`${backend_url}/all-cart-product`,{
          headers:{
            'Content-Type':"application/json",
            "Authorization":`Bearer ${token}`
          }
        });
        setCartItems(res.data.item); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // const userCartItems = cartItems.filter(item => item.userId === data?._id);

  const calculateTotals = () => {
    return cartItems.reduce(
      (acc, item) => ({
        totalItems: acc.totalItems + (item.quantity || 1),
        totalPrice: acc.totalPrice + item.totalPrice,
        totalPrevPrice: acc.totalPrevPrice + item.prevPrice * (item.quantity || 1),
      }),
      { totalItems: 0, totalPrice: 0, totalPrevPrice: 0 }
    );
  };

  const { totalItems, totalPrice, totalPrevPrice } = calculateTotals();
  const totalDiscount = totalPrevPrice - totalPrice;

  return (
    <div className="bg-white shadow-sm w-[500px] h-fit ml-10 mt-10 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Price Details</h2>
      <hr className="font-lg mb-4" />
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Price ({totalItems} items)</span>
          <span>&#8377;{totalPrevPrice}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Discount</span>
          <span className="text-green-600">- &#8377;{totalDiscount}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Delivery Charges</span>
          <span className="text-green-600">FREE</span>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-medium text-base">
            <span>Total Amount</span>
            <span>&#8377;{totalPrice}</span>
          </div>
        </div>

        {totalDiscount > 0 && (
          <div className="text-green-600 text-sm">
            You will save &#8377;{totalDiscount} on this order
          </div>
        )}
      </div>

      <button className="w-full bg-orange-600 text-white py-3 rounded mt-6 hover:bg-orange-500">
        Place Order
      </button>
    </div>
  );
};

export default ProductPriceDetails;
