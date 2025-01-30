import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetState } from '../SagaRedux/Slice';

const MessageHandler = () => {
  const {status, error, message} = useSelector((state)=>state.app);
  const dispatch =  useDispatch()
  useEffect(()=>{
    let timer;
    if(status === 'success' && message){
      toast.success(message,{
        position: "top-right",
        timer : setTimeout(() => dispatch(resetState()), 4000),
      })
    }

    if(status === 'failed' && error){
      toast.error(error,{
        position: "top-right",
        timer :setTimeout(() => dispatch(resetState()), 4000)
      })
    }
    return () => clearTimeout(timer); 
  },[status,error,message,dispatch]);
  return <ToastContainer/>
}

export default MessageHandler