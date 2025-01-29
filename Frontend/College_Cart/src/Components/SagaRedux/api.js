import axios from "axios";
const backend_url = import.meta.env.BACKEND_API_URL;

const API = axios.create({
  baseURL:"http://localhost:8001/api",
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

export const signUp = (userData)=>API.post("/signup", userData)
export const signIn = (credentials) => API.post('/login', credentials);
export const verifyEmail = (verificationData) => API.post('/verify-email', verificationData);