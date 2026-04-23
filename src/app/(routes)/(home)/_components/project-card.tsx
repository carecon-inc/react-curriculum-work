import { ProjectColor } from "@/generated/prisma/enums";
import { ProjectWithInfo } from "@/types/project";
import {
    CheckSquare,
    Folder,
    MoreVertical,
    Pencil,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ProjectCardProps = {
    project: ProjectWithInfo;
    onEditClick: (e: React.MouseEvent, project: ProjectWithInfo) => void;
    onDeleteClick: (e: React.MouseEvent, project: ProjectWithInfo) => void;
};

export const ProjectCard = ({
    project,
    onEditClick,
    onDeleteClick,
}: ProjectCardProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // プロジェクトカラーのマッピング関数
    const getColorClass = (color: ProjectColor): string => {
        const colorMap: Record<ProjectColor, string> = {
            BLUE: "bg-[#009FE8]",
            ORANGE: "bg-[#EC7426]",
            EMERALD: "bg-emerald-500",
            PURPLE: "bg-purple-500",
            PINK: "bg-pink-500",
        };
        return colorMap[color] || "bg-gray-300"; // デフォルト色
    };

    return (
        <Link
            href={`/project/${project.id}`}
            className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-[#009FE8] hover:shadow-lg transition-all"
        >
            <div className="flex items-start justify-between mb-3">
                <div
                    className={`w-10 h-10 ${getColorClass(project.color)} rounded-lg flex items-center justify-center`}
                >
                    <Folder className="w-5 h-5 text-white" />
                </div>
                <div ref={menuRef} className="relative">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsMenuOpen((prev) => !prev);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
                        title="メニュー"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 top-8 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                            <button
                                onClick={(e) => {
                                    setIsMenuOpen(false);
                                    onEditClick(e, project);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Pencil className="w-4 h-4" />
                                編集
                            </button>
                            <button
                                onClick={(e) => {
                                    setIsMenuOpen(false);
                                    onDeleteClick(e, project);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                削除
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                {project.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {project.description}
            </p>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CheckSquare className="w-4 h-4" />
                        <span>{project.taskCount} タスク</span>
                    </div>
                </div>
                <div className="text-sm text-gray-400">
                    {project.completedCount}/{project.taskCount} 完了
                </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full ${getColorClass(project.color)} transition-all`}
                    style={{
                        width: `${project.taskCount > 0 ? (project.completedCount / project.taskCount) * 100 : 0}%`,
                    }}
                />
            </div>
        </Link>
    );
};
