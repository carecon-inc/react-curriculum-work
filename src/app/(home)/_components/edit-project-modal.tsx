import { ProjectWithInfo } from "@/types/project";
import { useState } from "react";
import { BaseModal } from "../../../components/base-modal";

type EditProjectModalProps = {
    isOpen: boolean;
    project: ProjectWithInfo;
    onSave: (id: number, name: string, description: string) => void;
    onClose: () => void;
};

export const EditProjectModal = ({
    isOpen,
    project,
    onSave,
    onClose,
}: EditProjectModalProps) => {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(project.id, name.trim(), description.trim());
        }
    };

    const handleClose = () => {
        setName(project.name);
        setDescription(project.description);
        onClose();
    };

    return (
        <BaseModal
            isOpen={isOpen}
            title="プロジェクトを編集"
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        プロジェクト名 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:border-transparent text-gray-900"
                        placeholder="例: 読書TODO"
                        autoFocus
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        説明
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:border-transparent resize-none text-gray-900"
                        placeholder="プロジェクトの説明（任意）"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        キャンセル
                    </button>
                    <button
                        type="submit"
                        disabled={!name.trim()}
                        className="flex-1 px-4 py-2 bg-[#009FE8] text-white rounded-md hover:bg-[#0088cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        保存
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};
