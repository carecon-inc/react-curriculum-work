import { ProjectColor } from "@/generated/prisma/enums";
import { z } from "zod";

const projectColorEnum = z.enum(
    Object.values(ProjectColor) as [ProjectColor, ...ProjectColor[]],
);

// プロジェクト作成バリデーションスキーマ
export const createProjectSchema = z.object({
    name: z
        .string()
        .min(1, "プロジェクト名は必須です")
        .max(100, "プロジェクト名は100文字以内で入力してください"),
    description: z
        .string()
        .max(1000, "説明は1000文字以内で入力してください")
        .optional()
        .default(""),
    color: projectColorEnum,
});

// プロジェクト更新バリデーションスキーマ
export const updateProjectSchema = z.object({
    id: z
        .number()
        .int()
        .positive("プロジェクトIDは正の整数である必要があります"),
    name: z
        .string()
        .min(1, "プロジェクト名は必須です")
        .max(100, "プロジェクト名は100文字以内で入力してください"),
    description: z
        .string()
        .max(1000, "説明は1000文字以内で入力してください")
        .optional()
        .default(""),
    color: projectColorEnum,
});

// プロジェクト削除バリデーションスキーマ
export const deleteProjectSchema = z.object({
    id: z
        .number()
        .int()
        .positive("プロジェクトIDは正の整数である必要があります"),
});

// 指定したIDのプロジェクトを取得するバリデーションスキーマ
export const getProjectByIdSchema = z.object({
    id: z
        .number()
        .int()
        .positive("プロジェクトIDは正の整数である必要があります"),
});
