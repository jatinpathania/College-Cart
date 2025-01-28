import React, { useState } from 'react'
import "./signup.css"


const Signup = () => {

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className='formContainer'>
      <form className='form'>
        <p className='signupText'>Signup</p>
        <p className='textInformation'>Enter your information to create an account</p>
        <div className='nameContainer'>
          <label htmlFor='name' className='name'>Name</label>
          <br />
          <input className='name'
            id='name' name='name'
            placeholder='Jhon'
            type='text' required
            value={name}
            onChange={(e)=>setName(e.target.value)} />
        </div>

        <div className='usernameContainer'>
          <label htmlFor='username' className='username'>UserName</label><br />
          <input className='username'
            id='userName' name='userName'
            placeholder='Jhon123' required
            type='text'
            value={userName} 
            onChange={(e)=>setUserName(e.target.value)}/>
        </div>

        <div className='emailContainer'>
          <label htmlFor='Email' className='email'>Email</label><br />
          <input className='email'
            id='email' name='email'
            placeholder='@example.com'
            required type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='passwordContainer'>
          <label htmlFor='password' className='password'>Password</label><br />
          <input className='password'
            id='password' name='password'
            placeholder='password' required
            type='password'
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className='btnContainer'>
          <button type='submit'>Create your account</button>
        </div>
        <div className='alreadyAccountContainer'>
          <p className='alreadyAccount'>Already have an account?<span className='alreadySignin'> signin</span></p>
        </div>
      </form>
    </div>
  )
}

export default Signup;