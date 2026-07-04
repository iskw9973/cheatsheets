function setupQrButton(btnId, wrapId, imgId, captionId) {
  var btn = document.getElementById(btnId);
  var wrap = document.getElementById(wrapId);
  var img = document.getElementById(imgId);
  var caption = document.getElementById(captionId);
  var rendered = false;

  btn.addEventListener('click', function () {
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
}
