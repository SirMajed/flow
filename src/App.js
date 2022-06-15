import React, { useEffect } from 'react'
import { BrowserRouter as Router, HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Views/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Stakeholders from './Views/Stakeholders/index'
import Relations from './Views/Relations'
import Results from 'Views/Results'
import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage, initLang } from 'redux/slices/uiSlice'
import { ReactComponent as Arabic } from '../src/assets/images/ar.svg'
import { ReactComponent as English } from '../src/assets/images/uk.svg'
function App() {
  const dispatch = useDispatch()
  const { language } = useSelector((s) => s.ui)
  useEffect(() => {
    dispatch(initLang())
  }, [])
  const changeLang = () => {
    dispatch(changeLanguage())
  }
  return (
    <HashRouter>
      <ToastContainer />
      <div className="mt-4 z-40 fixed bottom-0 left-0 bg-opacity-50 rounded-full ml-3 mb-2">
        {language === 'en' ? (
          <Arabic onClick={changeLang} className="w-10 h-10 cursor-pointer p-1" />
        ) : (
          <English onClick={changeLang} className="w-10 h-10 cursor-pointer p-1" />
        )}
      </div>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/stakeholders" element={<Stakeholders />} />
        <Route path="/relations" element={<Relations />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Routes>
    </HashRouter>
  )
}

export default App
