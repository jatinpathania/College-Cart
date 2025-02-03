import React, { useState, } from 'react';
import './form.css';
import MessageHandler from '../Signup/MessageHandler';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forGotPassword, emailveirfyForgotpassword } from '../SagaRedux/Slice';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, message } = useSelector((state) => state.app)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(forGotPassword({ email }));
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      dispatch(emailveirfyForgotpassword({
        email,
        code
      }));
      setTimeout(()=>{
        navigate("/newPassword")
       },5000)
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    }
  };

  return (
    <div className="formContainer">
      <form className="form" >
        <p className="signupText">Forgot Password</p>
        <div className="emailContainer">
          <label htmlFor="email" className="email">Email</label><br />
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
            />
            <button className='btnOTP' onClick={handleSubmit} disabled={isLoading || !email}>  {isLoading ? 'Sending...' : 'Send OTP'}</button>
          </div>
        </div>

        <div className="passwordContainer">
          <label htmlFor="code" className="password">code</label><br />
          <input
            id="code"
            name="code"
            placeholder="code"
            type="code"
             required
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

        </div>

        <div className="btnContainer">
          <button type="submit" onClick={handleSubmitOtp} disabled={isLoading || !code}>{isLoading ? 'Verifying...' : 'Verify Code'}</button>
        </div>
      </form>
      <MessageHandler />
    </div>
  );
};

export default ForgotPassword;
