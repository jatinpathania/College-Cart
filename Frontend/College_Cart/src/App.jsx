import React from 'react'
// import Header from "./Components/Header/Header"
import './App.css'
import { Provider } from 'react-redux'
import Signup from './Components/Signup/Signup'
import Store from './Components/SagaRedux/Store'
import Signin from './Components/Signin/Signin'
import {Routes,BrowserRouter,Route} from "react-router-dom"
import ForgotPassword from './Components/ForgetPassword/Form'
import Reset from './Components/ResetPassword/Reset'

const App = () => {
  return (
    <div>
     <Provider store={Store}>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/newPassword' element={<Reset/>}/>
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App

