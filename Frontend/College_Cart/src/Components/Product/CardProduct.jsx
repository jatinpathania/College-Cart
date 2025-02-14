import React from 'react';
import { motion } from "framer-motion";
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Slice';


const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddToCart=()=>{
    dispatch(addToCart(product))
  }

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
     <div >
     <div className="product-image-wrapper" onClick={()=>navigate(`/${product._id}/product`)}>
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ type:"spring",stiffness:300, damping:90 }}
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
                <span className="original-price">&#8377; {product.prevAmount}</span>
              </div>
            )}
          </div>
        </div>

        {/* <div className="delivery-info">
          <span className="prime-icon">✓</span>
          <span className="delivery-text">Free Delivery</span>
        </div> */}

        <p className="product-description">{decDescription(product.description)}</p>

     </div>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </motion.div>
    </div>
  );
};

export default ProductCard;