import React, { useState } from "react";
import { z } from "zod";

// --- TODO: スキーマ定義と型抽出 ---
// coerceで文字列を数値に強制変換
// enumで決まった選択肢を作成
const UserSchema = z.object({
  username: z.string().min(3, "ユーザー名は3文字以上で入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  age: z.coerce.number().min(18, "18歳以上である必要があります"),
  role: z.enum(["admin", "user"], { message: "適切な値を選択してください" }),
});

// TODO: RegistrationSchema を定義し、RegistrationData 型を抽出してください
type RegistrationData = z.infer<typeof UserSchema>;

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

    // --- TODO: バリデーションの実行 ---
    // formDataをUserSchemaに照らし合わせてチェック、この間エラーが起きてもプログラムは止まらない（safeParse)
    const result = UserSchema.safeParse(formData);
    // --- TODO: 成功時と失敗時の処理 ---
    // どの項目がどう間違っているコンソールに出力
    if (!result.success) {
      console.log("データの形式が不正です:", result.error.format());

      // Zodのエラーレポートから「エラーメッセージの文字列」だけを抜き出し、配列を作る
      const errorMessage = result.error.errors.map((error) => error.message);
      // 作った配列をStateに保存、画面に赤文字でエラーを表示
      setErrors(errorMessage);
      // 処理を終了
      return;
    }

    // サーバーに送信
    console.log("バリデーション成功！サーバーに送信します。", result.data);
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
          // ReactのStateと画面に表示されている文字を完全に同期
          value={formData.username}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="メールアドレス"
          // ReactのStateと画面に表示されている文字を完全に同期
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="age"
          type="number"
          placeholder="年齢"
          // ReactのStateと画面に表示されている文字を完全に同期
          value={formData.age}
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
