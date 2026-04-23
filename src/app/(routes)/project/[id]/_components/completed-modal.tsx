import { BaseModal } from "@/components/base-modal";
import { PartyPopper } from "lucide-react";

type CompletedModalProps = {
    isOpen: boolean;
    advice: string;
    onClose: () => void;
};

export const CompletedModal = ({
    isOpen,
    advice,
    onClose,
}: CompletedModalProps) => {
    return (
        <BaseModal isOpen={isOpen} title="" onClose={onClose}>
            <div className="flex flex-col items-center text-center gap-4 py-2">
                {/* アイコン */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100">
                    <PartyPopper className="w-7 h-7 text-yellow-500" />
                </div>

                {/* タイトル */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                        🎉 全タスク完了🎉
                    </h2>
                    <p className="text-sm text-gray-500">
                        お疲れ様でした。全てのタスクを達成しました！
                    </p>
                </div>

                {/* アドバイス */}
                <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        &ldquo;{advice}&rdquo;
                    </p>
                </div>

                {/* 閉じるボタン */}
                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 bg-[#009FE8] text-white font-medium rounded-lg hover:bg-[#0088cc] transition-colors"
                >
                    閉じる
                </button>
            </div>
        </BaseModal>
    );
};
