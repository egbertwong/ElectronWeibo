var weiboList = document.getElementById("item-card");
var card = document.createElement("div");
card.className = "card";
var cardBody = document.createElement("div");
cardBody.className = "card-body";
var titleBox = document.createElement("div");
titleBox.className = "title-box";

var titleAvatar = document.createElement("div");
titleAvatar.className = "title-avatar";
var aProfile = document.createElement("a");
aProfile.href = "https://weibo.com/u/5681646916";
var imgAvatar = document.createElement("img");
imgAvatar.src = "https://tvax2.sinaimg.cn/crop.0.0.480.480.50/006cvBUoly8fvajye8lu0j30dc0dc0vm.jpg?KID=imgbed,tva&Expires=1576580616&ssig=3EXamRhT23";
imgAvatar.style = "width:48px; height:48px; border-radius:50%; overflow:hidden;";
aProfile.appendChild(imgAvatar);
titleAvatar.appendChild(aProfile);

var titleText = document.createElement("div");
titleText.className = "title-text";
var pName = document.createElement("p");
pName.className = "title-name";
pName.innerHTML = "东窗喝水";
var pCreatedAt = document.createElement("p");
pCreatedAt.className = "title-created";
pCreatedAt.innerHTML = "48分钟前 来自 <a href=\"http://weibo.com/\" rel=\"nofollow\">iPhone客户端</a>";
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
weiboText.innerText = "这是一条微博测试，来自js语句生成的HTML页面。\n单条微博测试\nDone.";

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
likeText.innerText = "转发";
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
weiboList.appendChild(card);