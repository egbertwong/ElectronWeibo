/**
 * 拼接对象为请求单条微博字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
function encodeSingleWeiboParams(obj) {
    const params = []

    Object.keys(obj).forEach((key) => {
        let value = obj[key]
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
            value = ''
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='))
    })

    return params.join('&')
}

/**
 * 解析微博时间参数为时间对象
 * @param {string} timeStr - 传入的时间字符串，如：“Tue Dec 17 11:44:02 +0800 2019”
 * @returns {string} - 返回发微博时间，“刚刚”、“xx分钟前”等。
 * @description 用于显示微博的时间，首先将获取到的json里面的字符串解析成对象，然后根据当前时间切换成“刚刚”、“xx分钟前”等。
 */
function encodeWeiboTime(timeStr) {
    //拆分字符串
    var timeArr = timeStr.split(" ")
    var en_mon_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
    var month
    for (var i = 0; i < 12; i++) {
        if (timeArr[1] == en_mon_arr[i]) {
            month = i + 1;
            break;
        }
    }

    //计算时间差
    var time = timeArr[5] + "/" + month.toString() + "/" + timeArr[2] + " " + timeArr[3]
    var createDate = new Date(time);
    var curDate = new Date();
    var dateDiff = curDate.getTime() - createDate.getTime();

    var days = Math.floor(dateDiff / (24 * 3600 * 1000));
    var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    var leave2 = leave1 % (3600 * 1000);//计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));

    var created_at = "";
    if ( days >= 1 || hours >= 12) {
        if ( curDate.getFullYear() != createDate.getFullYear() ) {
            return createDate.getFullYear() + "-" + createDate.getMonth() + "-" + 
            createDate.getDate() + " " + createDate.getHours() + 
            ":" + createDate.getMinutes();
        } else if ( curDate.getMonth() != createDate.getMonth() || curDate.getDate() != createDate.getDate() ) {
            return createDate.getMonth() + "-" + createDate.getDate() + " " + createDate.getHours() + ":" + createDate.getMinutes();
        } else {
            return createDate.getHours() + ":" + createDate.getMinutes();
        }
    } else if ( hours >= 1 ) {
        return hours.toString() + "小时前";
    } else if ( minutes >= 5 ) {
        return minutes.toString() + "分钟前";
    } else {
        return "刚刚";
    }
}

/**
 * 生成单条微博卡片，返回给列表
 * @param {Object} jsonItem
 * @returns {document.createElement("div")} - 单条微博的卡片，使用 appendChild 放入列表 <div> 中
 */
function setHTML(jsonItem) {
    var card = document.createElement("div");
    card.className = "card";
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    var titleBox = document.createElement("div");
    titleBox.className = "title-box";

    var titleAvatar = document.createElement("div");
    titleAvatar.className = "title-avatar";
    var aProfile = document.createElement("a");
    aProfile.href = jsonItem.user.profile_url;
    console.log(jsonItem.user.profile_url)
    var imgAvatar = document.createElement("img");
    imgAvatar.src = jsonItem.user.profile_image_url;
    imgAvatar.style = "width:48px; height:48px; border-radius:50%; overflow:hidden;";
    aProfile.appendChild(imgAvatar);
    titleAvatar.appendChild(aProfile);

    var titleText = document.createElement("div");
    titleText.className = "title-text";
    var pName = document.createElement("p");
    pName.className = "title-name";
    pName.innerText = jsonItem.user.screen_name;
    var pCreatedAt = document.createElement("p");
    pCreatedAt.className = "title-created";
    var timeStr = encodeWeiboTime(jsonItem.created_at);
    if ( jsonItem.source != "" ) {
        timeStr = timeStr + " 来自 " + jsonItem.source;
    }
    pCreatedAt.innerHTML = timeStr;
    titleText.appendChild(pName);
    titleText.appendChild(pCreatedAt);

    titleBox.appendChild(titleAvatar);
    titleBox.appendChild(titleText);

    var weiboArticle = document.createElement("article");
    weiboArticle.className = "weibo-main";
    var weiboOg = document.createElement("div");
    weiboOg.className = "weibo-og";
    var weiboText = document.createElement("div");
    weiboText.className = "weibo-text";
    weiboText.innerText = jsonItem.text;

    weiboOg.appendChild(weiboText);
    weiboArticle.appendChild(weiboOg);

    var footer = document.createElement("footer");
    footer.style = "margin-top: 8px;";

    var retweet = document.createElement("div");
    retweet.className = "weibo-footer";
    var retweetIcon = document.createElement("img");
    retweetIcon.src = "../resources/retweet.svg";
    retweetIcon.style = "vertical-align:middle;";
    var retweetText = document.createElement("span");
    retweetText.className = "weibo-footer-text";
    retweetText.innerText = "转发";
    retweet.appendChild(retweetIcon);
    retweet.appendChild(retweetText);

    var comment = document.createElement("div");
    comment.className = "weibo-footer";
    var commentIcon = document.createElement("img");
    commentIcon.src = "../resources/comment.svg";
    commentIcon.style = "vertical-align:middle;";
    var commentText = document.createElement("span");
    commentText.className = "weibo-footer-text";
    commentText.innerText = "评论";
    comment.appendChild(commentIcon);
    comment.appendChild(commentText);

    var like = document.createElement("div");
    like.className = "weibo-footer";
    var likeIcon = document.createElement("img");
    likeIcon.src = "../resources/like.svg";
    likeIcon.style = "vertical-align:middle;";
    var likeText = document.createElement("span");
    likeText.className = "weibo-footer-text";
    likeText.innerText = "点赞";
    like.appendChild(likeIcon);
    like.appendChild(likeText);

    var more = document.createElement("div");
    more.className = "weibo-footer";
    var moreIcon = document.createElement("img");
    moreIcon.src = "../resources/more.svg";
    moreIcon.style = "vertical-align:middle;";
    more.appendChild(moreIcon);

    footer.appendChild(retweet);
    footer.appendChild(comment);
    footer.appendChild(like);
    footer.appendChild(more);

    cardBody.appendChild(titleBox);
    cardBody.appendChild(weiboArticle);
    cardBody.appendChild(footer);
    card.appendChild(cardBody);

    return card;
}