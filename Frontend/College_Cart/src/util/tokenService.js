import Cookies from 'js-cookie';
const TOKEN_KEY = 'auth_token';
const EXPIRY_KEY = 'token_expiry';

export const setToken = (token, expiresIn = 24 * 60 * 60) => {
  const expiryTime = Date.now() + expiresIn * 1000;
  Cookies.set(TOKEN_KEY, token, { expires: expiresIn / (24 * 60 * 60) });
  localStorage.setItem(EXPIRY_KEY, expiryTime);
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  const expiryTime = localStorage.getItem(EXPIRY_KEY);

  if (token && expiryTime) {
    if (Date.now() < parseInt(expiryTime)) {
      return token;
    }
    removeToken();
  }
  return null;
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};

export const isTokenValid = () => {
  return !!getToken();
};