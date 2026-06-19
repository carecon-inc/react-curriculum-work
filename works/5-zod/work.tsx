import React, { useState } from "react";
import { z } from "zod";

// --- タスク1：Zodスキーマの作成 ---
const RegistrationSchema = z.object({
  username: z.string().min(3, "ユーザー名は3文字以上で入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  age: z.number().min(18, "18歳以上である必要があります"),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "適切な値を選択してください" }),
  }),
});

// --- タスク2：型エイリアスの抽出 ---
type RegistrationData = z.infer<typeof RegistrationSchema>;

export default function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: 0,
    role: "user",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // --- タスク3：バリデーションの実行 ---
    const validationData = {
      username: formData.username,
      email: formData.email,
      age: formData.age === "" ? undefined : Number(formData.age),
      role: formData.role,
    };

    const result = RegistrationSchema.safeParse(validationData);

    if (!result.success) {
      // 💡 result.error が確実に存在する場合のみ issues を安全に map する
      if (result.error && result.error.issues) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        setErrors(errorMessages);
      } else {
        setErrors(["バリデーションエラーが発生"]);
      }
    } else {
      console.log("バリデーション成功！", result.data);
      alert("登録が成功！");

      setFormData({ username: "", email: "", age: "", role: "user" });
    }
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
          value={formData.username}
          placeholder="ユーザー名"
          onChange={handleChange}
        />
        <input
          name="email"
          value={formData.email}
          placeholder="メールアドレス"
          onChange={handleChange}
        />
        <input
          name="age"
          type="number"
          value={formData.age}
          placeholder="年齢"
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">一般ユーザー</option>
          <option value="admin">管理者</option>
          <option value="guest">ゲスト（不正な値）</option>
        </select>
        <button type="submit">登録</button>
      </form>

      {/* エラーがある時だけ画面に表示する処理 */}
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
