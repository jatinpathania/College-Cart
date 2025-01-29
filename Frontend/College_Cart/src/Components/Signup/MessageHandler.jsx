import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MessageHandler = () => {
  const {status, error, message} = useSelector((state)=>state.app);

  useEffect(()=>{
    if(status === 'success' && message){
      toast.success(message,{
        position: "top-right",
      })
    }

    if(status === 'failed' && error){
      toast.error(error,{
        position: "top-right",
      })
    }
  },[status,error,message]);
  return <ToastContainer/>
}

export default MessageHandler