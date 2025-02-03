import React, { useState,  } from 'react';
import './reset.css';
import { useDispatch,  } from 'react-redux';
import MessageHandler from '../Signup/MessageHandler';
import { useNavigate } from 'react-router-dom';
import { newPasswordSet } from '../SagaRedux/Slice';
import { toast, ToastContainer } from 'react-toastify';

const Reset = () => {
   const [password, setNewPassword] = useState('');
   const [confrimNewPassword, setConfrimNewPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confrimNewPassword){
      toast.error("Passwords do not match");
      return;
    }
    
    try {
       dispatch(newPasswordSet({ password }));
       setTimeout(()=>{
        navigate("/login")
       },2000)
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <div className="emailContainer">
          <label htmlFor="newPassword" className="newPassword">New Password</label><br />
          <input
            id="newPassword"
            name="newPassword"
            placeholder="new password"
            type="text"
           required
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="passwordContainer">
          <label htmlFor="confrimNewPassword" className="confrimNewPassword">Confrim Password</label><br />
          <input
            id="confrimNewPassword"
            name="confrimNewPassword"
            placeholder="confrimNewPassword"
            type="password"
           required
            value={confrimNewPassword}
            onChange={(e) => setConfrimNewPassword(e.target.value)}
          />
        </div>

        <div className="btnContainer">
          <button type="submit">Set Password</button>
        </div>
      </form> 
      <ToastContainer/>
      <MessageHandler />
    </div>
  );
};

export default Reset;
