import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import ProductCard from '../Product/CardProduct';
import axios from 'axios';
import { UserDataContext } from '../Header/context';

const Product = () => {
  const [products, setProducts] = useState([]);
  const {data} = useContext(UserDataContext);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get('http://localhost:8001/api/all-product');
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, []);

  const filteredProducts = products.filter((product) => product.userId._id === data._id);

  return (
    <>
      {filteredProducts.length === 0 ? (
        <p>Products Not Found</p>
      ) : (
        filteredProducts.map((product) => (
            <div>
                <p>{product.name}</p>
            </div>
        ))
      )}
    </>
  );
};

export default Product;
