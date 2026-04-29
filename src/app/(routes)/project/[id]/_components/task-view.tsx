"use client";

import {
    createTask,
    deleteTask,
    getAdvice,
    updateTask,
} from "@/app/(routes)/project/[id]/action";
import { BackHome } from "@/components/back-home";
import { apiFetch } from "@/lib/api-client";
import { Task, TaskStatus } from "@/types/task";
import { Download, ListTodo, Search, Table } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { CompletedModal } from "./completed-modal";
import { KanbanBoard } from "./kanban-board";
import { TaskDetailModal } from "./task-detail-modal";

type Props = {
    projectId: number;
    projectName: string;
    tasks: Task[];
    searchKeyword: string;
};

export function TaskView({
    projectId,
    projectName,
    tasks,
    searchKeyword,
}: Props) {
    const router = useRouter();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [advice, setAdvice] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState(searchKeyword);
    const isFirstRender = useRef(true); // 初回レンダリングを判定するフラグ
    const [isPending, startTransition] = useTransition();

    // searchInputが変更されたときにURLのクエリパラメータを更新する関数
    useEffect(() => {
        /// 初回レンダリング時はスキップ
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // デバウンス処理
        const timer = setTimeout(() => {
            const params = new URLSearchParams();
            if (searchInput.trim()) {
                params.set("search", searchInput.trim());
            }
            router.replace(`/project/${projectId}?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput, projectId, router]);

    // New itemボタンクリック時にモーダルを開く関数
    const handleAddItem = (status: TaskStatus) => {
        setSelectedTask({
            id: "",
            title: "",
            description: "",
            status,
            priority: "MEDIUM",
            categories: [],
        });
        setIsModalOpen(true);
    };

    // タスクカードクリック時に詳細モーダルを開く関数
    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    // カテゴリ入力を整形する関数（全角・半角のカンマを区切り文字として使用）
    const normalizeCategoriesForRequest = (categories: string[]) =>
        categories
            .flatMap((category) => category.split(/[、,]/))
            .map((category) => category.trim())
            .filter((category) => category.length > 0);

    // タスクを保存（新規作成 / 更新）する関数
    const handleSaveTask = (updatedTask: Task) => {
        startTransition(async () => {
            try {
                const normalizedCategories = normalizeCategoriesForRequest(
                    updatedTask.categories,
                );

                if (updatedTask.id === "") {
                    // 新規作成
                    await createTask(projectId, updatedTask.title, {
                        description: updatedTask.description,
                        targetDate: updatedTask.targetDate,
                        dueDate: updatedTask.dueDate,
                        priority: updatedTask.priority,
                        status: updatedTask.status,
                        categories: normalizedCategories,
                    });
                } else {
                    // 更新
                    const { allCompleted } = await updateTask(
                        Number(updatedTask.id),
                        {
                            title: updatedTask.title,
                            description: updatedTask.description,
                            targetDate: updatedTask.targetDate,
                            dueDate: updatedTask.dueDate,
                            priority: updatedTask.priority,
                            status: updatedTask.status,
                            categories: normalizedCategories,
                        },
                    );
                    if (allCompleted) {
                        const fetchedAdvice = await getAdvice();
                        setAdvice(fetchedAdvice);
                    }
                }
                setIsModalOpen(false);
                setSelectedTask(null);
            } catch (error) {
                console.error("Failed to save task:", error);
                alert(
                    `タスクの保存に失敗しました。: ${error instanceof Error ? error.message : ""}`,
                );
            }
        });
    };

    // モーダルを閉じる関数
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    // タスクを削除する関数
    const handleDeleteTask = (taskId: string) => {
        startTransition(async () => {
            try {
                await deleteTask(Number(taskId));
                setIsModalOpen(false);
                setSelectedTask(null);
            } catch (error) {
                console.error("Failed to delete task:", error);
                alert(
                    `タスクの削除に失敗しました。: ${error instanceof Error ? error.message : ""}`,
                );
            }
        });
    };

    // CSVダウンロード関数
    const handleDownloadCsv = async () => {
        setIsDownloading(true);
        try {
            const response = await apiFetch(
                `/api/projects/${projectId}/tasks/csv`,
            );
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${projectName}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            alert(
                `CSVのダウンロードに失敗しました。: ${error instanceof Error ? error.message : ""}`,
            );
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 p-6">
            {/* Header */}
            <div className="mb-6">
                <BackHome />
                <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                    <ListTodo className="w-6 h-6 text-[#009FE8]" />
                    {projectName}
                </h1>
            </div>

            {/* Menu Bar */}
            <div className="flex flex-wrap items-center gap-2 md:flex-nowrap md:gap-3 mb-6 border-b border-gray-200 pb-2">
                {/* Tabs */}
                <div className="flex items-center gap-1 order-1">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors bg-[#009FE8] text-white">
                        <Table className="w-4 h-4" />
                        ステータス別
                    </button>
                </div>
                {/* Search Bar */}
                <div className="relative order-3 w-full md:order-2 md:w-auto">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="タスク名で検索..."
                        className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:border-transparent w-full md:w-56"
                    />
                </div>
                {/* CSV Download */}
                <button
                    onClick={handleDownloadCsv}
                    disabled={isDownloading}
                    className="order-2 ml-auto flex items-center gap-2 px-2 md:px-3 py-1.5 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden md:inline">
                        {isDownloading
                            ? "ダウンロード中..."
                            : "CSVダウンロード"}
                    </span>
                </button>
            </div>

            {/* Kanban Board */}
            <KanbanBoard
                tasks={tasks}
                onTaskClick={handleTaskClick}
                onAddItem={handleAddItem}
            />

            {/* Modal */}
            {isModalOpen && selectedTask && (
                <TaskDetailModal
                    isOpen={isModalOpen}
                    isLoading={isPending}
                    task={selectedTask}
                    onSave={handleSaveTask}
                    onClose={handleCloseModal}
                    onDelete={handleDeleteTask}
                />
            )}

            {/* Completed Modal */}
            {advice && (
                <CompletedModal
                    isOpen={!!advice}
                    advice={advice}
                    onClose={() => setAdvice(null)}
                />
            )}
        </div>
    );
}
