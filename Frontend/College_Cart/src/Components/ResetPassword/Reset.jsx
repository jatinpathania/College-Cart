import React, { useState,  } from 'react';
import styles from './reset.module.css';
import { useDispatch,  } from 'react-redux';
import MessageHandler from '../Signup/MessageHandler';
import { useNavigate } from 'react-router-dom';
import { newPasswordSet } from '../SagaRedux/Slice';
import { toast, ToastContainer } from 'react-toastify';

const Reset = () => {
   const [password, setNewPassword] = useState('');
   const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmNewPassword){
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
    <div className={styles.bodyContainer}>
      <div className={styles.container}>
          <div className={styles.formContainer}>
            <div className={styles.box}>
        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.emailContainer}>
          <div className={styles.inputBox}>
          <input
            id="newPassword"
            name="newPassword"
            type="text"
            required
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span>New Password</span>
          <i></i>
          </div>
        </div>

        <div className={styles.passwordContainer}>
          <div className={styles.inputBox}>
          <input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            required
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <span>Confirm Password</span>
          <i></i>
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button type="submit">Set Password</button>
        </div>
      </form> 
      <ToastContainer/>
      <MessageHandler />
      </div>
      </div>
      </div>
    </div>
  );
};

export default Reset;
