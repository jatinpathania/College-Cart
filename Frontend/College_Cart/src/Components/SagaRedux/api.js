import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_API_URL;
import { getToken } from "../../util/tokenService";
const API = axios.create({
  baseURL:backend_url,
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
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
  } else {
      config.headers['Content-Type'] = 'application/json';
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
export const productCreate = (newProduct) =>API.post("/product-create",newProduct)
export const getAllProduct = (allProduct)=>API.get("/all-product",allProduct)
export const getProductDetails = (productId) =>{
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return API.get(`/${productId}/product`,{headers});
}
export const cartProductAdd = (cartProduct) => API.post("/cartProductAdd", cartProduct)
export const productCartAll = (cartAllProduct) => API.get("/all-cart-product", cartAllProduct)

export const updateProfileAndEdit = (formData) => {
  const userId = formData.get('userId');
  const token = getToken();

  return axios.patch(`${backend_url}/update-profile/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
};