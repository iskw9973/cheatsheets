// Service Workerの登録（PWAインストール要件＋オフライン対応）。
// sw.jsのパスはこのスクリプト自身の位置から解決するので、
// トップページとサブページのどちらから読み込んでも動く。
(function () {
  if (!('serviceWorker' in navigator)) return;
  var swUrl = new URL('../sw.js', document.currentScript.src);
  navigator.serviceWorker.register(swUrl.href);
})();
