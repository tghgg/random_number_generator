const {app, BrowserWindow, ipcRenderer, ipcMain, Menu, remote} = require('electron')
const process = require('process')
const path = require('path')

let mainWindow, htmlPath, secondWindow
// the menu object consists of objects in an array containing labels and/or submenus
let template = [{
  label: "Menu 1",
  submenu: [{
    label: "Item 1",
  }]}, {
    label: "Menu 2",
    submenu: [{
      label: "Nested inside Menu 2",
      submenu: [{label: "Final Boss",
      click: (menuItem, browserWindow, event) => {
        if (browserWindow === secondWindow) {
          mainWindow.webContents.send('scam_text')
          console.log('successful')
        }
      }, type: "checkbox", checked: true}] // check box list
    }, {
      type: "separator" // basically a <hr> in the submenu list
    }, {
      label: "Also nested",
      type: 'radio'  //checkbox where one item must always be chosen
    }]
  }
  ]


//let contextualMenu = remote.Menu.buildFromTemplate(  // create a contextual menu, one that is created when the user right clicks
//  [{label: "THIS IS A PYRAMID SCHEME"}, {label: "WHY AREN'T YOU RUNNING AWAY FROM THIS CRAP"}, {label: "HOLY FUCKING LORD"}]
//)
window.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  contextualMenu.popup()
})


if (process.platform === "win32") {
  let name = app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: "About",
      click: (menuItem, browserWindow, event) => { // electron automatically adds 3 arguments to our click function call
        secondWindow = new BrowserWindow({
          width: 400,
          height: 300,
          alwaysOnTop: true,
          resizable: false,
        })
        secondWindow.loadFile("./secondWindow.html")
      }
    }, {
      label: "Quit",
      accelerator: "CommandorControl+Q", // binds quit function to cmd-q
      //click: () => {app.quit()}
      // we can replace the click above with the prebuilt role: 'quit'
      role: 'quit'
    }]
  })
}
app.on('ready', () => {
  console.log('Using Node.js ' + process.versions.node + ', Electron ' + process.versions.electron + '.')
  const menu = Menu.buildFromTemplate(template)  // electron can create a menu object from a template so we don't have to list each item ourselves
  Menu.setApplicationMenu(menu)
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
  mainWindow.webContents.openDevTools()
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
