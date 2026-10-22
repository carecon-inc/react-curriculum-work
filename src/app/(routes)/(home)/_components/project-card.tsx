"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { EditProjectModal } from "./edit-project-modal";
import { DeleteConfirmModal } from "./delete-confirm-modal";

export interface Task {
  id: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
  tasks: Task[];
}

interface ProjectCardProps {
  project: Project;
}

const COLOR_CODES: Record<string, string> = {
  blue: "#3b82f6",
  orange: "#f97316",
  green: "#22c55e",
  purple: "#a855f7",
  pink: "#ec4899",
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const colorKey = project.color ?? "blue";

  const menuRef = useRef<HTMLDivElement>(null);

  const totalTasks = project.tasks.length;
  const completedTaskCount = project.tasks.filter((t) => t.isCompleted).length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTaskCount / totalTasks) * 100) : 0;

  // メニューの外側をクリックしたときにメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md hover:border-gray-300 transition-all">
        {/* 上部：フォルダアイコン + タイトル ＆ 三点リーダボタン */}
        <div className="flex items-center justify-between mb-3">
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center gap-3 group flex-grow min-w-0"
          >
            {/* フォルダロゴ（背景青＋白抜き） */}
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <rect
                width="24"
                height="24"
                rx="4"
                fill={COLOR_CODES[colorKey]}
              />
              <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-1">
              {project.name}
            </h2>
          </Link>

          {/* 右側：三点リーダボタン */}
          <div className="relative ml-2" ref={menuRef}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="メニュー"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* ドロップダウンメニュー（編集・削除） */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    setIsEditModalOpen(true); // 編集モーダルを開く
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  編集
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    setIsDeleteModalOpen(true); // 削除確認モーダルを開く
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  削除
                </button>
              </div>
            )}
          </div>
        </div>

        {/* カード本体のリンク領域（説明文・プログレスバー・タスク件数） */}
        <Link href={`/projects/${project.id}`} className="block">
          {project.description ? (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
              {project.description}
            </p>
          ) : (
            <div className="min-h-[2.5rem] mb-4" />
          )}

          <div className="w-full bg-gray-100 rounded-full h-2 mb-3 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-2 border-t border-gray-100">
            <span>{totalTasks} タスク</span>
            <span>
              {completedTaskCount} / {totalTasks} 完了
            </span>
          </div>
        </Link>
      </div>

      {/* 2. 編集用モーダルコンポーネントの呼び出し */}
      <EditProjectModal
        project={project}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* 3. 削除確認用モーダルコンポーネントの呼び出し */}
      <DeleteConfirmModal
        project={project}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};
