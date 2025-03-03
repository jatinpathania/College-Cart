import React, { useContext, useEffect } from 'react';
import { motion } from "framer-motion";
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../Header/context';
import { getToken } from '../../util/tokenService';

const ProductCard = ({ product,handleAddToCart }) => {

  const navigate = useNavigate();
  const { data } = useContext(UserDataContext);

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

  const handleNavigate=()=>{
    const token = getToken();
    if(token && data && data._id){
      navigate(`/${product._id}/product`)
    }else{
      navigate('/login')
    }
  }

  return (
    <div className='product-cart-container'>
      <motion.div
        className="product-card"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
      <div>
        <div onClick={handleNavigate}>
          <div className="product-image-wrapper" >
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
        </div>
          <div className="product-content">
            <h2 className="product-title">{product.name}</h2>

            <div className="rating-container">
              <div className="stars">★★★★☆</div>
              <span className="rating-count">1,234</span>
            </div>

            <div className="pricing-section">
              <div className="price-container">
                <span className="rupee-symbol">&#8377;</span>
                <span className="main-price">{product.newAmount}</span>
                {product.prevAmount !== product.newAmount && (
                  <div className="original-price-container">
                    <span className="mrp">M.R.P.:</span>
                    <span className="original-price">&#8377; {product.prevAmount}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="product-description">{decDescription(product.description)}</p>
          </div>
          {data && data._id ? (
            <button 
              className='add-to-cart-button'
              onClick={()=>handleAddToCart(product)}
            >
              Add to Cart 
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