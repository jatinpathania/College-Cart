import { MinusIcon, PlusIcon } from 'lucide-react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductPriceDetails from './ProductPriceDetails';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { getToken } from '../../util/tokenService';
import RemoveCartItem from './RemoveCartItem';

const backend_url = import.meta.env.VITE_BACKEND_API_URL;

const CartProduct = () => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartProductDeleteId, setCartProductDeleteId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const textName = (text) => {
    if(!text) return "";
    const words = text.split(' ');
    return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : text;
  };

  const fetchData = async () => {
    const token = getToken()
    try {
      const res = await axios.get(`${backend_url}/all-cart-product`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log(res.data.item)
      setCartItems(res.data.item);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuantityUpdate = async (item, action) => {
    try {
      const updatedQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;

      if (updatedQuantity < 1 || updatedQuantity > item.productQuantity) return;
  
      const data = { quantity: updatedQuantity, totalPrice: updatedQuantity * item.price };
      const res = await axios.put(`${backend_url}/${item._id}/update-quantity-filed`, data);
    //  console.log(res.data.updateCartItemQunatity)
    
      setCartItems((prevItems) => {
        return prevItems.map((cartItem) => 
          cartItem._id === item._id 
            ? { ...cartItem, quantity: updatedQuantity, totalPrice: updatedQuantity * cartItem.price } 
            : cartItem
        );
      });
  
      if(action === "increase"){
        toast.success("Quantity increased");
      } else if(action === "decrease") {
        toast.success("Quantity decreased");
      }
  
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };
  

  const handleOpenDeleteDialog = (id) => {
    setCartProductDeleteId(id);
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto max-w-6xl flex">
          <div className="bg-white shadow-sm mt-10 w-full">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="border-b p-4 flex">
                  <Skeleton variant="rectangular" width={100} height={100} />
                  <div className="pl-4 flex-1">
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="text" width="30%" height={20} />
                    <Skeleton variant="rectangular" width={120} height={20} />
                  </div>
                </div>
              ))
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="border-b p-4">
                  <div className="flex">
                    <div className="flex w-1/4 flex-col items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 object-contain"
                      />
                      <div className="mt-10 flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityUpdate(item, "decrease")} disabled={item.quantity <= 1}
                          className={`flex h-7 w-7 items-center justify-center border border-gray-300 text-black
                            ${item.quantity <= 1
                              ? 'bg-gray-100 cursor-not-allowed text-gray-400'
                              : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <input
                          type="text"
                          className="h-7 w-12 border border-gray-300 text-center"
                          value={item.quantity || 1}
                          readOnly
                        />
                        <button
                         onClick={() => handleQuantityUpdate(item, "increase")} disabled={item.quantity >= item.productQuantity}
                          className={`flex h-7 w-7 items-center justify-center border border-gray-300 text-black
                            ${item.quantity >= item.productQuantity
                              ? 'bg-gray-100 cursor-not-allowed text-gray-400'
                              : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 pl-4">
                      <h2 className="text-lg text-gray-600">{textName(item.name)}</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.selectHostel === 'Hostler' && `Hostel: ${item.hostleName}`}
                        {item.selectHostel === 'Day_Scholar' && `Student: ${item.selectHostel}`}
                        {item.roomNumber && `, Room: ${item.roomNumber}`}
                        {item.dayScholarContectNumber &&
                          `, Contact: ${item.dayScholarContectNumber}`}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Category: {item.category}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-lg font-medium">&#8377;{item.price}</span>
                        {item.prevPrice && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              &#8377;{item.prevPrice}
                            </span>
                            <span className="text-xs text-green-600">
                              {Math.round((item.prevPrice - item.price) / item.prevPrice * 100)}% off
                            </span>
                          </>
                        )}
                      </div>
                      <div className="mt-4 flex">
                        <button className="text-sm font-bold hover:text-blue-700">
                          SAVE FOR LATER
                        </button>
                        <button className="text-sm font-bold hover:text-blue-700"
                          onClick={() => handleOpenDeleteDialog(item._id)}>
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <ProductPriceDetails cartItem={cartItems} setCartItem={setCartItems}/>
        </div>
      </div>
      <RemoveCartItem
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        cartItemId={cartProductDeleteId}
        cartItem={cartItems} setCartItem={setCartItems}
      />

      <Footer />
      <Toaster />
    </>
  );
};

export default CartProduct;