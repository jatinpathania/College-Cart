import React, { useContext, useEffect } from 'react';
import { motion } from "framer-motion";
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/Slice';
import { cartAdd } from '../SagaRedux/Slice';
import store from '../SagaRedux/Store';
import { UserDataContext } from '../Header/context';
import axios from 'axios';
import { getToken } from '../../util/tokenService';

const backend_url = import.meta.env.VITE_BACKEND_API_URL;

const Stock = ({ product }) => {
  useEffect(() => {
    const stockUpdate = async () => {
      const token = getToken();
      if (!token) return;

      try {
        await axios.put(`${backend_url}/${product._id}/update-stock`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Stock update error:', error);
      }
    };
    stockUpdate();
    
  }, [product.stock]);

  return (
    <span className={`stock-status ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
      {product.stock === 0 ? ' (Out of Stock)' : ' (In Stock)'}
    </span>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useContext(UserDataContext);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    
    const totalQuantity = store.getState().cart.totalQuantity;

    setTimeout(() => {
      const updatedState = store.getState().cart.itemList;
      const storeItem = updatedState.find(item => item._id === product._id);
      if (storeItem) {
        const cartItem = {
          productId: storeItem._id,
          name: storeItem.name,
          brand: storeItem.brand,
          category: storeItem.category,
          selectHostel: storeItem.selectHostel,
          hostleName: storeItem.hostleName,
          roomNumber: storeItem.roomNumber,
          dayScholarContectNumber: storeItem.dayScholarContectNumber,
          price: storeItem.price,
          prevPrice: storeItem.prevPrice,
          totalPrice: storeItem.totalPrice,
          image: storeItem.image,
          description: storeItem.description,
          productQuantity: storeItem.productQuantity,
          quantity: storeItem.quantity,
          totalQuantity: totalQuantity
        };

        dispatch(cartAdd(cartItem));
      }
    }, 200);
  };

  const decDescription = (text) => {
    if (!text) return "";
    const words = text.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return text;
  };

  const calculateDiscount = () => {
    if (product.prevAmount > product.newAmount) {
      const discount = ((product.prevAmount - product.newAmount) / product.prevAmount) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <div className='product-cart-container'>
      <motion.div
        className="product-card"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <div className="product-image-wrapper" onClick={() => navigate(`/${product._id}/product`)}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 90 }}
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            {calculateDiscount() > 0 && (
              <div className="discount-badge">
                -{calculateDiscount()}%
              </div>
            )}
          </div>

          <div className="product-content">
            <h2 className="product-title">{product.name}</h2>

            <div className="rating-container">
              <div className="stars">★★★★☆</div>
              <span className="rating-count">1,234</span>
            </div>

            <div className="pricing-section">
              <div className="price-container">
                <span className="rupee-symbol">₹</span>
                <span className="main-price">{product.newAmount}</span>
                {product.prevAmount !== product.newAmount && (
                  <div className="original-price-container">
                    <span className="mrp">M.R.P.:</span>
                    <span className="original-price">₹ {product.prevAmount}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="product-description">{decDescription(product.description)}</p>
          </div>
          {data && data._id ? (
            <button 
              className={`add-to-cart-button ${product.stock === 0 ? 'disabled' : ''}`} 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart <Stock product={product} />
            </button>
          ) : (
            <button className="add-to-cart-button" onClick={() => navigate('/login')}>
              Add to Cart
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;