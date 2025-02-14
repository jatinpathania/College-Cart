import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./Slice";
import Saga from "./Saga";
import createSagaMiddleware from "redux-saga"
import cartReducer from "../Redux/Slice"
const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
    reducer:{
        app:appReducer,
        cart:cartReducer,
    },
    middleware:(getDefaultMiddleware)=>  
        getDefaultMiddleware({
            serializableCheck:false,
        }).concat(sagaMiddleware),
})

sagaMiddleware.run(Saga);

export default Store