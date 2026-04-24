import { BaseModal } from "@/components/base-modal";
import { ColorPicker } from "@/components/color-picker";
import { PrimaryButton } from "@/components/primary-button";
import { SecondaryButton } from "@/components/secondary-button";
import { ProjectColor } from "@/generated/prisma/enums";
import { ProjectWithInfo } from "@/types/project";
import { useState } from "react";

type EditProjectModalProps = {
    isOpen: boolean;
    isLoading?: boolean;
    project: ProjectWithInfo;
    onSave: (
        id: number,
        name: string,
        description: string,
        color: ProjectColor,
    ) => void;
    onClose: () => void;
};

export const EditProjectModal = ({
    isOpen,
    isLoading = false,
    project,
    onSave,
    onClose,
}: EditProjectModalProps) => {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [color, setColor] = useState<ProjectColor>(project.color);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(project.id, name.trim(), description.trim(), color);
        }
    };

    const handleClose = () => {
        setName(project.name);
        setDescription(project.description);
        setColor(project.color);
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

                <ColorPicker value={color} onChange={setColor} />

                <div className="flex gap-3 pt-2">
                    <SecondaryButton
                        type="button"
                        onClick={handleClose}
                        className="flex-1"
                    >
                        キャンセル
                    </SecondaryButton>
                    <PrimaryButton
                        type="submit"
                        disabled={!name.trim() || isLoading}
                        className="flex-1"
                    >
                        {isLoading ? "保存中..." : "保存"}
                    </PrimaryButton>
                </div>
            </form>
        </BaseModal>
    );
};
