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
各章のワークを実施する際は、このブランチから作業ブランチを作成してください。

### bug-fix-work ブランチ
このブランチは「トラブルシューティング ワーク」実施時に使用するベースブランチとなります。  
トラブルシューティング ワークを実施する際は、このブランチから作業ブランチを作成してください。

### work ブランチ
このブランチは「TODOアプリの実装 ワーク」実施時に使用するベースブランチとなります。  
TODOアプリの実装 ワークを実施する際は、このブランチから作業ブランチを作成してください。

### 補足
作業ブランチの命名規則は`submit/カリキュラム開始年月日/名イニシャル_姓/単元名`となります。  
各単元名は以下となります。（詳細は各単元のNotionページを参照ください。）  
- トラブルシューティング ワーク： `bug-fix-work`  
- TODOアプリの実装 ワーク： `app-work`

---

## 🚀 環境構築手順

### 1. リポジトリをクローン

```bash
git clone <リポジトリURL>
cd react-curriculum-work
```

### 2. 環境変数ファイルを作成

```bash
cp .env.example .env.local
```

> `.env.local` の内容はそのままで問題ありません。

### 3. Dockerコンテナを起動

```bash
docker compose up -d
```

> 初回は Docker イメージのビルドが行われるため、数分かかります。

起動確認：

```bash
docker compose ps
```

以下のように `app` と `db` が `Up` になっていれば OK です。

```
NAME           STATUS
taskapp        Up
taskapp-db     Up
```

### 4. データベースのセットアップ

マイグレーション（テーブル作成）とシードデータ（初期データ投入）を実行します。

```bash
docker compose exec app npm run db:setup
```

> 「シードデータの投入が完了しました」と表示されれば成功です。

### 5. ブラウザで確認

[http://localhost:3000](http://localhost:3000) を開いて「環境構築が完了しました。」と表示されれば完了です。

---

## 💻 よく使うコマンド

| コマンド                             | 説明                             |
| ------------------------------------ | -------------------------------- |
| `docker compose up -d`               | コンテナをバックグラウンドで起動 |
| `docker compose down`                | コンテナを停止・削除             |
| `docker compose ps`                  | コンテナの状態を確認             |
| `docker compose logs app`            | appコンテナのログを確認          |
| `docker compose exec app <コマンド>` | appコンテナ内でコマンドを実行    |

---

## 🗄️ データベースの内容を確認する（Prisma Studio）

Prisma Studio を使うと、ブラウザ上でデータベースのデータをGUIで確認・編集できます。

```bash
docker compose exec app npm run db:studio
```

起動後、[http://localhost:5555](http://localhost:5555) にアクセスしてください。

> 確認が終わったら `Ctrl+C` で停止してください。

---

## 📝 Prismaスキーマを更新する場合

#### 1. `prisma/schema.prisma` を編集する

#### 2. マイグレーションを実行する

```bash
docker compose exec app npx prisma migrate dev --name <変更内容の名前>
```

> 例: `--name add_user_table`
>
> マイグレーションファイルの生成・DBへの適用・Prisma Clientの再生成が自動で行われます。

#### 3. Prisma Clientを再生成する（任意）

手順2で `prisma generate` も自動実行されるため、基本的には手順2で完結します。
型補完が更新されなかった場合は、以下を手動で実行してください。

```bash
docker compose exec app npm run db:generate
```

※ 上記を実施して、DBやPrismaクライアント（型定義ファイル）に変更が反映されているが、エラーが発生する場合は、一度Dockerコンテナを立ち上げ直してみてください。

---

## 🔧 トラブルシューティング

### ポート3000がすでに使用されている

他のアプリが3000番ポートを使用している場合は `docker-compose.yml` の以下の箇所を変更してください。

```yaml
ports:
    - "3001:3000" # 左側の番号を変更する
```

### データベースに接続できない

コンテナの起動直後はDBの準備に時間がかかることがあります。
少し待ってから再度 `db:setup` を実行してください。

```bash
docker compose exec app npm run db:setup
```

### コンテナを完全にリセットしたい

```bash
docker compose down -v  # ボリューム（DBデータ）も含めて削除
docker compose up -d
docker compose exec app npm run db:setup
```
