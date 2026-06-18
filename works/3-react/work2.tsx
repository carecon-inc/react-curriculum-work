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

// --- タスク1: Context定義 ---
export const UserContext = createContext<UserContextType | undefined>(undefined);

// --- ヘッダーコンポーネント ---
const Header: React.FC = () => {
  // タスク1: Contextからユーザー情報を取得
  const context = useContext(UserContext);

  // Contextが正しく提供されていない場合のセーフティ
  if (!context) return null;

  return (
    <header style={{ padding: "10px", background: "#eee", marginBottom: "10px" }}>
      <p>ようこそ、<strong>{context.user.name}</strong> さん</p>
    </header>
  );
};

// --- メインのAppコンポーネント ---
export default function App() {
  const [user, setUser] = useState<User>({ name: "ユーザーA" });
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");

  // タスク3: useTransitionの初期化
  const [isPending, startTransition] = useTransition();

  // タスク2: useEffectによる副作用の制御（user変更時のみ実行）
  useEffect(() => {
    console.log("ユーザーが切り替わりました");
  }, [user]);

  // タスク3: 入力値変更時の処理
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // 入力欄の反映（即時更新）

    // 重いリストの更新を遅延させる
    startTransition(() => {
      setQuery(value);
    });
  };

  // ユーザー切り替え用（既存のボタン処理などがある場合）
  const toggleUser = () => {
    setUser((prev) => ({
      name: prev.name === "ユーザーA" ? "ユーザーB" : "ユーザーA",
    }));
  };

  return (
    // タスク1: Providerでアプリ全体を囲む
    <UserContext.Provider value={{ user }}>
      <div style={{ padding: "20px" }}>
        <Header />

        <button onClick={toggleUser} style={{ marginBottom: "20px" }}>
          ユーザーを切り替える
        </button>

        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="文字を入力してください..."
          />
        </div>

        {/* タスク3: 更新中の表示制御 */}
        {isPending && <p>更新中...</p>}

        {/* タスク3: HeavyListの表示条件（isPendingがfalse、かつ入力値が存在するとき） */}
        {!isPending && query && <HeavyList query={query} />}
      </div>
    </UserContext.Provider>
  );
}

// --- 動作確認用のダミーHeavyList（もし無ければ参考にしてください） ---
const HeavyList: React.FC<{ query: string }> = ({ query }) => {
  // 意図的に重い処理を作る
  const items = [];
  for (let i = 0; i < 5000; i++) {
    items.push(<li key={i}>{query} の結果 {i}</li>);
  }
  return <ul>{items}</ul>;
};