import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import ProductCard from './CardProduct';
import axios from 'axios';
const backend_url = import.meta.env.VITE_BACKEND_API_URL;
const Product = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
     const fetchProductData = async () => {
       try {
         const res = await axios.get(`${backend_url}/all-product`);
         setProducts(res.data.products);
       } catch (error) {
         console.log(error);
       }
     };
     fetchProductData();
   }, []);

   return (
     <>
       <Header/>
       <div style={{
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '40px', 
        justifyContent: 'center', 
        padding: '20px',
        maxWidth: '1700px',
        margin: '0 auto'
       }}>
         {products.length === 0 ? (
           <p className='productNotFoundText'>Products Not Found</p>
         ) : (
           products.map(product => (
             <ProductCard key={product._id} product={product} />
           ))
         )}
       </div>
     </>
   );
};

export default Product;