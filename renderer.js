// This runs in the index.html

//const {ipcRenderer} = require('electron')
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
  let random_number = Math.random()
  document.querySelector('#output').innerText = random_number*100
})
