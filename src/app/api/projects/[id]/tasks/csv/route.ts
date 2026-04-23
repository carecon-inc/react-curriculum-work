import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Params) {
    const { id } = await params;
    const projectId = Number(id);

    if (isNaN(projectId)) {
        return NextResponse.json(
            { error: "Invalid project ID" },
            { status: 400 },
        );
    }

    // プロジェクトとそのタスクを取得
    let project;
    try {
        project = await prisma.project.findUnique({
            where: { id: projectId },
            select: {
                name: true,
                tasks: {
                    orderBy: { createdAt: "asc" },
                    include: {
                        taskCategories: {
                            include: { category: true },
                        },
                    },
                },
            },
        });
    } catch (error) {
        console.error("Failed to fetch project:", error);
        return NextResponse.json(
            { error: "データベースの取得に失敗しました" },
            { status: 500 },
        );
    }

    if (!project) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404 },
        );
    }

    const { name: projectName, tasks } = project;

    const header = [
        "ID",
        "タイトル",
        "説明",
        "ステータス",
        "優先度",
        "目標日",
        "期限日",
        "カテゴリ",
    ];

    const rows = tasks.map((task) => [
        task.id,
        task.title,
        task.description ?? "",
        task.status,
        task.priority ?? "",
        task.targetDate ? task.targetDate.toISOString().split("T")[0] : "",
        task.dueDate ? task.dueDate.toISOString().split("T")[0] : "",
        task.taskCategories.map((tc) => tc.category.name).join("|"),
    ]);

    const csvContent = [header, ...rows]
        .map((row) =>
            row
                .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
                .join(","),
        )
        .join("\n");

    const bom = "\uFEFF"; // Excel で文字化けしないよう BOM を付与

    return new NextResponse(bom + csvContent, {
        status: 200,
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${encodeURIComponent(projectName)}.csv"`,
        },
    });
}
