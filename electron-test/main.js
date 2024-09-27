// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const path = require('node:path')
const fs = require('node:fs/promises')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    console.log('🚀 ~ ipcMain.on ~ webContents:', webContents)
    const win = BrowserWindow.fromWebContents(webContents)
    console.log('🚀 ~ ipcMain.on ~ win:', win)
    win.setTitle(title)
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment',
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement',
        },
      ],
    },
  ])

  Menu.setApplicationMenu(menu)

  // 加载 index.html
  mainWindow.loadFile(path.resolve(__dirname, './pages/index.html'))

  // 打开开发工具
  mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  // 双向 IPC 的一个常见应用是从渲染器进程代码调用主进程模块并等待结果。
  // 使用 ipcMain.handle 监听事件
  ipcMain.handle('dialog:openFile', handleFileOpen)

  ipcMain.on('counter-value', (_event, value) => {
    console.log(value) // will print value to Node console
  })

  ipcMain.on('onWriteFile', (_, data) => {
    fs.writeFile(path.resolve(__dirname, './out/test.md'), data).then(
      () => {
        console.log('写入成功')
      },
      (err) => {
        console.log('写入失败', err)
      }
    )
  })

  // 用双手触摸、举起或握住; 用手操作，操纵; 处理或负责，管理; 〈美〉买卖，经营
  ipcMain.handle('onReadFile', () => {
    return fs.readFile(path.resolve(__dirname, './out/test.md'), 'utf-8')
  })

  createWindow()

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    return filePaths[0]
  }
}
