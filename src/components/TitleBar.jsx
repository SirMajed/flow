// import { app } from 'electron/main';
import React from 'react'
import isElectron from 'is-electron'
import { VscChromeMinimize, VscChromeClose, VscChromeMaximize } from 'react-icons/vsc'
import { AiOutlineNodeIndex } from 'react-icons/ai'
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
      <div className="flex items-center px-2">
        <AiOutlineNodeIndex className="text-primary" size={25} />
        <span className="px-2 text-sm text-white text-opacity-90">Stakeholders Diagram</span>
      </div>
      <div className="flex items-center justfy-center gap-3 px-3">
        <span style={nav_link} onClick={handleMinimize}>
          <VscChromeMinimize className="text-gray-400 hover:text-white tranistion" size={18} />
        </span>
        <span style={nav_link} onClick={handleMaximize}>
          <VscChromeMaximize className="text-gray-400 hover:text-white tranistion" size={20} />
        </span>
        <span style={nav_link} onClick={handleClose}>
          <VscChromeClose className="text-gray-400 hover:text-white tranistion" size={20} />
        </span>
      </div>
    </nav>
  )
}

export default TitleBar
