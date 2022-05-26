import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Views/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Stakeholders from './Views/Stakeholders/index'
import CreateStakeholders from './Views/Stakeholders/CreateStakeholders'
import ImportStakeholders from './Views/Stakeholders/ImportStakeholders'
import Relations from './Views/Relations'
import CreateRelations from './Views/Relations/CreateRelations'
import Results from 'Views/Results'
import { useDispatch } from 'react-redux'
import { addRelationArray, addStakeholderArray } from 'redux/slices/stakeholderSlice'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      addStakeholderArray([
        { label: 'test1', type: 's1' },
        { label: 'test2', type: 's2' },
        { label: 'test3', type: 's3' },
        { label: 'test4', type: 's4' },
      ])
    )
    dispatch(
      addRelationArray([
        {
          from: 'test1',
          to: 'test2',
          rel: 'RELATION TEXT',
          weight: 0.3,
          reltype: 2,
          relcolor: 'orange',
        },
        {
          from: 'test1',
          to: 'test3',
          rel: 'RELATION TEXT',
          weight: 0.4,
          reltype: 2,
          relcolor: 'red',
        },
        {
          from: 'test2',
          to: 'test4',
          rel: 'RELATION TEXT',
          weight: 0.4,
          reltype: 2,
          relcolor: 'black',
        },
      ])
    )
  }, [])
  return (
    <Router>
      <ToastContainer />
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
    </Router>
  )
}

export default App
