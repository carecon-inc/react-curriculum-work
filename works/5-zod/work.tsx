import React, { useState } from "react";
import { z } from "zod";

const RegistrationSchema = z.object({
    username: z.string().min(3, { message: "ユーザー名は3文字以上で入力してください" }),
    email: z.string().email({ message: "正しいメールアドレスを入力してください" }),
    age: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "18歳以上である必要があります" })
        .min(18, { message: "18歳以上である必要があります" })
    ),
    role: z.enum(["admin", "user"], { message: "適切な値を選択してください" }),
});

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

    const result = RegistrationSchema.safeParse(formData);

    if (!result.success) {
        const errorMessages = result.error.errors.map((err) => err.message);
        setErrors(errorMessages);
        return;
    }

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