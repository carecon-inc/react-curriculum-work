"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Message = {
    id: number;
    name: string;
    age: number;
    content: string;
};

// 投稿一覧取得
export async function getMessages(): Promise<Message[]> {
    return [
        { id: 1, name: "Alice", age: 25, content: "Hello, world!" },
        { id: 2, name: "Bob", age: 30, content: "Next.js の勉強中です！" },
        {
            id: 3,
            name: "Carol",
            age: 22,
            content: "みなさんよろしくお願いします。",
        },
    ];
}

const MessageSchema = z.object({
    name: z.string().min(1, "名前を入力してください"),

    // ↓ ここを修正
    age: z
    .string()
    .min(1, "年齢を入力してください") // ① 未入力（""）チェック
    .refine((val) => !isNaN(Number(val)), {
      message: "半角数値で入力してください", // ② 数値変換できるかチェック
    })
    .transform((val) => Number(val)) // ③ 文字列を数値に変換
    .pipe(
      z
        .number()
        .min(0, "0以上の数値を入力してください") // ④ 範囲チェック
        .max(120, "120以下の数値を入力してください")
    ),
    content: z.string().min(1, "メッセージを入力してください"),
});

// 投稿処理
export async function postMessage(formData: FormData): Promise<{ success?: boolean; error?: unknown }> {
    const result = MessageSchema.safeParse({
        name: formData.get("name"),
        age: formData.get("age") ?? "" ,
        content: formData.get("content"),
    });

    if (!result.success) {
        console.error("Validation error:", result.error.issues);
        return { error: result.error.issues };
    }

    console.log("投稿データ:", result.data);
    revalidatePath("/");
    return { success: true };
}
