"use client";

import { BaseModal } from "@/components/base-modal";
import { PrimaryButton } from "@/components/primary-button";
import { SecondaryButton } from "@/components/secondary-button";
import { Task, TaskPriority } from "@/types/task";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type TaskDetailModalProps = {
    isOpen: boolean;
    isLoading?: boolean;
    task: Task;
    onSave: (task: Task) => void;
    onClose: () => void;
    onDelete: (taskId: string) => void;
};

export const TaskDetailModal = ({
    isOpen,
    isLoading = false,
    task,
    onSave,
    onClose,
    onDelete,
}: TaskDetailModalProps) => {
    const [editedTask, setEditedTask] = useState<Task>(task);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editedTask.title.trim()) {
            return;
        }

        onSave(editedTask);
    };

    return (
        <BaseModal isOpen={isOpen} title="タスク詳細" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        タスク名
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => {
                            setEditedTask({
                                ...editedTask,
                                title: e.target.value,
                            });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:border-transparent text-gray-900"
                        placeholder="タスクのタイトル"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        説明
                    </label>
                    <textarea
                        value={editedTask.description}
                        onChange={(e) =>
                            setEditedTask({
                                ...editedTask,
                                description: e.target.value,
                            })
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:border-transparent resize-none text-gray-900"
                        placeholder="タスクの説明やメモ"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ステータス
                    </label>
                    <select
                        value={editedTask.status}
                        onChange={(e) =>
                            setEditedTask({
                                ...editedTask,
                                status: e.target.value as
                                    | "TODO"
                                    | "IN_PROGRESS"
                                    | "DONE",
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:border-transparent text-gray-900 bg-white"
                    >
                        <option value="TODO">未着手</option>
                        <option value="IN_PROGRESS">進行中</option>
                        <option value="DONE">完了</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        実施予定日
                    </label>
                    <input
                        type="date"
                        value={editedTask.targetDate ?? ""}
                        onChange={(e) =>
                            setEditedTask({
                                ...editedTask,
                                targetDate: e.target.value || undefined,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:border-transparent text-gray-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        期日
                    </label>
                    <input
                        type="date"
                        value={editedTask.dueDate ?? ""}
                        onChange={(e) =>
                            setEditedTask({
                                ...editedTask,
                                dueDate: e.target.value || undefined,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:border-transparent text-gray-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        優先度
                    </label>
                    <select
                        value={editedTask.priority ?? "MEDIUM"}
                        onChange={(e) =>
                            setEditedTask({
                                ...editedTask,
                                priority: e.target.value as TaskPriority,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:border-transparent text-gray-900 bg-white"
                    >
                        <option value="LOW">低</option>
                        <option value="MEDIUM">中</option>
                        <option value="HIGH">高</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        カテゴリー
                    </label>
                    <input
                        type="text"
                        value={editedTask.categories.join(", ")}
                        onChange={(e) =>
                            setEditedTask({
                                ...editedTask,
                                categories: e.target.value
                                    .split(",")
                                    .map((c) => c.trim()),
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:border-transparent text-gray-900"
                        placeholder="例: 開発、デザイン"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <SecondaryButton
                        disabled={isLoading}
                        type="button"
                        onClick={onClose}
                        className="flex-1"
                    >
                        キャンセル
                    </SecondaryButton>
                    <PrimaryButton
                        disabled={!editedTask.title.trim() || isLoading}
                        type="submit"
                        className="flex-1"
                    >
                        {isLoading ? "保存中..." : "保存"}
                    </PrimaryButton>
                </div>

                {editedTask.id !== "" && (
                    <div className="pt-2 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => onDelete(editedTask.id)}
                            disabled={isLoading}
                            className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Trash2 className="w-4 h-4" />
                            このタスクを削除
                        </button>
                    </div>
                )}
            </form>
        </BaseModal>
    );
};
