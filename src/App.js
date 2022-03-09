import React from 'react'
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './Views/Home'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
