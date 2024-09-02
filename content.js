// content.js
console.log("YouTubeにアクセスしました！");

// ポップアップでユーザーに時間を指定させる処理
let time = prompt("利用時間を分で入力してください:");

if (time) {
  let endTime = Date.now() + time * 60000; // ミリ秒に変換
  chrome.storage.local.set({ endTime: endTime });
  console.log("終了時間が設定されました:", new Date(endTime));
}
