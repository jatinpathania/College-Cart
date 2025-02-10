import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from './tokenService';
import { signInUserSuccess, logout } from '../Components/SagaRedux/Slice';
import { removeToken } from './tokenService';
import * as api from "../Components/SagaRedux/api";
import { UserDataContext } from '../Components/Header/context';

const PersistentAuth = ({ children }) => {
  const dispatch = useDispatch();
  const { setData } = useContext(UserDataContext);
  const { status, token, user } = useSelector((state) => state.app);

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = getToken();
      if (!savedToken) return;
      // console.log("dont calll me again")
      try {
        const response = await api.getUserProfile();
        // console.log("Profile Response:", response.data.data);
        
        dispatch(signInUserSuccess({
          token: savedToken,
          user: response.data.data
        }));
        
        setData(response.data.data);
      } catch (error) {
        console.error("Auth check error:", error);
        if (error.status === 401) {
          removeToken();
          dispatch(logout());
          setData(null);
        }
      }
    };

    if (!user) {
      checkAuth();
    }
  }, [dispatch, setData, user]);
  useEffect(() => {
    if (status === 'success' && user) {
      // console.log("Setting user data in context:", user);
      setData(user);
    }
  }, [status, user, setData]);

  return children;
};

export default PersistentAuth;