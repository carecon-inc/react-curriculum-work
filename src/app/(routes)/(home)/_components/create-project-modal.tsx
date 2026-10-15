"use client";

import { useState, useTransition } from "react";
import { createProjectAction } from "../action";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal = ({
  isOpen,
  onClose,
}: CreateProjectModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 仕様に基づくバリデーション（アラート表示）
    if (name.length > 100) {
      alert("プロジェクト名は100文字以内で入力してください");
      return;
    }
    if (description.length > 1000) {
      alert("説明は1000文字以内で入力してください");
      return;
    }

    startTransition(async () => {
      const res = await createProjectAction({
        name,
        description,
      });

      if (res.success) {
        setName("");
        setDescription("");
        onClose();
      } else {
        alert(res.error || "作成に失敗しました");
      }
    });
  };

  // プロジェクト名が未入力（空文字・スペースのみ）または送信中の場合はボタンを非活性
  const isSubmitDisabled = !name.trim() || isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          新規プロジェクト作成
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* プロジェクト名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              プロジェクト名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: 読書TODO"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* 説明 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              説明
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="プロジェクトの説明（任意）"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* ※カラー指定UIはこの時点では実装不要のため除外しています */}

          {/* ボタン群 */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? "作成中..." : "作成"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
