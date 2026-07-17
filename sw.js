// ネットワーク優先＋キャッシュフォールバック。オンライン時は常に最新を取り、
// 取れたものをキャッシュしておいてオフライン時はそれを返す。
// ページを追加したら PRECACHE に足して CACHE のバージョンを上げる。
var CACHE = 'cheatsheets-v1';
var PRECACHE = [
  './',
  './herdr/',
  './ghostty/',
  './zsh/',
  './nvim/',
  './assets/base.css',
  './assets/qrcode.js',
  './assets/page.js',
  './assets/pwa.js',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './manifest.webmanifest'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(PRECACHE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return res;
      })
      .catch(function () {
        return caches.match(e.request, { ignoreSearch: true });
      })
  );
});
