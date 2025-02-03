import React from 'react'
import Header from '../Header/Header'
import './product.css'

const Product = () => {
  return (
    <>
      <Header/>
      <div className='productContainer'>
        <p className='productNotFoundText'>Products Not Found</p>
      </div>
      </>
  )
}

export default Product