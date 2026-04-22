"use client";

import { CreateProjectModal } from "@/app/(home)/_components/create-project-modal";
import { DeleteConfirmModal } from "@/app/(home)/_components/delete-confirm-modal";
import { EditProjectModal } from "@/app/(home)/_components/edit-project-modal";
import { ProjectCard } from "@/app/(home)/_components/project-card";
import { ProjectWithInfo } from "@/types/project";
import { Folder, Plus } from "lucide-react";
import { useState } from "react";

const initialProjects: ProjectWithInfo[] = [
    {
        id: "1",
        name: "読書TODO",
        description: "技術書やビジネス書の読書管理",
        taskCount: 10,
        completedCount: 2,
        color: "bg-[#009FE8]",
    },
    {
        id: "2",
        name: "開発タスク",
        description: "プロダクト開発に関連するタスク管理",
        taskCount: 25,
        completedCount: 12,
        color: "bg-[#EC7426]",
    },
    {
        id: "3",
        name: "学習計画",
        description: "オンラインコースや資格取得の進捗管理",
        taskCount: 8,
        completedCount: 3,
        color: "bg-emerald-500",
    },
];

export default function Home() {
    const [projects, setProjects] =
        useState<ProjectWithInfo[]>(initialProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] =
        useState<ProjectWithInfo | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<ProjectWithInfo | null>(
        null,
    );

    const handleCreateProject = (name: string, description: string) => {
        const colors = [
            "bg-[#009FE8]",
            "bg-[#EC7426]",
            "bg-emerald-500",
            "bg-purple-500",
            "bg-pink-500",
        ];
        const newProject: ProjectWithInfo = {
            id: Date.now().toString(),
            name,
            description,
            taskCount: 0,
            completedCount: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
        };
        setProjects((prev) => [...prev, newProject]);
        setIsModalOpen(false);
    };

    const handleEditClick = (e: React.MouseEvent, project: ProjectWithInfo) => {
        e.preventDefault();
        e.stopPropagation();
        setProjectToEdit(project);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (id: string, name: string, description: string) => {
        setProjects((prev) =>
            prev.map((p) => (p.id === id ? { ...p, name, description } : p)),
        );
        setProjectToEdit(null);
        setIsEditModalOpen(false);
    };

    const handleDeleteClick = (
        e: React.MouseEvent,
        project: ProjectWithInfo,
    ) => {
        e.preventDefault();
        e.stopPropagation();
        setProjectToDelete(project);
        setIsDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (projectToDelete) {
            setProjects((prev) =>
                prev.filter((p) => p.id !== projectToDelete.id),
            );
            setProjectToDelete(null);
            setIsDeleteConfirmOpen(false);
        }
    };

    const handleCancelDelete = () => {
        setProjectToDelete(null);
        setIsDeleteConfirmOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
            <div className="max-w-5xl mx-auto">
                {/* ヘッドコンテンツ */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                            <Folder className="w-7 h-7 text-[#009FE8]" />
                            プロジェクト一覧
                        </h1>
                        <p className="text-gray-500 mt-1">
                            タスクを管理するプロジェクトを選択してください
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#009FE8] text-white rounded-lg hover:bg-[#0088cc] transition-colors font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        新規プロジェクト
                    </button>
                </div>

                {/* プロジェクトグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                        />
                    ))}

                    {/* 新しいプロジェクトカード */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white rounded-xl p-5 border-2 border-dashed border-gray-300 hover:border-[#009FE8] hover:bg-[#009FE8]/5 transition-all flex flex-col items-center justify-center min-h-[200px] group"
                    >
                        <div className="w-12 h-12 bg-gray-100 group-hover:bg-[#009FE8]/10 rounded-full flex items-center justify-center mb-3 transition-colors">
                            <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#009FE8]" />
                        </div>
                        <span className="text-gray-500 group-hover:text-[#009FE8] font-medium">
                            新しいプロジェクトを作成
                        </span>
                    </button>
                </div>
            </div>

            {/* 新規プロジェクト作成モーダル */}
            <CreateProjectModal
                isOpen={isModalOpen}
                onSave={handleCreateProject}
                onClose={() => setIsModalOpen(false)}
            />

            {/* プロジェクト削除確認モーダル */}
            <DeleteConfirmModal
                isOpen={isDeleteConfirmOpen}
                projectName={projectToDelete?.name || ""}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            {/* プロジェクト編集モーダル */}
            {projectToEdit && (
                <EditProjectModal
                    isOpen={isEditModalOpen}
                    project={projectToEdit}
                    onSave={handleSaveEdit}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setProjectToEdit(null);
                    }}
                />
            )}
        </div>
    );
}
