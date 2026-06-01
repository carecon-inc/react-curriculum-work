# react-curriculum-work

Reactカリキュラムのワーク用リポジトリです。

---

## 📋 必要なもの

以下が事前にインストールされていることを確認してください。

| ツール         | リンク                                          |
| -------------- | ----------------------------------------------- |
| Docker Desktop | https://www.docker.com/products/docker-desktop/ |
| Git            | https://git-scm.com/                            |

---

## 🌲 各ベースブランチについて

### chapters-work ブランチ
このブランチは「各章のワーク（JavaScriptワークなど）」実施時に使用するベースブランチとなります。
各章のワークを実施する際は、対象ブランチから親ブランチを作成し、さらに自分の作業用ブランチを作成してください。

ブランチ例:<br>
    `(親ブランチ) submit/20260401/T_Tanaka/chapters-work/parent`<br>
    `(作業ブランチ)submit/20260401/T_Tanaka/chapters-work/parent/{各単元名}`
```
// chapters-workブランチのディレクトリ構成
// 各workファイルにワークの実装コードを記述する

works/
├── 1-javascript/
│   └── work.js
├── 2-typescript/
│   └── work.ts
├── 3-react/
│   ├── work.tsx
│   └── work2.tsx
├── 4-tailwind-css/
│   └── work.html
└── 5-zod/
    └── work.tsx
```  
### bug-fix-work ブランチ
このブランチは「トラブルシューティング ワーク」実施時に使用する対象ブランチとなります。  
トラブルシューティング ワークを実施する際は、対象ブランチから親ブランチを作成し、さらに自分の作業用ブランチを作成してください。

ブランチ例:<br>
  `(親ブランチ) submit/20260401/T_Tanaka/bug-fix-work/parent`<br>
  `(作業ブランチ)submit/20260401/T_Tanaka/bug-fix-work/parent/bug-fix-work`

### work ブランチ
このブランチは「TODOアプリの実装 ワーク」実施時に使用する対象ブランチとなります。  
TODOアプリの実装 ワークを実施する際は、対象ブランチから親ブランチを作成し、さらに自分の作業用ブランチを作成してください。<br>

ブランチ例:<br>
    `(親ブランチ) submit/20260401/T_Tanaka/bug-fix-work/parent`<br>
    `(作業ブランチ)submit/20260401/T_Tanaka/work/parent/work`

### 補足
作業ブランチの命名規則は`submit/カリキュラム開始年月日/名イニシャル_姓/単元名`となります。  
各単元名は以下となります。（詳細は各単元のNotionページを参照ください。）  
- 各章のワーク：`javascript-work`など（各章によって異なります）
- トラブルシューティング ワーク： `bug-fix-work`  
- TODOアプリの実装 ワーク： `app-work`
