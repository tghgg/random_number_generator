//const {ipcRenderer} = require('electron')
document.querySelector('form').addEventListener('submit', (event) => {
  let random_number = Math.random()
  document.querySelector('#output').innerText = random_number
})
