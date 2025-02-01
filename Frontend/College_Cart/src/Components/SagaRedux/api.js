import axios from "axios";
const backend_url = import.meta.env.BACKEND_API_URL;
import { getToken } from "../../util/tokenService";
const API = axios.create({
  baseURL:"http://localhost:8001/api",
  withCredentials: true,
  headers:{
    'Content-Type':'application/json'
  }
});

API.interceptors.response.use(
  (response)=>response,
  (error)=>{
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject({
      message:errorMessage,
      status:error.response?.status
    })
  }
)

API.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const signUp = (userData)=>API.post("/signup", userData)
export const signIn = (credentials) => API.post('/login', credentials);
export const verifyEmail = (verificationData) => API.post('/verify-email', verificationData);
export const forGotpassword = (password)=>API.post("/for-got-password-send",password);
export const forGotpasswordVerifyOTP = (otpVerify)=>API.post("/verify-for-got-password",otpVerify);
export const passwordNewSet = (newPassword)=>API.put("/password",newPassword);
export const getUserProfile = (getUserProfile)=>API.get("/user-profile",getUserProfile);