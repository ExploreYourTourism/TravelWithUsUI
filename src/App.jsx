import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import Login from './login.jsx'
import Register from './Register.jsx'
import Home from './Home.jsx'
import Cart from './Cart.jsx'
import ForgotPassword from './ForgotPassword.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/cart"            element={<Cart />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
