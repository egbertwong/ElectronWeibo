const { ipcRenderer, dialog } = require('electron')
const { $ } = require('./helper')

var webview = document.querySelector("webview")
webview.addEventListener('dom-ready', () => {
    webview.addEventListener('update-target-url', () => {
        const currentURL = new URL(webview.getURL())
        if (currentURL.pathname == "/oauth2/default.html") {
            checkURL(currentURL)
            close()
        }
    })
})

const checkURL = (currentURL) => {
    const searchParams = new URLSearchParams(currentURL.search)
    ipcRenderer.send('get-token-code', searchParams.get('code'))
}

