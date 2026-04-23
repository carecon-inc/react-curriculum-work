"use client";

import {
    createTask,
    deleteTask,
    updateTask,
} from "@/app/(routes)/project/[id]/action";
import { BackHome } from "@/components/back-home";
import { apiFetch } from "@/lib/api-client";
import { Task, TaskStatus } from "@/types/task";
import { BookOpen, Download, Table } from "lucide-react";
import { useState } from "react";
import { KanbanBoard } from "./kanban-board";
import { TaskDetailModal } from "./task-detail-modal";

type Props = {
    projectId: number;
    projectName: string;
    initialTasks: Task[];
};

type ViewTab = "status" | "gallery" | "all";

export function TaskView({ projectId, projectName, initialTasks }: Props) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [activeTab, setActiveTab] = useState<ViewTab>("status");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

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

    // タスクを保存（新規作成 / 更新）する関数
    const handleSaveTask = async (updatedTask: Task) => {
        try {
            if (updatedTask.id === "") {
                // 新規作成
                const created = await createTask(projectId, updatedTask.title, {
                    description: updatedTask.description,
                    targetDate: updatedTask.targetDate,
                    dueDate: updatedTask.dueDate,
                    priority: updatedTask.priority,
                    status: updatedTask.status,
                });
                setTasks((prev) => [...prev, created]);
            } else {
                // 更新
                const saved = await updateTask(Number(updatedTask.id), {
                    title: updatedTask.title,
                    description: updatedTask.description,
                    targetDate: updatedTask.targetDate,
                    dueDate: updatedTask.dueDate,
                    priority: updatedTask.priority,
                    status: updatedTask.status,
                });
                setTasks((prev) =>
                    prev.map((task) => (task.id === saved.id ? saved : task)),
                );
            }
            setIsModalOpen(false);
            setSelectedTask(null);
        } catch (error) {
            console.error("Failed to save task:", error);
            alert("タスクの保存に失敗しました。");
        }
    };

    // モーダルを閉じる関数
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    // タスクを削除する関数
    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTask(Number(taskId));
            setTasks((prev) => prev.filter((task) => task.id !== taskId));
            setIsModalOpen(false);
            setSelectedTask(null);
        } catch (error) {
            console.error("Failed to delete task:", error);
            alert("タスクの削除に失敗しました。");
        }
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
                error instanceof Error
                    ? error.message
                    : "CSVのダウンロードに失敗しました。",
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
                    <BookOpen className="w-6 h-6 text-[#009FE8]" />
                    {projectName}
                </h1>
            </div>

            {/* Menu Bar */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
                {/* Tabs */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setActiveTab("status")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${
                            activeTab === "status"
                                ? "bg-[#009FE8] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <Table className="w-4 h-4" />
                        ステータス別
                    </button>
                </div>
                {/* CSV Download */}
                <button
                    onClick={handleDownloadCsv}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-3 py-1.5 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-4 h-4" />
                    {isDownloading ? "ダウンロード中..." : "CSVダウンロード"}
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
                    task={selectedTask}
                    onSave={handleSaveTask}
                    onClose={handleCloseModal}
                    onDelete={handleDeleteTask}
                />
            )}
        </div>
    );
}
