import { X } from "lucide-react";
import { ReactNode } from "react";

type BaseModalProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
    maxWidth?: "sm" | "md" | "lg";
};

export const BaseModal = ({
    isOpen,
    title,
    onClose,
    children,
    maxWidth = "md",
}: BaseModalProps) => {
    if (!isOpen) return null;

    const maxWidthClass = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
    }[maxWidth];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
                className={`bg-white rounded-lg w-full ${maxWidthClass} shadow-xl`}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
