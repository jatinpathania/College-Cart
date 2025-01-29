import React, { useState,  } from 'react';
import './signin.css';
import { useDispatch,  } from 'react-redux';
import {  signInUser} from '../SagaRedux/Slice';
import MessageHandler from '../Signup/MessageHandler';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       dispatch(signInUser({ email, password }));
      setError('');
    } catch (err) {
      setError('Failed to signin an account. Please try again.');
    }
  };


  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <p className="signupText">Signin</p>
        <p className="textInformation">Enter your information to signin an account</p>


        <div className="emailContainer">
          <label htmlFor="email" className="email">Email</label><br />
          <input
            id="email"
            name="email"
            placeholder="@example.com"
            type="email"
          //  required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="passwordContainer">
          <label htmlFor="password" className="password">Password</label><br />
          <input
            id="password"
            name="password"
            placeholder="password"
            type="password"
          //  required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="btnContainer">
          <button type="submit">Signin</button>
        </div>

        {error && <p className="errorMessage">{error}</p>}

        <div className="alreadyAccountContainer">
          <p className="alreadyAccount">
            Don't have an account?<span className="alreadySignin" onClick={()=>navigate('/signup')}> Sign up</span>
          </p>
        </div>
      </form> 
      <MessageHandler />
    </div>
  );
};

export default Signin;
