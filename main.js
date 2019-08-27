const {app, BrowserWindow, ipcRenderer, ipcMain} = require('electron')
let mainWindow, htmlPath, secondWindow
const process = require('process')
const path = require('path')
app.on('ready', () => {
  console.log('app is ready')
  mainWindow = new BrowserWindow({width: 600,
    height: 650,
    show: true,
    resizeable: false,
    webPreferences:
    {nodeIntegration: true}  //extremely important as this makes main.js constants global for external scripts
  }) //show false for best practices
  htmlPath = path.join(__dirname, 'index.html')
  mainWindow.loadFile(htmlPath)
  //mainWindow.webContents.openDevTools()
})

//show the app once all loaded
//mainWindow.once('ready-to-show', () => {
  //mainWindow.show()
  //console.log('show')
//})
//quit app when close for Mac users
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // darwin is macOS win32 for Windows
    app.quit()
  }
})

ipcMain.on('create_second_window', (event) => {
  secondWindow = new BrowserWindow({width:100, height:100})
  secondWindow.loadFile("./secondWindow.html")
})
