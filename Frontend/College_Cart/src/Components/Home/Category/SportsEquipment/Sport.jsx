import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../../../util/tokenService';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import '../Books/book.css';
import Button from '../../Button/Button';

const backend_url = import.meta.env.VITE_BACKEND_API_URL;

const ProductSkeleton = () => {
  return (
    <Box className="product-skeleton-book">
      <div className="skeleton-image-book">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: '4px' }}
        />
      </div>
      <div className="skeleton-text-book">
        <Skeleton
          variant="text"
          width="100%"
          height={20}
        />
      </div>
    </Box>
  );
};

const Sport = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      const token = getToken();
      const apiUrl = token ? `${backend_url}/all-product` : `${backend_url}/public-products`;
      
      try {
        setLoading(true);
        const res = await axios.get(apiUrl, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });
        const fileterData = res.data.products.filter(
          (productcategory) => productcategory.category === 'Sports Equipment'
        ).slice(0,5);
        setProducts(fileterData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, []);

  return (
    <div className="book-container">
      <div className="book-header">
        <h2 className="book-title">
        Sports Equipment
          <span><Button/></span>
        </h2>
      </div>
      <div className="products-grid-book">
        {loading ? (
          Array.from(new Array(5)).map((_, index) => (
            <>
            <ProductSkeleton key={index} />
            </>
          ))
        ) : (
          products.map(product => (
            <div key={product._id} className="product-card-book">
              <div className="product-image-container-book">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-book"
                />
              </div>
              <div className="product-info-book">
                <h3 className="product-name-book">{product.name}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sport;