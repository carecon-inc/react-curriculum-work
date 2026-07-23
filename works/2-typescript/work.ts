interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
}

async function fetchUser(id: number): Promise<User | null> {
    const users: User[] = [
    { id: 1, name: "田中 太郎", email: "tanaka@example.com", role: "admin" },
    { id: 2, name: "佐藤 次郎", email: "sato@example.com", role: "user" },
    ];

    const user = users.find((u) => u.id === id);

    return user || null;
}

function getFirstElement<T>(array: T[]): T | undefined {
    return array[0];
}

async function main() {
    const user = await fetchUser(1);
    if (user) {
    console.log(`名前: ${user.name}, 権限: ${user.role}`);
    }

    const numbers = [10, 20, 30];
    const firstNumber = getFirstElement(numbers);
    console.log(`最初の数値: ${firstNumber}`);
}

main();