import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useTransition,
  ChangeEvent,
} from "react";

// --- 型定義 ---
interface User {
  name: string;
}

interface UserContextType {
  user: User;
}

// --- Context定義 ---
// TODO: UserContextを作成してください（型はUserContextTypeを使用）
// export:このデータ（箱）は外部ファイルからも見れますよ
// この共同データはUserContextTypeもしくは空の型ですよ。初期値は「空」
export const UserContext = createContext<UserContextType | null>(null);

const Header: React.FC = () => {
  // TODO: Contextからユーザー情報を取得して差し替えてください。
  // ユーザー情報が入っている箱（＝UserContext）を見に行きますよ
  const context = useContext(UserContext);
  // データを見に行った時空なのにuser.nameを見つけようとするとエラー→空であれば一旦ゲストにして
  const userName = context?.user.name ?? "ゲスト";

  return (
    <header
      style={{ padding: "10px", background: "#eee", marginBottom: "10px" }}
    >
      <p>
        ようこそ、<strong>{userName}</strong> さん
      </p>
    </header>
  );
};

// 意図的に負荷をかけるコンポーネント（修正不要）
const HeavyItem: React.FC<{ text: string }> = ({ text }) => {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    /* 1msのブロック */
  }
  return <li>{text}</li>;
};

// 重いコンポーネント（React.memoでqueryによるメモ化を実施している）
const HeavyList = React.memo(({ query }: { query: string }) => {
  return (
    <ul>
      {Array.from({ length: 200 }, (_, i) => (
        <HeavyItem key={i} text={`${query} の検索結果 ${i + 1}`} />
      ))}
    </ul>
  );
});

export default function App() {
  const [user, setUser] = useState({ name: "田中" });
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  //裏で画面の更新（重い処理）を準備中かどうか（true/false）
  const [isPending, startTransition] = useTransition();

  // TODO: useEffectを実装（userが変わった時だけログを出す）
  // user.nameの変更（切り替わり）を検知してログを出力
  // 切り替わるタイミングを依存配列に記述
  useEffect(() => {
    console.log("ユーザーが切り替わりました");
  }, [user]);

  // ユーザーを擬似的に変更する関数
  const toggleUser = () => {
    setUser((prev) =>
      prev.name === "田中" ? { name: "佐藤" } : { name: "田中" }
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    // TODO: queryの更新によるレンダリングは遅延してください)
    // 重い処理（最新のクエリをレンダリングする処理）を後回しにしていいよ
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    // TODO: UserContextを使用してください
    // .Providerで囲まれた部分はバケツリレーせず、valueのデータをいつどこからでも取り出せる
    <UserContext.Provider value={{ user }}>
      <div style={{ padding: "20px" }}>
        <Header />
        <button onClick={toggleUser}>ユーザーを切り替える</button>
        <hr />
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="検索..."
        />

        {/* TODO: isPendingがtrueの時に「更新中...」と表示してください */}
        {isPending && <p>更新中．．．</p>}
        {/* TODO: isPendingがfalse、かつqueryが入力時のみ、HeavyListを表示してください */}
        {!isPending && query !== "" && <HeavyList query={query} />}
      </div>
    </UserContext.Provider>
  );
}
