import React, { useEffect, useState,  } from 'react';
import styles from './signin.module.css';
import { useDispatch, useSelector,  } from 'react-redux';
import {  signInUser} from '../SagaRedux/Slice';
import MessageHandler from '../Signup/MessageHandler';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {status,user,token} = useSelector((state)=>state.app)
  const [isLoading, setIsLoading] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
       dispatch(signInUser({ email, password }));
      //  console.log("calling dispact")
      setError(''); 
      setIsLoading(true);
    } catch (err) {
      setError('Failed to signin an account. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    if(status==='success' && user && token){
      setTimeout(()=>{ navigate("/dashboard")},2000)
      // console.log(user,token)
    }
    if (status === 'failed') {
      setIsLoading(false);
    }
  },[status,navigate])


  return (
    <div className={styles.bodyContainer}>
    <div className={styles.container}>
      <div className={styles.leftContainer}>
      <div className={styles.formContainer}>
      <div className={styles.box}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.signupText}>Signin</p>
        <p className={styles.textInformation}>Enter your information to signin an account</p>


        <div className={styles.emailContainer}>
          <div className={styles.inputBox}>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
          <i></i>
          </div>
        </div>

        <div className={styles.passwordContainer}>
          <div className={styles.inputBox}>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
          <i></i>
          </div>
          <p className={styles.forgotpassword} onClick={()=>navigate('/forgotpassword')}>Forgot password?</p>
        </div>

        <div className={styles.btnContainer}>
          <button type="submit"> {isLoading ? 'Signing In...' : 'Sign In'}</button>
        </div>
        <div className={styles.alreadyAccountContainer}>
          <p className={styles.alreadyAccount}>
            Don't have an account?<span className={styles.alreadySignin} onClick={()=>navigate('/signup')}> Sign up</span>
          </p>
        </div>
      </form>
      </div> 
      <MessageHandler />
    </div>
    </div>
    <div className={styles.rightContainer}>
    </div>
    </div>
    </div>
  );
};

export default Signin;
