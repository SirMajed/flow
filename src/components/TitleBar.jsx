// import { app } from 'electron/main';
import React from 'react'
import isElectron from 'is-electron'
import { VscChromeMinimize, VscChromeClose, VscChromeMaximize } from 'react-icons/vsc'
import { AiOutlineNodeIndex } from 'react-icons/ai'

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
    <nav className="bg-black h-8 w-full flex fixed justify-between text-white items-center drag">
      <div className="flex items-center px-2">
        <AiOutlineNodeIndex className="text-primary" size={25} />
        <span className="px-2 text-sm text-white text-opacity-90">Stakeholders Diagram</span>
      </div>
      <div className="flex items-center justfy-center gap-3 px-3">
        <span onClick={handleMinimize} className="no-drag">
          <VscChromeMinimize className="text-gray-400 hover:text-white tranistion cursor-pointer" size={18} />
        </span>
        <span onClick={handleMaximize} className="no-drag">
          <VscChromeMaximize className="text-gray-400 hover:text-white tranistion cursor-pointer" size={20} />
        </span>
        <span onClick={handleClose} className="no-drag">
          <VscChromeClose className="text-gray-400 hover:text-white tranistion cursor-pointer" size={20} />
        </span>
      </div>
    </nav>
  )
}

export default TitleBar
