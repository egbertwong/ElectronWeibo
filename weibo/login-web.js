const { ipcRenderer, dialog } = require('electron')
const { $ } = require('./helper')

var webview = document.getElementById("wv-login")
console.log(webview.getURL())

process.dlopen = () => {
    throw new Error('Load native module is not safe')
  }
  let worker = new Worker({
      
  })
