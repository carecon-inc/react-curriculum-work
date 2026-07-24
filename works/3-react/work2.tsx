import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useTransition,
    ChangeEvent,
} from "react";

interface User {
    name: string;
}

interface UserContextType {
    user: User;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const Header: React.FC = () => {
    const context = useContext(UserContext);
    const user = context ? context.user : { name: "未実装" };

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

const HeavyItem: React.FC<{ text: string }> = ({ text }) => {
    const startTime = performance.now();
    while (performance.now() - startTime < 1) {}
    return <li>{text}</li>;
};

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
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
    console.log("ユーザーが切り替わりました");
    }, [user]);

    const toggleUser = () => {
    setUser((prev) =>
        prev.name === "田中" ? { name: "佐藤" } : { name: "田中" }
    );
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

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
