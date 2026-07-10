"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

type Message = {
  id: number;
  name: string;
  age: number;
  content: string;
};

type MessageFormError = {
  name?: string[];
  age?: string[];
  content?: string[];
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
  age: z
    .string()
    .trim()
    .min(1, "年齢を入力してください")
    .regex(/^\d+$/, "年齢は半角数字の整数で入力してください")
    .transform(Number)
    .pipe(
      z
        .number()
        .int("年齢は整数で入力してください")
        .min(1, "1以上の数値を入力してください")
        .max(120, "120以下の数値を入力してください"),
    ),
  content: z
    .string()
    .trim()
    .min(1, "メッセージを入力してください")
    .max(200, "メッセージは200文字以下で入力してください"),
});

// 投稿処理
export async function postMessage(
  formData: FormData,
): Promise<
  | { success: true; message: Message }
  | { success: false; errors: MessageFormError }
> {
  const result = MessageSchema.safeParse({
    name: formData.get("name"),
    age: formData.get("age"),
    content: formData.get("content"),
  });

  if (!result.success) {
    const errors: MessageFormError = {};

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0];

      if (
        fieldName === "name" ||
        fieldName === "age" ||
        fieldName === "content"
      ) {
        if (!errors[fieldName]) {
          errors[fieldName] = [issue.message];
        }
      }
    });

    console.error("Validation error:", result.error.issues);

    return { success: false, errors };
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

  return { success: true, message: newMessage };
}
