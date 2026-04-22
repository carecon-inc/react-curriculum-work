"use client";

import { BackHome } from "@/components/back-home";
import { Task, TaskStatus } from "@/types/task";
import { BookOpen, Table } from "lucide-react";
import { useState } from "react";
import { KanbanBoard } from "./_components/kanban-board";
import { TaskDetailModal } from "./_components/task-detail-modal";

const initialTasks: Task[] = [
    {
        id: "1",
        title: "Web開発者のための［入門］Cloudflare Workers",
        description: "",
        dueDate: "",
        status: "TODO",
        categories: ["Web開発"],
    },
    {
        id: "2",
        title: "アーキテクチャモダナイゼーション",
        description: "",
        dueDate: "",
        status: "TODO",
        categories: ["アーキテクチャ"],
    },
    {
        id: "3",
        title: "ルールズオブプログラミング",
        description: "",
        dueDate: "",
        status: "IN_PROGRESS",
        categories: ["プログラミング"],
    },
    {
        id: "4",
        title: "バックエンドエンジニアのためのインフラ・クラウド大全",
        description: "",
        dueDate: "",
        status: "DONE",
        categories: ["インフラ"],
    },
];

type ViewTab = "status" | "gallery" | "all";

export default function ProjectDetail() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [activeTab, setActiveTab] = useState<ViewTab>("status");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddItem = (status: TaskStatus) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: "新しいタスク",
            description: "",
            dueDate: "",
            status,
            categories: [],
        };
        setTasks((prev) => [...prev, newTask]);
        setSelectedTask(newTask);
        setIsModalOpen(true);
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = (updatedTask: Task) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === updatedTask.id ? updatedTask : task,
            ),
        );
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 p-6">
            {/* Header */}
            <div className="mb-6">
                <BackHome />
                <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                    <BookOpen className="w-6 h-6 text-[#009FE8]" />
                    読書TODO
                </h1>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 mb-6 border-b border-gray-200 pb-2">
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
