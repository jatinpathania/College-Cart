import { put, call, takeLatest, all } from "redux-saga/effects"
import {
    signInUserFailed,
    signInUserSuccess,
    signUpUserFailed,
    signUpUserSuccess,
    emailVerifyFailed,
    emailVerifySuccess,
    forGotPasswordFailed,
    forGotPasswordSuccess,
    emailveirfyForgotpasswordSuccess,
    emailveirfyForgotpasswordFailed,
    newPasswordSetSuccess,
    newPasswordSetFailed,
    profileEditUserSuccess,
    profileEditUserFailed,
    productNewCreateSuccess,
    productNewCreateFailed,
    productDetailsFailed,
    productDetailsSuccess
} from './Slice'

import * as api from "./api"

function* signUpUserSaga(action) {
    try {
        const response = yield call(api.signUp, action.payload);
        if (response.data.message) {
            yield put(signUpUserSuccess({
                message: response.data.message,
                user: response.data.user || null,
                token: response.data.token || null
            }))
        }
    } catch (error) {
        yield put(signUpUserFailed({
            message: error.message,
            error: error.message
        }))
    }
}

function* signInUserSaga(action) {
    try {
        const response = yield call(api.signIn, action.payload);
        yield put(signInUserSuccess({
            message: response.data.message,
            user: response.data.user || null,
            token: response.data.token || null
        }))
    } catch (error) {
        yield put(signInUserFailed({
            message: error.message,
            error: error.message
        }))
    }
}

function* verifyEmailSaga(acton){
    try {
        const response = yield call(api.verifyEmail, acton.payload);
        if (response.data.message) {
            yield put(emailVerifySuccess({
                message: response.data.message,
                user: response.data.user || null,
                token: response.data.token || null
            }))
        }
    } catch (error) {
        yield put(emailVerifyFailed({
            message: error.message,
            error: error.message
        }))    }
}

function* forGotPasswordSaga(action){
    try {
        const response = yield call(api.forGotpassword,action.payload);
        if (response.data.message) {
            yield put(forGotPasswordSuccess({
                message: response.data.message,
                user: response.data.user || null,
            }))
        }
    } catch (error) {
        yield put(forGotPasswordFailed({
            message: error.message,
            error: error.message
        }))    
    }
}

function* emailVerifyforGotPasswordSaga(action){
    try {
        const response = yield call(api.forGotpasswordVerifyOTP,action.payload);
        if (response.data.message) {
            yield put(emailveirfyForgotpasswordSuccess({
                message: response.data.message,
                user: response.data.user || null,
            }))
        }
    } catch (error) {
        yield put(emailveirfyForgotpasswordFailed({
            message: error.message,
            error: error.message
        }))    
    }
}

function* newPasswordSaga(action){
    try {
        const response = yield call(api.passwordNewSet, action.payload);
        if (response.data.message) {
            yield put(newPasswordSetSuccess({
                message: response.data.message,
                user: response.data.user || null,
            }))
        }
    } catch (error) {
        yield put(newPasswordSetFailed({
            message: error.message,
            error: error.message
        }))  
    }
}

function* profileUpdate(action) {
    try {
        const response = yield call(api.updateProfileAndEdit, action.payload);
        
        if (response.data) {
            yield put(profileEditUserSuccess({
                message: response.data.message,
                user: response.data.data || null,
            }));
        }
    } catch (error) {
        yield put(profileEditUserFailed({
            message: error.response?.data?.message || error.message,
            error: error.message
        }));  
    }
}

function* createProductNew(action){
    try {
        const response = yield call(api.productCreate, action.payload)

        if(response.data){
            yield put(productNewCreateSuccess({
                message: response.data.message,
                product: response.data.data || null,
            }))
        }
    } catch (error) {
        yield put(productNewCreateFailed({
            message: error.response?.data?.message || error.message,
            error: error.message
        }))
        
    }
}

function* fetchProductDetailsSaga(action) {
    try {
        const response = yield call(api.getProductDetails, action.payload);
        yield put(productDetailsSuccess(response.data));
    } catch (error) {
        yield put(productDetailsFailed({
            message: error.response?.data?.message || error.message,
            error: error.message
        }));
    }
}

function* Saga() {
    yield takeLatest('app/signUpUser', signUpUserSaga);
    yield takeLatest('app/signInUser', signInUserSaga);
    yield takeLatest('app/emailVerify',verifyEmailSaga);
    yield takeLatest('app/forGotPassword',forGotPasswordSaga);
    yield takeLatest('app/emailveirfyForgotpassword',emailVerifyforGotPasswordSaga)
    yield takeLatest('app/newPasswordSet', newPasswordSaga);
    yield takeLatest('app/profileEditUser', profileUpdate);
    yield takeLatest('app/productNew', createProductNew);
    yield takeLatest('app/fetchProductDetails', fetchProductDetailsSaga);
}
export default Saga