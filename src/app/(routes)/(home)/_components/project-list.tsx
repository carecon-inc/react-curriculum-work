"use client";

import { CreateProjectModal } from "@/app/(routes)/(home)/_components/create-project-modal";
import { DeleteConfirmModal } from "@/app/(routes)/(home)/_components/delete-confirm-modal";
import { EditProjectModal } from "@/app/(routes)/(home)/_components/edit-project-modal";
import { ProjectCard } from "@/app/(routes)/(home)/_components/project-card";
import {
    createProject,
    deleteProject,
    updateProject,
} from "@/app/(routes)/(home)/action";
import { PrimaryButton } from "@/components/primary-button";
import { ProjectColor } from "@/generated/prisma/enums";
import { ProjectWithInfo } from "@/types/project";
import { Folder, Plus } from "lucide-react";
import { useState, useTransition } from "react";

type Props = {
    projects: ProjectWithInfo[];
};

export const ProjectList = ({ projects }: Props) => {
    const [isPending, startTransition] = useTransition();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] =
        useState<ProjectWithInfo | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<ProjectWithInfo | null>(
        null,
    );

    // 新規プロジェクトを作成する関数
    const handleCreateProject = async (
        name: string,
        description: string,
        color: ProjectColor,
    ) => {
        startTransition(async () => {
            try {
                await createProject(name, description, color);
                setIsModalOpen(false);
            } catch (error) {
                console.error("Failed to create project:", error);
                alert(
                    `プロジェクトの作成に失敗しました。: ${error instanceof Error ? error.message : ""}`,
                );
            }
        });
    };

    // 編集ボタンクリック時に対象プロジェクトをセットして編集モーダルを開く関数
    const handleEditClick = (e: React.MouseEvent, project: ProjectWithInfo) => {
        e.preventDefault();
        e.stopPropagation();
        setProjectToEdit(project);
        setIsEditModalOpen(true);
    };

    // 編集モーダルの保存時にプロジェクト情報を更新する関数
    const handleSaveEdit = async (
        id: number,
        name: string,
        description: string,
        color: ProjectColor,
    ) => {
        startTransition(async () => {
            try {
                await updateProject(id, name, description, color);
                setProjectToEdit(null);
                setIsEditModalOpen(false);
            } catch (error) {
                console.error("Failed to update project:", error);
                alert(
                    `プロジェクトの更新に失敗しました。: ${error instanceof Error ? error.message : ""}`,
                );
            }
        });
    };

    // 削除ボタンクリック時に対象プロジェクトをセットして削除確認モーダルを開く関数
    const handleDeleteClick = (
        e: React.MouseEvent,
        project: ProjectWithInfo,
    ) => {
        e.preventDefault();
        e.stopPropagation();
        setProjectToDelete(project);
        setIsDeleteConfirmOpen(true);
    };

    // プロジェクトを削除する関数
    const handleConfirmDelete = async () => {
        if (projectToDelete) {
            startTransition(async () => {
                try {
                    await deleteProject(projectToDelete.id);
                    setProjectToDelete(null);
                    setIsDeleteConfirmOpen(false);
                } catch (error) {
                    console.error("Failed to delete project:", error);
                    alert(
                        `プロジェクトの削除に失敗しました。: ${error instanceof Error ? error.message : ""}`,
                    );
                }
            });
        }
    };

    // プロジェクトの削除をキャンセルする関数
    const handleCancelDelete = () => {
        setProjectToDelete(null);
        setIsDeleteConfirmOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
            <div className="max-w-5xl mx-auto">
                {/* ヘッドコンテンツ */}
                <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                            <Folder className="w-7 h-7 text-[#009FE8]" />
                            プロジェクト一覧
                        </h1>
                        <p className="text-gray-500 mt-1">
                            タスクを管理するプロジェクトを選択してください
                        </p>
                    </div>
                    <PrimaryButton
                        onClick={() => setIsModalOpen(true)}
                        disabled={isPending}
                        className="flex items-center gap-2 font-medium rounded-lg"
                    >
                        <Plus className="w-5 h-5" />
                        新規プロジェクト
                    </PrimaryButton>
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
                        disabled={isPending}
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
                isLoading={isPending}
                onSave={handleCreateProject}
                onClose={() => setIsModalOpen(false)}
            />

            {/* プロジェクト削除確認モーダル */}
            <DeleteConfirmModal
                isOpen={isDeleteConfirmOpen}
                isLoading={isPending}
                projectName={projectToDelete?.name || ""}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            {/* プロジェクト編集モーダル */}
            {projectToEdit && (
                <EditProjectModal
                    isOpen={isEditModalOpen}
                    isLoading={isPending}
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
};
