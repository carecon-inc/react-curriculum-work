import React, { useState } from "react";
import { z } from "zod";

// --- TODO: スキーマ定義と型抽出 ---
const RegistrationSchema = z.object({
    username: z.string().min(3, "ユーザー名は３文字以上で入力してください"),

    email: z.string().email("正しいメールアドレスを入力してください"),

    age: z.coerce.number().min(18, "18歳以上である必要があります"),

    role: z.enum(["admin", "user"], {
        message: "適切な値を選択してください",
    }),
});

type RegistrationData = z.infer<typeof RegistrationSchema>;

// TODO: RegistrationSchema を定義し、RegistrationData 型を抽出してください

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
        const result = RegistrationSchema.safeParse(formData);

        // --- TODO: 成功時と失敗時の処理 ---

        if (!result.success) {
            setErrors(result.error.issues.map((issue) => issue.message));

            return;
        }

        console.log("バリデーション成功！サーバーに送信します。");
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
