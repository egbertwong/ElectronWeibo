const { ipcRenderer, dialog } = require('electron')
const { $ } = require('./helper')

$('btn-login').addEventListener('click', () => {
    ipcRenderer.send('show-login-page')
})

$('btn-show-single-weibo').addEventListener('click', () => {
    ipcRenderer.send('show-single-weibo')
})

$('btn-show-weibo-lists').addEventListener('click', () => {
    ipcRenderer.send('show-weibo-list')
})

var item = "<a href=\"http://weibo.com/\" rel=\"nofollow\">iPhone客户端</a>"
const source = $("source");
source.innerHTML = item;
