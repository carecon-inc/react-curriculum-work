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
  // UserContextを作成
  const UserContext = createContext<UserContextType | undefined>(undefined);
  
  const Header: React.FC = () => {
    // Contextからユーザー情報を取得
    const context = useContext(UserContext);
  
    if (!context) {
      return null;
    }
  
    const { user } = context;
  
    return (
      <header
        style={{ padding: "10px", background: "#eee", marginBottom: "10px" }}
      >
        <p>
          ようこそ、<strong>{user.name}</strong> さん
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
    const [user, setUser] = useState<User>({ name: "田中" });
    const [text, setText] = useState("");
    const [query, setQuery] = useState("");
    const [isPending, startTransition] = useTransition();
  
    // userが変わった時にログを出す
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
  
      // queryの更新による重い再レンダリングを遅延させる
      startTransition(() => {
        setQuery(value);
      });
    };
  
    return (
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
  
          {isPending && <p>更新中...</p>}
  
          {!isPending && query && <HeavyList query={query} />}
        </div>
      </UserContext.Provider>
    );
  }