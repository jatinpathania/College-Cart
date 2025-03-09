import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import MessageHandler from '../Signup/MessageHandler';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forGotPassword, emailveirfyForgotpassword } from '../SagaRedux/Slice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { status, isLoading, message, error: reduxError } = useSelector((state) => state.app);
  
  // Effect to handle Redux state changes
  useEffect(() => {
    if (status === 'success' && message && message.includes('verified')) {
      // Only navigate if OTP verification was successful
      const timer = setTimeout(() => {
        navigate("/newPassword");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    if (status === 'failed' && reduxError) {
      setError(reduxError);
    }
  }, [status, message, reduxError, navigate]);

  const handleSubmit = () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    
    dispatch(forGotPassword({ email }));
  };

  const handleSubmitOtp = () => {
    if (!code) {
      setError('Verification code is required');
      return;
    }
    
    dispatch(emailveirfyForgotpassword({
      email,
      code
    }));
  };

  return (
    <div className={styles.bodyContainer}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <div className={styles.box}>
            <div className={styles.form}>
              <p className={styles.signupText}>Forgot Password</p>

              <div className={styles.emailContainer}>

              <div className={styles.otpInputContainer}>
              <div className={styles.inputBox}>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='email'
              style={{color:"white"}}
            />
            <span>Email</span>
            <i></i>
            </div>
          </div>
            <button 
              className={styles.btnOTP} 
              onClick={handleSubmit} 
              disabled={isLoading || !email}
            >
              {isLoading && status === 'loading' && !code ? 'Sending...' : 'Send OTP'}
            </button>
          
        </div>

        <div className={styles.passwordContainer}>
        <div className={styles.inputBox}>
          <input
            id="code"
            name="code"
            required
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <span>Code</span>
          <i></i>
        </div>
        </div>

        <div className={styles.btnContainer}>
          <button 
            onClick={handleSubmitOtp} 
            disabled={isLoading || !code}
          >
            {isLoading && status === 'loading' && code ? 'Verifying...' : 'Verify Code'}
          </button>
        </div>
      <MessageHandler />
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ForgotPassword;