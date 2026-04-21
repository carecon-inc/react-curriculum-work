import { ClipboardList } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-[#009FE8] border-t border-gray-200 mt-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center gap-2 text-white">
                    <ClipboardList className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium">TaskFlow</span>
                </div>
                <p className="text-sm text-white">
                    &copy; {new Date().getFullYear()} TaskFlow. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
};
