// preload.js

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

// 在上下文隔离的渲染器进程中，我们可以通过上下文桥接暴露的 API 来访问 Node.js 进程。
contextBridge.exposeInMainWorld('API', {
  versions: () => process.versions,
  writeFile: (value) => {
    ipcRenderer.send('onWriteFile', value)
  },
  readFile: () => {
    // 调用; 援引; 援用
    return ipcRenderer.invoke('onReadFile')
  },
  setTitle: (title) => ipcRenderer.send('set-title', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  onUpdateCounter: (callback) =>
    ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  counterValue: (value) => ipcRenderer.send('counter-value', value),
})
