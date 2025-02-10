import React from 'react';
import './ProductCard.css';
import {motion} from "framer-motion"

const ProductCard = ({ product }) => {
  const decDescription = (text) => {
    const words = text.split(' ');
    if (words.length > 30) {
      return words.slice(0, 30).join(' ') + '...';
    }
    return text;
  };
  return (
    <motion.div className="product-card" 
    // whileHover={{scale:1.05}}
    // transition={{ type: "spring", stiffness: 300, damping: 50 }}
     >
      <div className="product-image-container">
        <motion.img whileHover={{scale:0.9}}
            transition={{type:"spring", stiffness:300, damping:90}}
         src={product.image} alt={product.name} className="product-image" />
        {product.newAmount < product.prevAmount && (
          <span className="sale-badge">Sale</span>
        )}
      </div>

      <div className="product-details">
        <div className="product-header">
          <h2 className="product-name">{product.name}</h2>
          {/* <span className="product-brand">{product.brand}</span> */}
        </div>

        <p className="product-description">{decDescription(product.description)}</p>

        <div className="product-pricing">
          <div className="price-container">
            <span className="current-price">&#8377; {product.newAmount}</span>
            {product.prevAmount !== product.newAmount && (
              <span className="original-price">&#8377; {product.prevAmount}</span>
            )}
          </div>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>

        {/* <div className="product-meta">
          <span>Category: {product.category}</span>
          <span>Hostel: {product.hostleName}</span>
        </div> */}
      </div>
    </motion.div>
  );
};

export default ProductCard;