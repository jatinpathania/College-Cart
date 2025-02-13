import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../../../util/tokenService';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import './electronic.css';
import Button from '../../Button/Button';

const backend_url = import.meta.env.VITE_BACKEND_API_URL;

const ProductSkeleton = () => {
  return (
    <Box className="product-skeleton-electronics">
      <div className="skeleton-image-electronics">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: '4px' }}
        />
      </div>
      <div className="skeleton-text-electronics">
        <Skeleton
          variant="text"
          width="100%"
          height={20}
        />
      </div>
    </Box>
  );
};

const Electronic = () => {
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
        const fileterDataByElectronices = res.data.products.filter(
          (productcategory) => productcategory.category === 'Electronics'
        ).slice(0,5);
        setProducts(fileterDataByElectronices);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, []);

  return (
    <div className="electronics-container">
      <div className="electronics-header">
        <h2 className="electronics-title">
          Electronics
          <span ><Button/></span>
        </h2>
      </div>
      <div className="products-grid-electronics">
        {loading ? (
          Array.from(new Array(5)).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          products.map(product => (
            <div key={product._id} className="product-card-electronics">
              <div className="product-image-container-electronics">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-electronics"
                />
              </div>
              <div className="product-info-electronics">
                <h3 className="product-name-electronics">{product.name}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Electronic;