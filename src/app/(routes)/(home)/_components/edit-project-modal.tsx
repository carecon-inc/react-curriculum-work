"use client";

import { useState, useEffect } from "react";
import { updateProject } from "../action";

const PROJECT_COLORS = [
  {
    id: "blue",
    label: "青",
    bgClass: "bg-blue-500",
    ringClass: "ring-blue-500",
  },
  {
    id: "orange",
    label: "橙",
    bgClass: "bg-orange-500",
    ringClass: "ring-orange-500",
  },
  {
    id: "green",
    label: "緑",
    bgClass: "bg-green-500",
    ringClass: "ring-green-500",
  },
  {
    id: "purple",
    label: "紫",
    bgClass: "bg-purple-500",
    ringClass: "ring-purple-500",
  },
  {
    id: "pink",
    label: "ピンク",
    bgClass: "bg-pink-500",
    ringClass: "ring-pink-500",
  },
];

export interface ProjectForEdit {
  id: number;
  name: string;
  description?: string | null;
  color?: string | null;
}

interface EditProjectModalProps {
  project: ProjectForEdit;
  isOpen: boolean;
  onClose: () => void;
}

export function EditProjectModal({
  project,
  isOpen,
  onClose,
}: EditProjectModalProps) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || "");
  const [color, setColor] = useState(project.color || "blue");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName(project.name);
      setDescription(project.description || "");
      setColor(project.color || "blue");
      setError(null);
    }
  }, [isOpen, project]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("プロジェクト名は必須です。");
      return;
    }
    if (name.length > 100) {
      setError("プロジェクト名は100文字以内で入力してください。");
      return;
    }
    if (description.length > 1000) {
      setError("説明は1000文字以内で入力してください。");
      return;
    }

    setLoading(true);

    try {
      await updateProject(project.id, {
        name,
        description,
        color: color || "blue",
      });
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("予期せぬエラーが発生しました。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          プロジェクトを編集
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              プロジェクト名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              placeholder="プロジェクト名を入力"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              説明
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={3}
              placeholder="プロジェクトの説明を入力"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* カラー選択（任意） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カラー
            </label>
            <div className="flex items-center gap-3">
              {PROJECT_COLORS.map((c) => {
                const isSelected = color === c.id;
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setColor(c.id)}
                    className={`w-8 h-8 rounded-full ${c.bgClass} transition-transform ${
                      isSelected
                        ? `ring-4 ${c.ringClass} ring-offset-2 scale-110`
                        : "opacity-75 hover:opacity-100"
                    }`}
                    aria-label={c.label}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
            >
              {loading ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
