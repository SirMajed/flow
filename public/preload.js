const {ipcRenderer, contextBridge} = require('electron');
console.log('preload.js');
const API = {
    window:{
        close: () => ipcRenderer.send('app/close'),
        minimize: () => ipcRenderer.send('app/minimize'),
        maximize: () => ipcRenderer.send('app/maximize'),
    }
}

contextBridge.exposeInMainWorld('app', API);