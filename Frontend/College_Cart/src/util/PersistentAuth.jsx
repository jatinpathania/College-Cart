import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from './tokenService';
import { signInUserSuccess,logout } from '../Components/SagaRedux/Slice';
import { removeToken } from './tokenService';
import * as api from "../Components/SagaRedux/api"
import { UserDataContext } from '../Components/Header/context';


const PersistentAuth = ({ children }) => {
  const dispatch = useDispatch();
  const { setData } = useContext(UserDataContext);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const fetchUserDetails = async () => {
        try {
          const response = await api.getUserProfile();
          dispatch(signInUserSuccess({
            token,
            user: response.data.data
          }));
          // console.log( response.data.data)
          setData(response.data.data)
        } catch (error) {
          if (error.status === 401) {
            removeToken();
            dispatch(logout());
          }
        }
      };

      fetchUserDetails();
    }
  }, [dispatch,setData]);

  return children;
};

export default PersistentAuth;