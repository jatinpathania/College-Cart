import React, { useContext } from 'react'
import style from "./exchange.module.css"
import Header from "../Header/Header"
import { UserDataContext } from '../Header/context'
const ExchangeBookAllProduct = () => {
    const {exchangeProduct} = useContext(UserDataContext);
    console.log(exchangeProduct)
  return (
   <>
   <Header/>

   
   </>
  )
}

export default ExchangeBookAllProduct