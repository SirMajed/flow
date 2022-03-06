// import { app } from 'electron/main';
import React from 'react'
import isElectron from 'is-electron'
import { AiOutlineClose } from 'react-icons/ai'
import { VscChromeMinimize } from 'react-icons/vsc'
import { BiSquare } from 'react-icons/bi'
const title_bar = {
  backgroundColor: '#000000',
  height: '30px',
  width: '100vw',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  webkitAppRegion: 'drag',
}
const nav_link = {
  fontSize: '14px',
  fontWeight: 'bold',
  webkitAppRegion: 'no-drag',
  cursor: 'pointer',
}

const TitleBar = () => {
  const handleClose = () => {
    if (isElectron()) {
      window.app.window.close()
    }
  }
  const handleMinimize = () => {
    if (isElectron()) {
      window.app.window.minimize()
    }
  }
  const handleMaximize = () => {
    if (isElectron()) {
      window.app.window.maximize()
    }
  }
  return (
    <nav style={title_bar}>
      <div>
        <span className="px-2">Stakeholders Diagram</span>
      </div>
      <div className="flex items-center justfy-center gap-4 px-3">
        <span style={nav_link} onClick={handleMinimize}>
          <VscChromeMinimize size={18} />
        </span>
        <span style={nav_link} onClick={handleMaximize}>
          <BiSquare size={18} />
        </span>
        <span style={nav_link} onClick={handleClose}>
          <AiOutlineClose size={18} />
        </span>
      </div>
    </nav>
  )
}

export default TitleBar
