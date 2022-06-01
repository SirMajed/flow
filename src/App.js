import React, { useEffect } from 'react'
import { BrowserRouter as Router, HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Views/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Stakeholders from './Views/Stakeholders/index'
import CreateStakeholders from './Views/Stakeholders/CreateStakeholders'
import ImportStakeholders from './Views/Stakeholders/ImportStakeholders'
import Relations from './Views/Relations'
import CreateRelations from './Views/Relations/CreateRelations'
import Results from 'Views/Results'
import isElectron from 'is-electron'
import TitleBar from 'components/TitleBar'
function App() {
  return (
    <HashRouter>
      <ToastContainer />
      {isElectron() === true && <TitleBar />}
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/stakeholders" element={<Stakeholders />} />
        <Route path="/stakeholders/create" element={<CreateStakeholders />} />
        <Route path="/stakeholders/import" element={<ImportStakeholders />} />
        <Route path="/relations" element={<Relations />} />
        <Route path="/relations/create" element={<CreateRelations />} />
        <Route path="/relations/import" element={<ImportStakeholders />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Routes>
    </HashRouter>
  )
}

export default App
