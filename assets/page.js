// 各チートシートページ共通のフッター（印刷/QR/一覧ボタンとQR表示部）を
// 注入して配線する。ページ側は qrcode.js のあとにこのファイルを読み込むだけ。
(function () {
  document.body.insertAdjacentHTML('beforeend',
    '<div class="actions">' +
      '<button onclick="window.print()">印刷</button>' +
      '<button id="qrBtn">このページのQR</button>' +
      '<a class="button" href="../">一覧へ</a>' +
    '</div>' +
    '<div class="qr-wrap" id="qrWrap">' +
      '<div class="qr-box"><img id="qrImg" alt="QR code for this page"></div>' +
      '<div class="qr-caption" id="qrCaption"></div>' +
    '</div>');

  var wrap = document.getElementById('qrWrap');
  var img = document.getElementById('qrImg');
  var caption = document.getElementById('qrCaption');
  var rendered = false;

  document.getElementById('qrBtn').addEventListener('click', function () {
    if (!rendered) {
      var url = location.href.split('#')[0];
      var qr = qrcode(0, 'M');
      qr.addData(url);
      qr.make();
      img.src = qr.createDataURL(6, 4);
      caption.textContent = url;
      rendered = true;
    }
    wrap.classList.toggle('show');
  });
})();
