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
import AddProduct from './Components/AddProductForm/AddProduct'
import Product from './Components/Product/Product'
import Messages from './Components/Messages/Messages'
import ProductDetails from './Components/Product/ProductDetails'
import CartProduct from './Components/CartProduct/CartProduct'
import Electronic from './Components/Home/Category/Electronices/ExploreElectronices/Electronic'
import Book from './Components/Home/Category/Books/ExploreBooks/Books'
import Clothings from './Components/Home/Category/Clothings/ExploreClothings/Clothings'
import Sport from './Components/Home/Category/SportsEquipment/ExploreSports/Sport'
import Grocery from './Components/Home/Category/Grocery/ExploreGrocery/Grocery'

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
            <Route path='/:id/user-profile'
             element={<ProtectedRoute><Profile/></ProtectedRoute>}
             />
             <Route path='/' element={<Home/>}/>
             <Route path='/:id/add-products-user' element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
             <Route path='/all-products' element={<Product/>}/>
             <Route path='/messages' element={<Messages/>}/>
             <Route path="/:id/product" element={<ProductDetails/>} />
             <Route path='/addCartProudct' element={<CartProduct/>}/>
             <Route path='/all-electronic-item' element={<Electronic/>}/>
             <Route path='/all-book-item' element={<Book/>}/>
             <Route path='/all-clothing-item' element={<Clothings/>}/>
             <Route path='/all-sport-item' element={<Sport/>}/>
             <Route path='/all-grocery-item' element={<Grocery/>}/>
            <Route 
              path='/dashboard' 
              element={
                // <ProtectedRoute>
                  <Home/>
                // </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </PersistentAuth>
    </Provider>
  )
}

export default App