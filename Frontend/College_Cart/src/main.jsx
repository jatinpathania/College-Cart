import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserDataProvider } from './Components/Header/context.jsx'
// import { CartProductProvider } from './Components/Product/ProductContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    // <CartProductProvider>
      <UserDataProvider>
    <App />
    </UserDataProvider>
    // {/* </CartProductProvider> */}
  // </StrictMode>,
)
