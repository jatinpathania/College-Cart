import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import ProductCard from './CardProduct';
import axios from 'axios';
import { getToken } from '../../util/tokenService';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Footer from '../Footer/Footer';

const backend_url = import.meta.env.VITE_BACKEND_API_URL;

const ProductSkeleton = () => {
  return (
    <Box 
      sx={{ 
        width: 300,
        padding: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: '#fff'
      }}
    >
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={200} 
        sx={{ marginBottom: '12px' }}
      />
      <Skeleton 
        variant="text" 
        width="80%" 
        height={20} 
        sx={{ marginBottom: '8px' }}
      />
      <Box sx={{ display: 'flex', gap: 1, marginBottom: '8px' }}>
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="text" width={40} height={20} />
      </Box>
      <Box sx={{ marginBottom: '8px' }}>
        <Skeleton variant="text" width={80} height={32} />
        <Skeleton variant="text" width={120} height={20} />
      </Box>
      <Skeleton 
        variant="text" 
        width="60%" 
        height={20} 
        sx={{ marginBottom: '8px' }}
      />
      <Box sx={{ marginBottom: '12px' }}>
        <Skeleton variant="text" width="100%" height={15} />
        <Skeleton variant="text" width="90%" height={15} />
      </Box>
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={40} 
        sx={{ borderRadius: '20px' }}
      />
    </Box>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProductData = async () => {
      const token = getToken();
      try {
        setLoading(true);
        const res = await axios.get(`${backend_url}/all-product`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, []);

  return (
    <>
      <Header />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        justifyContent: 'center',
        padding: '20px',
        maxWidth: '1700px',
        margin: '0 auto'
      }}>
        {loading ? (
          Array.from(new Array(8)).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Product;