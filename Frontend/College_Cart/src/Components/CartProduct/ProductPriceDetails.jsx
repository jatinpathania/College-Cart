import React from 'react';
import { useSelector } from 'react-redux';

const ProductPriceDetails = () => {
  const { itemList,totalQuantity } = useSelector((state) => state.cart);

  const calculateTotals = () => {
    return itemList.reduce((acc, item) => {
      const quantity = item.quantity || 1;
      const price = item.price * quantity;
      const prevPrice = item.prevPrice ? item.prevPrice * quantity : price;
      
      return {
        totalItems: acc.totalItems + quantity,
        totalPrice: acc.totalPrice + price,
        totalPrevPrice: acc.totalPrevPrice + prevPrice,
      };
    }, { totalItems: 0, totalPrice: 0, totalPrevPrice: 0 });
  };

  const { totalItems, totalPrice, totalPrevPrice } = calculateTotals();
  const totalDiscount = totalPrevPrice - totalPrice ;

  return (
    <div className="bg-white shadow-sm w-96 h-fit ml-10 mt-10 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Price Details</h2>
      <hr className='font-lg mb-4'/>
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