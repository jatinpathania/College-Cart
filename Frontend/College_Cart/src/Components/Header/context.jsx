import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { getToken } from '../../util/tokenService';


const backend_url = import.meta.env.VITE_BACKEND_API_URL;
const UserDataContext = createContext();

const UserDataProvider =({children})=>{
  const [data, setData] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [products, setProducts] = useState([])
  const [productId, setProductIdBy] = useState([])
//  console.log(productId)
  useEffect(() => {
    const fetchProductData = async () => {
      const token = getToken();
 
      const apiUrl = token ? `${backend_url}/all-product` : `${backend_url}/public-products`;
      try {
        const res = await axios.get(apiUrl, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      } 
    };
    fetchProductData();
  }, [getToken()]);

  return(
    <UserDataContext.Provider value={{data,setData,searchQuery,setSearchQuery, totalQuantity, setTotalQuantity,setProducts,products, productId, setProductIdBy}}>
        {children}
    </UserDataContext.Provider>
  )
}

export {UserDataContext, UserDataProvider};