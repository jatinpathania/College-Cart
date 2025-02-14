import React from 'react'
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Slice';

export const Store = configureStore({
    reducer:{
        cart:cartReducer
    }
})

export default Store