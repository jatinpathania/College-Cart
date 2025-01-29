import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./Slice";
import Saga from "./Saga";
import createSagaMiddleware from "redux-saga"

const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
    reducer:{
        app:appReducer
    },
    middleware:(getDefaultMiddleware)=>  
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(Saga);

export default Store