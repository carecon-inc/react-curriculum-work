"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const VALID_COLORS = ["blue", "orange", "green", "purple", "pink"] as const;
type ProjectColor = typeof VALID_COLORS[number];

// プロジェクト新規作成
export async function createProjectAction(data: {
    name: string;
    description?: string;
    color?: string;
}) {
    if (!data.name || data.name.trim() === "") {
        throw new Error("プロジェクト名は必須です。");
    }
    if (data.name.length > 100) {
        throw new Error("プロジェクト名は100文字以内で入力してください。");
    }
    if (data.description && data.description.length > 1000) {
        throw new Error("説明は1000文字以内で入力してください。");
    }

    // カラーが未指定または不正な場合はデフォルトで "blue" を設定
    const projectColor = data.color && VALID_COLORS.includes(data.color as ProjectColor)
        ? data.color
        : "blue";

    try {
        await prisma.project.create({
            data: {
                name: data.name,
                description: data.description || null,
                color: projectColor,
            },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to create project:", error);
        throw new Error("プロジェクトの作成に失敗しました");
    }
}

// プロジェクト更新
export async function updateProject(
    id: number,
    data: { name: string; description?: string; color?: string }
) {
    if (!data.name || data.name.trim() === "") {
        throw new Error("プロジェクト名は必須です。");
    }
    if (data.name.length > 100) {
        throw new Error("プロジェクト名は100文字以内で入力してください。");
    }
    if (data.description && data.description.length > 1000) {
        throw new Error("説明は1000文字以内で入力してください。");
    }

    const projectColor = data.color && VALID_COLORS.includes(data.color as ProjectColor)
        ? data.color
        : "blue";

    try {
        await prisma.project.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description || null,
                color: projectColor,
            },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update project:", error);
        throw new Error("プロジェクトの更新に失敗しました");
    }
}

// プロジェクト削除
export async function deleteProject(id: number) {
    try {
        await prisma.project.delete({
            where: { id },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete project:", error);
        throw new Error("プロジェクトの削除に失敗しました");
    }
}