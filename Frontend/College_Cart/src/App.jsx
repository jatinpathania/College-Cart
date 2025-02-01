import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { Routes, BrowserRouter, Route } from "react-router-dom"
import Signup from './Components/Signup/Signup'
import Store from './Components/SagaRedux/Store'
import Signin from './Components/Signin/Signin'
import ForgotPassword from './Components/ForgetPassword/Form'
import Reset from './Components/ResetPassword/Reset'
import Home from './Components/Home/Home'
import PersistentAuth from './util/PersistentAuth'
import ProtectedRoute from './util/ProtectedRoute'
import Profile from './Components/Profile/Profile'

const App = () => {
  return (
    <Provider store={Store}>
      <PersistentAuth>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/newPassword' element={<Reset/>}/>
            <Route path='/user-profile' element={<Profile/>}/>
            <Route 
              path='/' 
              element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </PersistentAuth>
    </Provider>
  )
}

export default App