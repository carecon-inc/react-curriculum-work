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
// 【タスク１】UserContextを作成してください（型はUserContextTypeを使用）
export const UserContext = createContext<UserContextType | undefined>(undefined);
const Header: React.FC = () => {
  // 【タスク１】Contextからユーザー情報を取得して差し替えてください。
  const context = useContext(UserContext); // React.useContext から useContext に修正可能
  const user = context ? context.user : { name: "未実装" };
  return (
    <header style={{ padding: "10px", background: "#eee", marginBottom: "10px" }}>
      <p>ようこそ、<strong>{user.name}</strong> さん</p>
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
  const [user, setUser] = useState<User>({ name: "田中" });
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  // 【タスク２】useEffectを実装（userが変わった時だけログを出す）
  useEffect(() => {
    console.log("ユーザーが切り替わりました");
  }, [user]);
  // 【タスク３】useTransitionの導入
  const [isPending, startTransition] = useTransition();
  // ユーザーを擬似的に変更する関数
  const toggleUser = () => {
    setUser((prev) => ({
      name: prev.name === "田中" ? "佐藤" : "田中",
    }));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    // 【タスク３】queryの更新によるレンダリングは遅延してください
    startTransition(() => {
      setQuery(value);
    });
  };
  return (
    // 【タスク１】UserContextを使用してください（useContext.Providerから修正）
    <UserContext.Provider value={{ user }}>
      <div style={{ padding: "20px" }}>
        <Header />
        <button onClick={toggleUser}>ユーザーを切り替える</button>
        <hr />
        <input type="text" value={text} onChange={handleChange} placeholder="検索..." />
        {/* 【タスク３】isPendingがtrueの時に「更新中...」と表示してください */}
        {isPending && <p>更新中...</p>}
        {/* 【タスク３】isPendingがfalse、かつqueryが入力時のみ、HeavyListを表示してください */}
        {!isPending && query !== "" && <HeavyList query={query} />}
        {/* 不要なHeavyListの重複表示を削除 */}
      </div>
    </UserContext.Provider>
  );
}