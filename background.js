// 時間計測が始まっているかどうかを管理するフラグ
let timeStarted = false;
// 通知が送られたかどうかを管理するフラグ
let notificationSent_sec = false;  // 90秒前通知
//URL取得ができたかどうかのフラグ
let flag_geturl = false;
//監視対象サイト
const Msites = [
    "*://*.youtube.com/*",
    "*://*.twitter.com/*",
    "*://www.amazon.co.jp/gp/video/*",
    // 他の監視対象サイトを追加
];


//監視対象サイトかどうかの判別が正しくできるようになった！これからcheckTIme関数的なのを作り、制限時間・クールタイムの確認する


//以下コード
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//タブが更新された5秒後に動くコード
    console.log("タブ更新",flag_geturl)

    //URL取得ができていなかった場合のみ動作
    if (!flag_geturl){  
        setTimeout(function() {

            //URLを取得、undefinedでない値が得られた場合は制限リスト内か確認
            if (changeInfo.url||!changeInfo.url==undefined) {
                console.log("URLの取得成功:",changeInfo.url)
                flag_geturl = true;

                const isMsite = Msites.some(site => new RegExp(site.replace(/\*/g, '.*')).test(changeInfo.url));
                if (isMsite) {
                    console.log("制限サイト内,checktimeへ:",changeInfo.url);
                } else {
                    console.log("制限リスト外",changeInfo.url);
                    flag_geturl = false;
                }

            //URLを取得失敗またはundefinedであった場合は5秒待機して再試行
            }else{
                console.log("URLの取得失敗、再試行:",changeInfo.url)

                setTimeout(function() {
                    chrome.tabs.get(tabId, function(updatedTab) {
                        if (updatedTab.url||!updatedTab.url==undefined) {
                            console.log("2度目にしてURLの取得成功:",updatedTab.url);
                            flag_geturl = true;
                            const isMsite = Msites.some(site => new RegExp(site.replace(/\*/g, '.*')).test(updatedTab.url));
                            if (isMsite) {
                                console.log("制限サイト内,checktimeへ:");
                            } else {
                                console.log("制限リスト外");
                                flag_geturl = false;
                            }
                        } else {
                            console.log("2度目もURLの取得失敗",changeInfo.url);
                        }
                    });
                }, 5000);

            }
        },5000) 
    }
})


