import { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = ({
    children,
    className = "",
    ...props
}: PrimaryButtonProps) => {
    return (
        <button
            {...props}
            className={`px-4 py-2 bg-[#009FE8] text-white rounded-md hover:bg-[#0088cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
};
