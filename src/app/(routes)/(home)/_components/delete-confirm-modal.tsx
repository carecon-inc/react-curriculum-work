"use client";

import { useTransition } from "react";
import { deleteProject } from "../action";

interface DeleteConfirmModalProps {
  project: {
    id: number;
    name: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteConfirmModal = ({
  project,
  isOpen,
  onClose,
}: DeleteConfirmModalProps) => {
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteProject(project.id);
        onClose();
      } catch (error) {
        alert("削除に失敗しました。");
      }
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-gray-900">プロジェクトを削除</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          「<span className="font-semibold text-gray-800">{project.name}</span>
          」を削除しますか？ この操作は取り消せません。
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isPending ? "削除中..." : "削除"}
          </button>
        </div>
      </div>
    </div>
  );
};
