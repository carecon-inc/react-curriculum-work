import { ClipboardList } from "lucide-react";

export const Header = () => {
    return (
        <header className="bg-[#009FE8] border-b border-gray-200">
            <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
                <a href="/" className="flex items-center gap-2">
                    <ClipboardList className="w-6 h-6 text-white" />
                    <span className="font-bold text-white">TaskFlow</span>
                </a>
            </div>
        </header>
    );
};
