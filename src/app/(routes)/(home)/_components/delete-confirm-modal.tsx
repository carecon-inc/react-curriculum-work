import { Trash2 } from "lucide-react";
import { BaseModal } from "../../../../components/base-modal";

type DeleteConfirmModalProps = {
    isOpen: boolean;
    projectName: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export const DeleteConfirmModal = ({
    isOpen,
    projectName,
    onConfirm,
    onCancel,
}: DeleteConfirmModalProps) => {
    return (
        <BaseModal
            isOpen={isOpen}
            title="プロジェクトを削除"
            onClose={onCancel}
        >
            <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <Trash2 className="w-6 h-6 text-red-600" />
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        「{projectName}」を削除しますか？
                        <br />
                        この操作は取り消せません。
                    </p>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        削除
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};
