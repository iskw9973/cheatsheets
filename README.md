# cheatsheets

キーバインドや操作方法をまとめた、印刷・QR共有対応のチートシート集。GitHub Pagesで公開。

- 一覧: https://iskw9973.github.io/cheatsheets/
- Herdr: https://iskw9973.github.io/cheatsheets/herdr/
- Ghostty: https://iskw9973.github.io/cheatsheets/ghostty/
- Zsh Line Editing: https://iskw9973.github.io/cheatsheets/zsh/
- Neovim: https://iskw9973.github.io/cheatsheets/nvim/

## 構成

```
cheatsheets/
├── index.html          # 一覧ページ
├── assets/
│   ├── base.css         # 共通デザイン（カード・kbd・テーブル・QR表示・印刷用CSSなど）
│   ├── qrcode.js         # QRコード生成ライブラリ（kazuhikoarase/qrcode-generator）
│   └── page.js           # 共通フッター（印刷/QR/一覧ボタン・QR表示部）の注入とQR生成
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
   <script src="../assets/page.js"></script>
   ```

   印刷ボタン・QRボタン・一覧へ戻るリンク・QR表示部は `page.js` が自動で挿入するので、ページ側に書くのはカード（`.card-title` / `table`）と `.hint` だけ。`herdr/index.html` をコピーして中身を書き換えるのが早い。印刷ボタンが不要なページは `<body data-no-print>` にする。

3. トップの `index.html` の `.list` にリンクを1件追加する

   ```html
   <a class="list-item" href="foo/">
     <div class="name">🔧 Foo</div>
     <div class="desc">説明文</div>
   </a>
   ```

4. `main` に push すれば GitHub Pages が自動で再ビルドする（数十秒〜数分）

## 動作確認

```bash
git clone https://github.com/iskw9973/cheatsheets.git
cd cheatsheets
python3 -m http.server 8000
# http://localhost:8000/ を開いて確認
```
