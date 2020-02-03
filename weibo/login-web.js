const { ipcRenderer, dialog } = require('electron')
const { $ } = require('./helper')

var webview = document.querySelector("webview")
webview.addEventListener('dom-ready', () => {
    webview.addEventListener('update-target-url', () => {
        const currentURL = new URL(webview.getURL())
        if (currentURL.pathname == "/oauth2/default.html") {
            getAuthCode(currentURL)
            // close()
        }
    })
})

const getAuthCode = (currentURL) => {
    const searchParams = new URLSearchParams(currentURL.search)
    const baseUrl = "http://localhost:8090/login"
    const requestURL = `${baseUrl}?code=${searchParams.get('code')}`
    var accessToken = ""
    var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
    httpRequest.open('GET', requestURL, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
    httpRequest.send();//第三步：发送请求  将请求参数写在URL中
    /**
     * 获取数据后的处理程序
     */
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var responseText = httpRequest.responseText;//获取到json字符串，还需解析
            console.log(responseText);
            var authItem = JSON.parse(responseText)
            accessToken = authItem.access_token
            console.log(accessToken);
            ipcRenderer.send('get-auth-item', authItem)
            close()
        }
    };
}

