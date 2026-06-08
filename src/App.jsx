import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import Login from './login.jsx'
import Register from './Register.jsx'
import Home from './Home.jsx'
import Cart from './Cart.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import Contact from './Contact.jsx'
import Gallery from './Gallery.jsx'
import Places from './Places.jsx'

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
          <Route path="/contact"         element={<Contact />} />
          <Route path="/gallery"         element={<Gallery />} />
          <Route path="/places"          element={<Places />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
