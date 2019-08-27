const {app, BrowserWindow} = require('electron')
let mainWindow
const path = require('path')
app.on('ready', () => {
  console.log('app is ready')
  mainWindow = new BrowserWindow()
  mainWindow.loadFile("./index.html")
})
