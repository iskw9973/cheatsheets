# cheatsheets

キーバインドや操作方法をまとめた、印刷・QR共有対応のチートシート集。GitHub Pagesで公開。

- 一覧: https://iskw9973.github.io/cheatsheets/
- Herdr: https://iskw9973.github.io/cheatsheets/herdr/
- Ghostty: https://iskw9973.github.io/cheatsheets/ghostty/
- Zsh Line Editing: https://iskw9973.github.io/cheatsheets/zsh/

## 構成

```
cheatsheets/
├── index.html          # 一覧ページ
├── assets/
│   ├── base.css         # 共通デザイン（カード・kbd・テーブル・QR表示・印刷用CSSなど）
│   ├── qrcode.js         # QRコード生成ライブラリ（kazuhikoarase/qrcode-generator）
│   └── qr.js             # QRボタンの共通ロジック
└── <tool-name>/
    └── index.html        # 各チートシート本体
```

各ページの機能：

- **印刷**: ボタン一発で名刺サイズ（91×55mm）のカード部分だけを印刷。切り取ってラミネートすればデスクに置ける実物のチートシートになる。
- **QR**: そのページ自身のURLをその場でQRコード化（外部サービス不使用、オフラインでも動く）。PCで開いてQR表示→スマホで読み取り、という使い方を想定。
- **スマホ対応**: レスポンシブ。ホーム画面に追加すれば疑似アプリとして使える。
- **ダーク/ライト自動対応**: `prefers-color-scheme` で追従。

## 新しいチートシートを追加する手順

1. ツール名のディレクトリを作る（例: `foo/`）
2. `foo/index.html` を作成し、共通アセットを読み込む

   ```html
   <link rel="stylesheet" href="../assets/base.css">
   ...
   <script src="../assets/qrcode.js"></script>
   <script src="../assets/qr.js"></script>
   <script>setupQrButton('qrBtn', 'qrWrap', 'qrImg', 'qrCaption');</script>
   ```

   `herdr/index.html` をコピーしてカード内容（`.card-title` / `table` の中身）を書き換えるのが早い。

3. 印刷ボタン・QRボタン・一覧へ戻るリンクをそのまま流用する

   ```html
   <div class="actions">
     <button onclick="window.print()">印刷</button>
     <button id="qrBtn">このページのQR</button>
     <a class="button" href="../">一覧へ</a>
   </div>
   <div class="qr-wrap" id="qrWrap">
     <div class="qr-box"><img id="qrImg" alt="QR code for this page"></div>
     <div class="qr-caption" id="qrCaption"></div>
   </div>
   ```

4. トップの `index.html` の `.list` にリンクを1件追加する

   ```html
   <a class="list-item" href="foo/">
     <div class="name">🔧 Foo</div>
     <div class="desc">説明文</div>
   </a>
   ```

5. `main` に push すれば GitHub Pages が自動で再ビルドする（数十秒〜数分）

## 動作確認

```bash
git clone https://github.com/iskw9973/cheatsheets.git
cd cheatsheets
python3 -m http.server 8000
# http://localhost:8000/ を開いて確認
```
