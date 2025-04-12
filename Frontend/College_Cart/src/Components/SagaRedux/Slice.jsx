import { createSlice } from "@reduxjs/toolkit"
import { setToken, removeToken, getToken } from "../../util/tokenService"
const initialState = {
    user: null,
    token: getToken(),
    status: null,
    error: null,
    message: null,
    isLoading:false,
    product:null
}

const Slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        signUpUser: (state) => {
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        signInUser: (state) => {
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        signUpUserSuccess: (state, action) => {
            state.status = 'success',
            state.isLoading = false;
            state.user = action.payload.user,
            state.token = action.payload.token,
            state.message = action.payload.message,
            state.error = null
        },
        signUpUserFailed: (state, action) => {
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.token = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        signInUserSuccess: (state, action) => {
            state.status = 'success',
            state.isLoading = false;
            const token = action.payload.token;
            setToken(token);
            state.user = action.payload.user,
            state.token = token;
            state.message = action.payload.message
            state.error = null
        },
        signInUserFailed: (state, action) => {
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.token = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        emailVerify:(state)=>{
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        emailVerifySuccess:(state,action)=>{
            state.status = 'success',
            state.isLoading = false;
            const token = action.payload.token;
            setToken(token);
            state.user = action.payload.user,
            state.token = token
            state.message = action.payload.message
            state.error = null
        },
        emailVerifyFailed:(state, action)=>{
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.token = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        forGotPassword:(state)=>{
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        forGotPasswordSuccess:(state,action)=>{
            state.status = 'success',
            state.isLoading = false,
            state.user = action.payload.user,
            state.message = action.payload.message
            state.error = null
        },
        forGotPasswordFailed:(state,action)=>{
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        emailveirfyForgotpassword:(state)=>{
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        emailveirfyForgotpasswordSuccess:(state,action)=>{
            state.status = 'success',
            state.isLoading = false,
            state.user = action.payload.user,
            state.message = action.payload.message
            state.error = null
        },
        emailveirfyForgotpasswordFailed:(state,action)=>{
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        newPasswordSet:(state)=>{
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        newPasswordSetSuccess:(state,action)=>{
            state.status = 'success',
            state.isLoading = false,
            state.user = action.payload.user,
            state.message = action.payload.message
            state.error = null
        },
        newPasswordSetFailed:(state,action)=>{
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        resetState: (state) => {
            state.status = null;
            state.message = null;
            state.error = null;
          },

          logout: (state) => {
            removeToken();
            state.status = 'success'
            state.token = null;
            state.user = null;
          },
        profileEditUser:(state)=>{
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        profileEditUserSuccess:(state,action)=>{
            state.status = 'success',
            state.isLoading = false,
            state.user = action.payload.user,
            state.message = action.payload.message
            state.error = null
        } ,
        profileEditUserFailed:(state,action)=>{
            state.status = 'failed',
            state.isLoading = false,
            state.user = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        productNew:(state)=>{
            state.status = 'loading',
            state.isLoading = true,
            state.error = null,
            state.message = null
        },
        productNewCreateSuccess:(state, action)=>{
            state.status = 'success',
            state.isLoading = false,
            state.product = action.payload.product,
            state.message = action.payload.message
            state.error = null
        },
        productNewCreateFailed:(state,action)=>{
            state.status = 'failed',
            state.isLoading = false,
            state.product = null,
            state.message = action.payload.message,
            state.error = action.payload.error
        },
        fetchProductDetails: (state) => {
            state.status = "loading";
            state.isLoading = true;
            state.error = null;
        },
        productDetailsSuccess: (state, action) => {
            state.status = "success";
            state.isLoading = false;
            state.product = action.payload;
        },
        productDetailsFailed: (state, action) => {
            state.status = "failed";
            state.isLoading = false;
            state.error = action.payload.error;
        },
        cartAdd:(state)=>{
            state.status = "loading";
            state.isLoading = true;
            state.error = null;
        },
        cartAddSuccess: (state, action) => {
            state.status = "success";
            state.isLoading = false;
            state.product = action.payload;
        },
        cartAddFailed: (state, action) => {
            state.status = "failed";
            state.isLoading = false;
            state.error = action.payload.error;
        },
        allCartProduct:(state)=>{
            state.status = "loading";
            state.isLoading = true;
            state.error = null;
        },
        allCartProductSuccess:(state, action)=>{
            state.status = "success";
            state.isLoading = false;
            state.product = action.payload;
        },
        allCartProductFalied:(state, action)=>{
            state.status = "failed";
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
})

export const {
    signInUser,
    signInUserFailed,
    signInUserSuccess,
    signUpUserSuccess,
    signUpUser,
    signUpUserFailed,
    emailVerifyFailed,
    emailVerify,
    emailVerifySuccess,
    forGotPassword,
    forGotPasswordFailed,
    forGotPasswordSuccess,
    emailveirfyForgotpassword,
    emailveirfyForgotpasswordSuccess,
    emailveirfyForgotpasswordFailed,
    newPasswordSet,
    newPasswordSetSuccess,
    newPasswordSetFailed,
    resetState,
    logout,
    profileEditUser,
    profileEditUserFailed,
    profileEditUserSuccess,
    productNew,
    productNewCreateFailed,
    productNewCreateSuccess,
    fetchProductDetails,
    productDetailsFailed,
    productDetailsSuccess,
    cartAdd,
    cartAddSuccess,
    cartAddFailed,
    allCartProduct,
    allCartProductFalied,
    allCartProductSuccess
} = Slice.actions;

export default Slice.reducer;