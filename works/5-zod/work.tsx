import React, { useState } from "react";
import { z } from "zod";

// --- TODO: スキーマ定義と型抽出 ---

// タスク1：RegistrationSchema を定義
const RegistrationSchema = z.object({
  username: z.string().min(3, "ユーザー名は3文字以上で入力してください"),

  email: z.string().email("正しいメールアドレスを入力してください"),

  age: z.coerce.number().min(18, "18歳以上である必要があります"),

  role: z.enum(["admin", "user"], {
    error: "適切な値を選択してください",
  }),
});

// タスク2：スキーマから TypeScript の型を抽出
type RegistrationData = z.infer<typeof RegistrationSchema>;

export default function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    role: "user",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // タスク3：バリデーションの実行
    const result = RegistrationSchema.safeParse(formData);

    // 失敗時：エラーメッセージを画面に表示
    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => issue.message);
      setErrors(errorMessages);
      return;
    }

    // 成功時：成功メッセージをコンソールに出力
    const validatedData: RegistrationData = result.data;
    console.log("バリデーション成功！サーバーに送信します。", validatedData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>ユーザー登録</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          name="username"
          placeholder="ユーザー名"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="メールアドレス"
          onChange={handleChange}
        />
        <input
          name="age"
          type="number"
          placeholder="年齢"
          onChange={handleChange}
        />
        <select name="role" onChange={handleChange}>
          <option value="user">一般ユーザー</option>
          <option value="admin">管理者</option>
          <option value="guest">ゲスト（不正な値）</option>
        </select>
        <button type="submit">登録</button>
      </form>

      {errors.length > 0 && (
        <ul style={{ color: "red", marginTop: "20px" }}>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
