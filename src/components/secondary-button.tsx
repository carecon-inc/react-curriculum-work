import { ButtonHTMLAttributes } from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const SecondaryButton = ({
    children,
    className = "",
    ...props
}: SecondaryButtonProps) => {
    return (
        <button
            {...props}
            className={`px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
};
