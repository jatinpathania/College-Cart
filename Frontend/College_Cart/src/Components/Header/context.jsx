import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { getToken } from '../../util/tokenService';


const backend_url = import.meta.env.VITE_BACKEND_API_URL;
const UserDataContext = createContext();

const UserDataProvider =({children})=>{
  const [userProduct, setUserProduct] = useState();
  const [data, setData] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [products, setProducts] = useState([])
  const [productId, setProductIdBy] = useState([])
  const [exchangeProduct, setExchangeProduct] = useState([])
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

  useEffect(()=>{
    const token = getToken();
      const fetchData = async()=>{

        try {
          const res = await axios.get(`${backend_url}/allProduct`,{
            headers:{'Authorization': `Bearer ${token}` }
          });
          setExchangeProduct(res.data.product);
        } catch (error) {
          console.log(error, "error");
        }
      }
      fetchData()
  },[getToken()])

  return(
    <UserDataContext.Provider value={{data,setData,searchQuery,setSearchQuery, 
      totalQuantity, setTotalQuantity,setProducts,products, productId, setProductIdBy,
    setUserProduct,userProduct,exchangeProduct,setExchangeProduct}}>
        {children}
    </UserDataContext.Provider>
  )
}

export {UserDataContext, UserDataProvider};