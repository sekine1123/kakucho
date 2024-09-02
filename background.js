// 時間計測が始まっているかどうかを管理するフラグ
let timeStarted = false;
// 通知が送られたかどうかを管理するフラグ
let notificationSent_sec = false;  // 90秒前通知
//監視対象サイト
const Msites = [
    "*://*.youtube.com/*",
    "*://*.twitter.com/*",
    "*://www.amazon.co.jp/gp/video/*",
    // 他の監視対象サイトを追加
];

let flag_geturl = false;

//以下コード
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("タブ更新")
    console.log(changeInfo.url)
    if (changeInfo.url) {
        const isRestrictedSite = Msites.some(site => changeInfo.url.includes(site));
        if (isRestrictedSite) {
            console.log("サイトが制限リスト内にある");
        }
        else{
            console.log("サイトが制限リスト内にない")
        }
    }
});