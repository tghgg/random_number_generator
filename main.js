const {app, BrowserWindow, ipcRenderer, ipcMain} = require('electron')
let mainWindow, htmlPath, secondWindow
const process = require('process')
const path = require('path')
app.on('ready', () => {
  console.log('Using Node.js ' + process.versions.node + ', Electron ' + process.versions.electron + '.')
  mainWindow = new BrowserWindow({width: 600,
    height: 650,
    show: true,  // delay show to wait for the content to fully load
    resizable: false,
    webPreferences:
    {nodeIntegration: true}, //extremely important as this makes main.js constants global for external scripts
  })
  htmlPath = path.join(__dirname, 'index.html')
  mainWindow.loadFile(htmlPath)
  //mainWindow.webContents.openDevTools()
})

//show the app once all loaded
//mainWindow.on('ready-to-show', () => {
  //mainWindow.show()
  //console.log('show')
//})
//quit app when close for Mac users
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // darwin is macOS win32 for Windows
    app.quit()
  }
})
