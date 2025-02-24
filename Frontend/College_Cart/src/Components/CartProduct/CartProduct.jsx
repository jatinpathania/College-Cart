import { useDispatch } from 'react-redux';
import { MinusIcon, PlusIcon } from 'lucide-react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductPriceDetails from './ProductPriceDetails';
import { addToCart, removeFromCart } from '../Redux/Slice';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { getToken } from '../../util/tokenService';
import RemoveCartItem from './RemoveCartItem';

const backend_url = import.meta.env.VITE_BACKEND_API_URL;

const CartProduct = () => {

  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartProductDeleteId, setCartProductDeleteId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const textName = (text) => {
    const words = text.split(' ');
    return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : text;
  };

  const handleIncreaseQuantity = (item) => {
    if (item.quantity < item.productQuantity) {
      dispatch(addToCart(item));
    }
    toast.success("Added one Quantity to Product");
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(removeFromCart(item));
    }
    // console.log(item)
    toast.success("Decreased one Quantity from Product");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken()
      try {
        const res = await axios.get(`${backend_url}/all-cart-product`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(res.data.item)
        setCartItems(res.data.item);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenDeleteDialog = (id) => {
    setCartProductDeleteId(id);
    setDeleteDialogOpen(true);
    // console.log(id)
  };

  // const userCartItems = cartItems.filter(item => item.userId === data?._id);
  // console.log(userCartItems.length)
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
                          onClick={() => handleDecreaseQuantity(item)}
                          disabled={item.quantity <= 1}
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
                          onClick={() => handleIncreaseQuantity(item)}
                          disabled={item.quantity >= item.productQuantity}
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
                        {item.selectHostel && `Hostel: ${item.hostleName}`}
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
          <ProductPriceDetails />
        </div>
      </div>
      <RemoveCartItem
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        cartItemId={cartProductDeleteId}
      />

      <Footer />
      <Toaster />
    </>
  );
};

export default CartProduct;