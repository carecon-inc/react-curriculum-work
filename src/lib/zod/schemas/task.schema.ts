import { z } from "zod";

// タスク一覧取得バリデーションスキーマ
export const getTasksSchema = z.object({
    projectId: z
        .number()
        .int()
        .positive("プロジェクトIDは正の整数である必要があります"),
    keyword: z.string().optional(),
});

// タスク新規作成バリデーションスキーマ
export const createTaskSchema = z.object({
    projectId: z
        .number()
        .int()
        .positive("プロジェクトIDは正の整数である必要があります"),
    title: z
        .string()
        .min(1, "タスクタイトルは必須です")
        .max(255, "タスクタイトルは255文字以内で入力してください"),
    description: z.string().optional(),
    targetDate: z.string().optional(),
    dueDate: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
    categories: z
        .array(
            z
                .string()
                .min(1, "カテゴリは1文字以上で入力してください")
                .max(30, "カテゴリは30文字以内で入力してください"),
        )
        .optional(),
});

// タスク更新バリデーションスキーマ
export const updateTaskSchema = z.object({
    id: z.number().int().positive("タスクIDは正の整数である必要があります"),
    title: z
        .string()
        .min(1, "タスクタイトルは必須です")
        .max(255, "タスクタイトルは255文字以内で入力してください"),
    description: z.string().optional(),
    targetDate: z.string().optional(),
    dueDate: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
    categories: z
        .array(
            z
                .string()
                .min(1, "カテゴリは1文字以上で入力してください")
                .max(30, "カテゴリは30文字以内で入力してください"),
        )
        .optional(),
});

// タスク削除バリデーションスキーマ
export const deleteTaskSchema = z.object({
    id: z.number().int().positive("タスクIDは正の整数である必要があります"),
});
