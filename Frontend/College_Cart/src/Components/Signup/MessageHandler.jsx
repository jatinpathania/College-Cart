import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { resetState } from '../SagaRedux/Slice';

const MessageHandler = () => {
  const {status, error, message} = useSelector((state)=>state.app);
  const dispatch =  useDispatch()
  useEffect(()=>{
    let timer;
    if(status === 'success' && message){
      toast.success(message,{
        position: "top-center",
        timer : setTimeout(() => dispatch(resetState()), 4000),
      })
    }

    if(status === 'failed' && error){
      toast.error(error,{
        position: "top-center",
        timer :setTimeout(() => dispatch(resetState()), 4000)
      })
    }
    return () => clearTimeout(timer); 
  },[status,error,message,dispatch]);
  return <Toaster/>
}

export default MessageHandler