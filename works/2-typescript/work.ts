// TODO: Userインターフェイスを定義してください
// id(数値), name(文字列), email(文字列), role("admin"または"user"のユニオン型)
type User {
  id: number;
  name: string;
  email: string;
  role: admin | user;
}

// TODO: fetchUserの引数、返り値に適切な形を定義してください
async function fetchUser(id: number): Promise<User | null> {
  const users = [
    { id: 1, name: "田中 太郎", email: "tanaka@example.com", role: "admin" },
    { id: 2, name: "佐藤 次郎", email: "sato@example.com", role: "user" },
  ];

  const user = users.find((u) => u.id === id);

  // ユーザーが見つからなかった場合はnullを返す
  return user || null;
}

// TODO: 配列を受け取って、その最初の要素を返すジェネリック関数になるように型定義をしてください
function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

// 実行例
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
