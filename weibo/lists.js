const { ipcRenderer, dialog } = require('electron')

const obj = {
    access_token: '2.005ubVMGEI5IxD9040cd3da6EQElSB',
}

const finalUrl = `${'https://api.weibo.com/2/statuses/home_timeline.json'}?${encodeSingleWeiboParams(obj)}`

var singleWeibo = new XMLHttpRequest();//第一步：建立所需的对象
singleWeibo.open('GET', finalUrl, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
singleWeibo.send();//第三步：发送请求  将请求参数写在URL中
/**
 * 获取数据后的处理程序
 */
singleWeibo.onreadystatechange = function () {
    if (singleWeibo.readyState == 4 && singleWeibo.status == 200) {
        var responseJson = singleWeibo.responseText;//获取到json字符串，还需解析
        var item = JSON.parse(responseJson);

        var weiboArr = eval(item.statuses);
        var weiboList = document.getElementById("weibo-list");
        for ( var i = 0; i < weiboArr.length; i ++ ) {
            weiboList.appendChild(setHTML(weiboArr[i]));
        }
    }
};