"use server";

import { prisma } from "@/lib/prisma";
import {
    createProjectSchema,
    deleteProjectSchema,
    updateProjectSchema,
} from "@/lib/zod/schemas/project.schema";
import { ProjectWithInfo } from "@/types/project";

const PROJECT_COLORS = [
    "bg-[#009FE8]",
    "bg-[#EC7426]",
    "bg-emerald-500",
    "bg-purple-500",
    "bg-pink-500",
];

/**
 * プロジェクトを全て取得する
 * @returns プロジェクトの配列
 */
export async function getProjects(): Promise<ProjectWithInfo[]> {
    const projects = await prisma.project.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            description: true,
            tasks: {
                select: {
                    status: true,
                },
            },
        },
    });

    return projects.map((project) => {
        // 総タスク数
        const taskCount = project.tasks.length;
        // 完了タスク数
        const completedCount = project.tasks.filter(
            (task) => task.status === "DONE",
        ).length;

        return {
            id: project.id,
            name: project.name,
            description: project.description ?? "",
            taskCount,
            completedCount,
            color: PROJECT_COLORS[project.id % PROJECT_COLORS.length],
        };
    });
}

/**
 * 新規プロジェクトを作成する
 * @param name プロジェクト名
 * @param description プロジェクトの説明
 * @returns 作成されたプロジェクト
 */
export async function createProject(
    name: string,
    description: string,
): Promise<ProjectWithInfo> {
    const parsed = createProjectSchema.safeParse({ name, description });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    const project = await prisma.project.create({
        data: {
            name: parsed.data.name,
            description: parsed.data.description,
        },
        select: {
            id: true,
            name: true,
            description: true,
        },
    });

    return {
        id: project.id,
        name: project.name,
        description: project.description ?? "",
        taskCount: 0,
        completedCount: 0,
        color: PROJECT_COLORS[project.id % PROJECT_COLORS.length],
    };
}

/**
 * プロジェクトを更新する
 * @param id プロジェクトID
 * @param name プロジェクト名
 * @param description プロジェクトの説明
 * @returns 更新されたプロジェクト
 */
export async function updateProject(
    id: number,
    name: string,
    description: string,
): Promise<{ id: number; name: string; description: string }> {
    const parsed = updateProjectSchema.safeParse({ id, name, description });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    const updatedProject = await prisma.project.update({
        where: { id: parsed.data.id },
        data: {
            name: parsed.data.name,
            description: parsed.data.description,
        },
        select: {
            id: true,
            name: true,
            description: true,
        },
    });

    return {
        id: updatedProject.id,
        name: updatedProject.name,
        description: updatedProject.description ?? "",
    };
}

/**
 * プロジェクトを削除する
 * @param id 削除するプロジェクトのID
 */
export async function deleteProject(id: number): Promise<void> {
    const parsed = deleteProjectSchema.safeParse({ id });

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    await prisma.project.delete({
        where: { id: parsed.data.id },
    });
}
