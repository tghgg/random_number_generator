const {ipcRenderer} = require('electron')
document.querySelector('form').addEventListener('submit', (event) => {
  console.log('new window');
  ipcRenderer.send('create_second_window')
})
