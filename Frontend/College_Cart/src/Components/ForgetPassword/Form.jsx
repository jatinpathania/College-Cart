import React, { useState, useEffect } from 'react';
import './form.css';
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
    <div className="formContainer">
      <div className='form'>
        <p className="signupText">Forgot Password</p>
        <div className="emailContainer">
          <label htmlFor="email" className="email" style={{color:"white"}}>Email</label><br />
          <div className='otpInputContainer'>
            <input
              id="email"
              name="email"
              placeholder="@example.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='email'
              style={{color:"white"}}
            />
            <button 
              className='btnOTP' 
              onClick={handleSubmit} 
              disabled={isLoading || !email}
            >
              {isLoading && status === 'loading' && !code ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        </div>

        <div className="passwordContainer">
          <label htmlFor="code" className="password">Code</label><br />
          <input
            id="code"
            name="code"
            placeholder="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="btnContainer">
          <button 
            onClick={handleSubmitOtp} 
            disabled={isLoading || !code}
          >
            {isLoading && status === 'loading' && code ? 'Verifying...' : 'Verify Code'}
          </button>
        </div>
      </div>
      <MessageHandler />
    </div>
  );
};

export default ForgotPassword;