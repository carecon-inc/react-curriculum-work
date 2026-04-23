"use server";

import { apiFetch } from "@/lib/api-client";
import { prisma } from "@/lib/prisma";
import {
    createTaskSchema,
    deleteTaskSchema,
    getTasksSchema,
    updateTaskSchema,
} from "@/lib/zod/schemas/task.schema";
import { Task } from "@/types/task";

const PROJECT_COLORS = [
    "bg-[#009FE8]",
    "bg-[#EC7426]",
    "bg-emerald-500",
    "bg-purple-500",
    "bg-pink-500",
];

/**
 * 指定プロジェクトの名前を取得する
 * @param id プロジェクトID
 * @returns プロジェクトの名前
 */
export async function getProjectName(
    id: number,
): Promise<{ id: number; name: string }> {
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
export async function getTasks(projectId: number): Promise<Task[]> {
    const parsed = getTasksSchema.safeParse({ projectId });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    const tasks = await prisma.task.findMany({
        where: { projectId: parsed.data.projectId },
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
    },
): Promise<Task> {
    const parsed = createTaskSchema.safeParse({ projectId, title, ...data });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    const task = await prisma.task.create({
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
        },
        select: {
            id: true,
            title: true,
            description: true,
            targetDate: true,
            dueDate: true,
            priority: true,
            status: true,
        },
    });

    return {
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
        categories: [],
    };
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
    },
): Promise<{ task: Task; allCompleted: boolean }> {
    const parsed = updateTaskSchema.safeParse({ id, ...data });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

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
        },
        select: {
            id: true,
            title: true,
            description: true,
            targetDate: true,
            dueDate: true,
            priority: true,
            status: true,
            projectId: true,
            taskCategories: {
                select: {
                    category: { select: { name: true } },
                },
            },
        },
    });

    // 同プロジェクト内の未完了タスク数を確認
    const incompleteCount = await prisma.task.count({
        where: {
            projectId: task.projectId,
            status: { not: "DONE" },
        },
    });

    return {
        task: {
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
        },
        allCompleted: incompleteCount === 0,
    };
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

    await prisma.task.delete({
        where: { id: parsed.data.id },
    });
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
