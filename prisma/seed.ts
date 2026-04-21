import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";
import { Priority, PrismaClient, TaskStatus } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT)
        : 3306,
    connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    // プロジェクトのシード
    const projects = await Promise.all([
        prisma.project.upsert({
            where: { id: 1 },
            update: {},
            create: {
                name: "個人開発プロジェクト",
                description: "Next.jsを使った個人開発",
            },
        }),
        prisma.project.upsert({
            where: { id: 2 },
            update: {},
            create: {
                name: "業務プロジェクト",
                description: "会社の業務タスク管理",
            },
        }),
    ]);

    // カテゴリのシード
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { id: 1 },
            update: {},
            create: { name: "仕事" },
        }),
        prisma.category.upsert({
            where: { id: 2 },
            update: {},
            create: { name: "プライベート" },
        }),
        prisma.category.upsert({
            where: { id: 3 },
            update: {},
            create: { name: "学習" },
        }),
    ]);

    // タスクのシード
    const tasks = await Promise.all([
        prisma.task.upsert({
            where: { id: 1 },
            update: {},
            create: {
                projectId: projects[0].id,
                title: "Next.jsのドキュメントを読む",
                description: "App RouterとServer Componentsについて学ぶ",
                status: TaskStatus.TODO,
                priority: Priority.HIGH,
                dueDate: new Date("2026-05-01"),
            },
        }),
        prisma.task.upsert({
            where: { id: 2 },
            update: {},
            create: {
                projectId: projects[1].id,
                title: "週次レポートの作成",
                description: "今週の進捗をまとめてチームに共有する",
                status: TaskStatus.IN_PROGRESS,
                priority: Priority.MEDIUM,
                targetDate: new Date("2026-04-21"),
                dueDate: new Date("2026-04-25"),
            },
        }),
        prisma.task.upsert({
            where: { id: 3 },
            update: {},
            create: {
                projectId: projects[0].id,
                title: "買い物リストの確認",
                status: TaskStatus.DONE,
                priority: Priority.LOW,
            },
        }),
    ]);

    // タスクカテゴリの中間テーブルのシード
    await Promise.all([
        prisma.taskCategory.upsert({
            where: { id: 1 },
            update: {},
            create: { taskId: tasks[0].id, categoryId: categories[2].id },
        }),
        prisma.taskCategory.upsert({
            where: { id: 2 },
            update: {},
            create: { taskId: tasks[1].id, categoryId: categories[0].id },
        }),
        prisma.taskCategory.upsert({
            where: { id: 3 },
            update: {},
            create: { taskId: tasks[2].id, categoryId: categories[1].id },
        }),
    ]);

    console.log("シードデータの投入が完了しました");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
