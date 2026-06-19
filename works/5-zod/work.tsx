import React, { useState } from "react";
import { z } from "zod";

// --- タスク1：Zodスキーマの作成 ---
const RegistrationSchema = z.object({
  username: z.string().min(3, "ユーザー名は3文字以上で入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  age: z.number().min(18, "18歳以上である必要があります"),
  role: z.enum(["admin", "user"], {
    // 指摘1: enumのエラーメッセージはオブジェクト形式で指定
    message: "適切な値を選択してください",
  }),
});

// --- タスク2：型エイリアスの抽出 ---
type RegistrationFormData = z.infer<typeof RegistrationSchema>;

export default function App() {
  // Stateの定義 (指摘4: ageの初期値はnumber型に合わせて 0 にします)
  const [formData, setFormData] = useState<RegistrationFormData>({
    username: "",
    email: "",
    age: 0,
    role: "user",
  });
  const [errors, setErrors] = useState<string[]>([]);

  // 1. 入力変更時の処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      // ageの場合は空文字なら0、それ以外はNumber()で数値に変換してStateへ移します
      [name]: name === "age" ? (value === "" ? 0 : Number(value)) : value,
    });
  };

  // 2. フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // 指摘5: validationData を再作成せず、state の formData を直接渡す
    const result = RegistrationSchema.safeParse(formData);

    // 指摘2: 分岐をシンプルに修正
    if (!result.success) {
      // エラーメッセージの配列を作成してstateにセット
      const errorMessages = result.error.issues.map((issue) => issue.message);
      setErrors(errorMessages);
    } else {
      console.log("バリデーション成功！", result.data);

      // 指摘3: 要件にない alert() は削除

      // 指摘4: 初期化時の age も 0 にする
      setFormData({ username: "", email: "", age: 0, role: "user" });
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
          type="text"
          placeholder="ユーザー名"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="メールアドレス"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="age"
          type="number"
          placeholder="年齢"
          value={formData.age === 0 ? "" : formData.age}
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">登録</button>
      </form>

      {/* エラーメッセージの表示 */}
      {errors.length > 0 && (
        <ul style={{ color: "red", marginTop: "10px" }}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
