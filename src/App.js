import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './Views/Home'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Stakeholders from './Views/Stakeholders/index'
import CreateStakeholders from './Views/Stakeholders/CreateStakeholders'
import ImportStakeholders from './Views/Stakeholders/ImportStakeholders'
import Relations from './Views/Relations'
function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/stakeholders" element={<Stakeholders />} />
        <Route path="/stakeholders/create" element={<CreateStakeholders />} />
        <Route path="/stakeholders/import" element={<ImportStakeholders />} />
        <Route path="/relations" element={<Relations />} />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Routes>
    </Router>
  )
}

export default App
