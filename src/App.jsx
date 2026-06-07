import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Login.jsx'
import Register from './Register.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
