const {app, BrowserWindow, ipcRenderer, ipcMain} = require('electron')
let mainWindow, htmlPath, secondWindow
const process = require('process')
const path = require('path')
app.on('ready', () => {
  console.log('Using Node.js ' + process.versions.node + ', Electron ' + process.versions.electron + '.')
  mainWindow = new BrowserWindow({width: 600,
    height: 650,
    x: 0,  // set x, y coordinates of mainWindow's upper left corner like in Godot
    y: 0,
    //minHeight, maxHeight, minWidth, maxWidth are also good options to have. Best practices is to set them up
    //alwaysOnTop does what it says
    //title sets the name of the window, you can use mainWindow.setTitle to change it during runtime
    show: true,  // delay show to wait for the content to fully load
    resizable: false,
    //frame: false hides the options bar, basically borderless window in gaming
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
