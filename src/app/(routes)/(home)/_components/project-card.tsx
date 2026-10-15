"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export interface Task {
  id: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  tasks: Task[];
}

interface ProjectCardProps {
  project: Project;
  onUpdate: (updatedProject: Project) => void;
  onDelete: (projectId: string) => void;
}

export const ProjectCard = ({ project, onUpdate, onDelete }: ProjectCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // フォーム用のローカルステート
  const [editedName, setEditedName] = useState(project.name);
  const [editedDescription, setEditedDescription] = useState(project.description || "");
  
  const menuRef = useRef<HTMLDivElement>(null);

  const totalTasks = project.tasks.length;
  const completedTaskCount = project.tasks.filter((t) => t.isCompleted).length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTaskCount / totalTasks) * 100) : 0;

  // メニュー外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 編集内容の保存処理
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 親コンポーネントへ新しいデータを通知
    onUpdate({
      ...project,
      name: editedName,
      description: editedDescription,
    });

    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="relative border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md hover:border-gray-300 transition-all">
        {/* 上部：フォルダロゴ + タイトル ＆ 三点リーダボタン */}
        <div className="flex items-center justify-between mb-3">
          <Link href={`/projects/${project.id}`} className="flex items-center gap-3 group flex-grow min-w-0">
            <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="4" className="fill-sky-500" />
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

          {/* 三点リーダボタン */}
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

            {/* ドロップダウンメニュー */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    setIsEditModalOpen(true);
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
                    if (confirm("本当にこのプロジェクトを削除しますか？")) {
                      onDelete(project.id);
                    }
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  削除
                </button>
              </div>
            )}
          </div>
        </div>

        {/* カード本体のリンク領域 */}
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

      {/* 編集用モーダル */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">プロジェクトを編集</h3>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  プロジェクト名
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  説明
                </label>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};