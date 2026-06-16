//[タスク1]
// id(数値), name(文字列), email(文字列), role("admin"または"user"のユニオン型)
interface User {
    id: number;
    name: string;
    email: string;
    role: "user" | "admin";
}

//[タスク2]
const fetchUser = async (id: number): Promise<User | null> => {
    const users: User[] = [
        { id: 1, name: "田中 太郎", email: "tanaka@example.com", role: "admin" },
        { id: 2, name: "佐藤 次郎", email: "sato@example.com", role: "user" },
    ];
    const user = users.find((u) => u.id === id);
    return user || null;
}

//[タスク3]
const getFirstElement = <T,>(array: T[]): T => {
    return array[0];
};

// 実行例
const main = async (): Promise<void> => {
    const user = await fetchUser(1);
    if (user) {
        console.log(`名前: ${user.name}, 権限: ${user.role}`);
    }
    const numbers = [10, 20, 30];
    const firstNumber = getFirstElement(numbers);
    console.log(`最初の数値: ${firstNumber}`);
};

main();
