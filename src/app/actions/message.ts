"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

type Message = {
  id: number;
  name: string;
  age: number;
  content: string;
};

const messages: Message[] = [
  { id: 1, name: "Alice", age: 25, content: "Hello, world!" },
  { id: 2, name: "Bob", age: 30, content: "Next.js の勉強中です！" },
  {
    id: 3,
    name: "Carol",
    age: 22,
    content: "みなさんよろしくお願いします。",
  },
];

// 投稿一覧取得
export async function getMessages(): Promise<Message[]> {
  return messages;
}

const MessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "名前を入力してください")
    .max(20, "名前は20文字以下で入力してください"),
  age: z.coerce
    .number()
    .int("年齢は整数で入力してください")
    .min(1, "1以上の数値を入力してください")
    .max(120, "120以下の数値を入力してください"),
  content: z
    .string()
    .trim()
    .min(1, "メッセージを入力してください")
    .max(200, "メッセージは200文字以下で入力してください"),
});

// 投稿処理
export async function postMessage(formData: FormData) {
  const result = MessageSchema.safeParse({
    name: formData.get("name"),
    age: formData.get("age"),
    content: formData.get("content"),
  });

  if (!result.success) {
    console.error("Validation error:", result.error.issues);
    return;
  }

  const newMessage: Message = {
    id:
      messages.length > 0
        ? Math.max(...messages.map((message) => message.id)) + 1
        : 1,
    name: result.data.name,
    age: result.data.age,
    content: result.data.content,
  };
  messages.push(newMessage);

  console.log("投稿データ:", result.data);
  revalidatePath("/");
}
