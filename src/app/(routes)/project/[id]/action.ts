"use server";

import { apiFetch } from "@/lib/api-client";
import { prisma } from "@/lib/prisma";
import { getProjectByIdSchema } from "@/lib/zod/schemas/project.schema";
import {
    createTaskSchema,
    deleteTaskSchema,
    getTasksSchema,
    updateTaskSchema,
} from "@/lib/zod/schemas/task.schema";
import { Task } from "@/types/task";
import { revalidatePath } from "next/cache";

/**
 * 指定プロジェクトの名前を取得する
 * @param id プロジェクトID
 * @returns プロジェクトの名前
 */
export async function getProjectName(
    id: number,
): Promise<{ id: number; name: string }> {
    const parsed = getProjectByIdSchema.safeParse({ id });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    const project = await prisma.project.findUniqueOrThrow({
        where: { id },
        select: {
            id: true,
            name: true,
        },
    });

    return {
        id: project.id,
        name: project.name,
    };
}

/**
 * 指定プロジェクトのタスク一覧を取得する
 * @param projectId プロジェクトID
 * @returns タスクの配列
 */
export async function getTasks(
    projectId: number,
    keyword?: string,
): Promise<Task[]> {
    const parsed = getTasksSchema.safeParse({ projectId, keyword });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    const trimmedKeyword = parsed.data.keyword?.trim();

    const tasks = await prisma.task.findMany({
        where: {
            projectId: parsed.data.projectId,
            ...(trimmedKeyword ? { title: { contains: trimmedKeyword } } : {}),
        },
        orderBy: { createdAt: "asc" },
        select: {
            id: true,
            title: true,
            description: true,
            targetDate: true,
            dueDate: true,
            priority: true,
            status: true,
            taskCategories: {
                select: {
                    category: {
                        select: { name: true },
                    },
                },
            },
        },
    });

    return tasks.map((task) => ({
        id: task.id.toString(),
        title: task.title,
        description: task.description ?? "",
        targetDate: task.targetDate
            ? task.targetDate.toISOString().split("T")[0]
            : undefined,
        dueDate: task.dueDate
            ? task.dueDate.toISOString().split("T")[0]
            : undefined,
        priority: task.priority as Task["priority"],
        status: task.status as Task["status"],
        categories: task.taskCategories.map((tc) => tc.category.name),
    }));
}

/**
 * タスクを新規作成する
 * @param projectId プロジェクトID
 * @param title タスクタイトル
 * @param data その他のタスク情報
 * @returns 作成されたタスク
 */
export async function createTask(
    projectId: number,
    title: string,
    data?: {
        description?: string;
        targetDate?: string;
        dueDate?: string;
        priority?: Task["priority"];
        status?: Task["status"];
        categories?: string[];
    },
): Promise<void> {
    const parsed = createTaskSchema.safeParse({ projectId, title, ...data });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    const categoryIds = await getCategoryIds(parsed.data.categories);

    await prisma.task.create({
        data: {
            projectId: parsed.data.projectId,
            title: parsed.data.title,
            description: parsed.data.description,
            targetDate: parsed.data.targetDate
                ? new Date(parsed.data.targetDate)
                : undefined,
            dueDate: parsed.data.dueDate
                ? new Date(parsed.data.dueDate)
                : undefined,
            priority: parsed.data.priority,
            status: parsed.data.status,
            taskCategories:
                categoryIds.length > 0
                    ? {
                          create: categoryIds.map((categoryId) => ({
                              categoryId,
                          })),
                      }
                    : undefined,
        },
    });

    revalidatePath(`/project/${parsed.data.projectId}`);
}

/**
 * タスクを更新する
 * @param id タスクID
 * @param data 更新するタスク情報
 * @returns 更新されたタスクと全タスク完了フラグ
 */
export async function updateTask(
    id: number,
    data: {
        title: string;
        description?: string;
        targetDate?: string;
        dueDate?: string;
        priority?: Task["priority"];
        status: Task["status"];
        categories?: string[];
    },
): Promise<{ allCompleted: boolean }> {
    const parsed = updateTaskSchema.safeParse({ id, ...data });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    const categoryIds = await getCategoryIds(parsed.data.categories);

    // 更新前のステータスを取得（DONE への遷移かどうかを判定するため）
    const beforeTask = await prisma.task.findUniqueOrThrow({
        where: { id: parsed.data.id },
        select: { status: true, projectId: true },
    });

    const task = await prisma.task.update({
        where: { id: parsed.data.id },
        data: {
            title: parsed.data.title,
            description: parsed.data.description,
            targetDate: parsed.data.targetDate
                ? new Date(parsed.data.targetDate)
                : null,
            dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
            priority: parsed.data.priority,
            status: parsed.data.status,
            taskCategories: {
                deleteMany: {},
                create: categoryIds.map((categoryId) => ({ categoryId })),
            },
        },
        select: {
            projectId: true,
        },
    });

    // DONE への遷移が発生した場合のみ全完了チェックを行う
    const justBecameDone =
        beforeTask.status !== "DONE" && parsed.data.status === "DONE";

    if (!justBecameDone) {
        revalidatePath(`/project/${task.projectId}`);
        return { allCompleted: false };
    }

    // 同プロジェクト内の未完了タスク数を確認
    const incompleteCount = await prisma.task.count({
        where: {
            projectId: task.projectId,
            status: { not: "DONE" },
        },
    });

    revalidatePath(`/project/${task.projectId}`);
    return { allCompleted: incompleteCount === 0 };
}

/**
 * タスクを削除する
 * @param id 削除するタスクのID
 */
export async function deleteTask(id: number): Promise<void> {
    const parsed = deleteTaskSchema.safeParse({ id });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    const task = await prisma.task.findUniqueOrThrow({
        where: { id: parsed.data.id },
        select: { projectId: true },
    });

    if (!task) {
        throw new Error("タスクが見つかりません");
    }

    await prisma.task.delete({
        where: { id: parsed.data.id },
    });

    revalidatePath(`/project/${task.projectId}`);
}

/**
 * adviceslip APIからアドバイスを取得する
 * @returns アドバイス文字列
 */
export async function getAdvice(): Promise<string> {
    const res = await apiFetch("https://api.adviceslip.com/advice");

    const data: { slip: { id: number; advice: string } } = await res.json();
    return data.slip.advice;
}

// カテゴリ名の配列を重複を排除する関数
const normalizeCategories = (categories?: string[]) => [
    ...new Set((categories ?? []).map((name) => name.trim()).filter(Boolean)),
];

/**
 * カテゴリ名の配列から既存カテゴリを照合し、存在しないカテゴリは新規作成してIDの配列を返す
 * @param categories カテゴリ名の配列
 * @returns カテゴリIDの配列
 */
const getCategoryIds = async (categories?: string[]): Promise<number[]> => {
    const normalized = normalizeCategories(categories);
    if (normalized.length === 0) return [];

    const existing = await prisma.category.findMany({
        where: { name: { in: normalized } },
        select: { id: true, name: true },
    });

    const existingNameSet = new Set(existing.map((c) => c.name));
    const missingNames = normalized.filter(
        (name) => !existingNameSet.has(name),
    );

    if (missingNames.length === 0) {
        return existing.map((c) => c.id);
    }

    const created = await Promise.all(
        missingNames.map((name) =>
            prisma.category.create({
                data: { name },
                select: { id: true },
            }),
        ),
    );

    return [...existing.map((c) => c.id), ...created.map((c) => c.id)];
};
