import { put, call, takeLatest, all } from "redux-saga/effects"
import {
    signInUserFailed,
    signInUserSuccess,
    signUpUserFailed,
    signUpUserSuccess,
    emailVerifyFailed,
    emailVerifySuccess,
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

function* Saga() {
    yield takeLatest('app/signUpUser', signUpUserSaga);
    yield takeLatest('app/signInUser', signInUserSaga);
    yield takeLatest('app/emailVerify',verifyEmailSaga);
}
export default Saga