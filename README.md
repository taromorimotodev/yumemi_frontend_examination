

# ゆめみフロントエンドコーディング試験

## 使用技術一覧

<!-- シールド一覧 -->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/Node->=22-5FA04E.svg?style=flat&logo=node.js">
 <img src="https://img.shields.io/badge/React->=19-5FA04E.svg?style=flat&logo=react"> 
 <img src="https://img.shields.io/badge/TypeScript->=5-333.svg?style=flat&logo=typescript">
 <img src="https://img.shields.io/badge/Github
 Actions-333.svg?style=flat&logo=github-actions">
<img src="https://img.shields.io/badge/SCSS-333.svg?style=flat&logo=sass"> <img src="https://img.shields.io/badge/Stylelint-333.svg?style=flat&logo=stylelint"> <img src="https://img.shields.io/badge/prettier-333.svg?style=flat&logo=prettier">
<img src="https://img.shields.io/badge/jest-333.svg?style=flat&logo=jest">
  
</p>

## 確認URL 

[https://yumemi-frontend-examination.vercel.app/](https://yumemi-frontend-examination.vercel.app/)

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| Node.js               | 22.14.0    |
| React                 | 19.0.0     |
| Next.js               | 15.1.7     |

その他のパッケージのバージョンは package.json を参照してください


## 開発環境構築


### 推奨要件

- [Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code)
  - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)


#### .envの用意

1. `.env.sample`をコピーして`.env`にリネームする
2. [こちら](https://yumemi-frontend-engineer-codecheck-api.vercel.app/api-doc)からエンドポイントURLとAPI キーを`.env`に書き込む


#### 依存関係のインストールを実行

```shellscript
npm install
```

## 開発環境を立ち上げる

```shellscript
npm run dev
```

## その他コマンド

#### テスト（jest）の確認コマンド

```shellscript
npm run test
```
