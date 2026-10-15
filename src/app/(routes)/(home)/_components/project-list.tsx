"use client";

import { useState } from "react";
import { ProjectCard } from "./project-card";
import { Project } from "./project-card";
import { CreateProjectModal } from "./create-project-modal";

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8 flex-grow">
      {/* ヘッダー領域（スマホ対応の折り返し） */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            プロジェクト一覧
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            タスクを管理するプロジェクトを選択してください
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
        >
          新規プロジェクト
        </button>
      </div>

      {/* プロジェクト配置エリア（グリッド：スマホ1列 / タブレット2列 / PC3列） */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {/* 新規作成カードボタン */}
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="flex flex-col items-center justify-center min-h-[180px] p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 hover:bg-gray-100/80 hover:border-gray-400 transition-all text-gray-600 hover:text-gray-900 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xl font-light text-gray-500">+</span>
          </div>
          <span className="text-sm font-medium">新しいプロジェクトを作成</span>
        </button>
      </div>

      {/* モーダル */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
