import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MinusIcon, PlusIcon } from 'lucide-react';
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import ProductPriceDetails from './ProductPriceDetails';
import { addToCart, removeFromCart } from '../Redux/Slice';
import toast, {Toaster} from 'react-hot-toast';

const CartProduct = () => {
  const { itemList } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  
  const textName = (text) => {
    const words = text.split(' ');
    return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : text;
  };

  const handleIncreaseQuantity = (item) => {
    if (item.quantity < item.productQuantity) {
      dispatch(addToCart(item));
    }
    toast.success("Add one Quantity form Product")
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(removeFromCart(item));
    }
    toast.success("Decrease one Quantity form Product")
  };

  return (
   <>
   <Header/>
   <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl flex">
        <div className="bg-white shadow-sm  mt-10">
          {itemList.map((item) => (
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
                        disabled={item.quantity >= (item.productQuantity)}
                        className={`flex h-7 w-7 items-center justify-center border border-gray-300 text-black
                          ${item.quantity >= (item.productQuantity)
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
                    <button className="text-sx font-bold hover:text-blue-700">
                      SAVE FOR LATER
                    </button>
                    <button className="text-sx font-bold hover:text-blue-700">
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ProductPriceDetails/>
      </div>
    </div>
   <Footer/>
   <Toaster/>
   </>
  );
};

export default CartProduct;