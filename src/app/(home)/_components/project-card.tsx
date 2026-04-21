import { CheckSquare, Folder, Trash2 } from "lucide-react";
import Link from "next/link";

type Project = {
    id: string;
    name: string;
    description: string;
    taskCount: number;
    completedCount: number;
    color: string;
    createdAt: string;
};

type ProjectCardProps = {
    project: Project;
    onDeleteClick: (e: React.MouseEvent, project: Project) => void;
};

export const ProjectCard = ({ project, onDeleteClick }: ProjectCardProps) => {
    return (
        <Link
            href={`/project/${project.id}`}
            className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-[#009FE8] hover:shadow-lg transition-all"
        >
            <div className="flex items-start justify-between mb-3">
                <div
                    className={`w-10 h-10 ${project.color} rounded-lg flex items-center justify-center`}
                >
                    <Folder className="w-5 h-5 text-white" />
                </div>
                <button
                    onClick={(e) => onDeleteClick(e, project)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                    title="プロジェクトを削除"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
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
                    className={`h-full ${project.color} transition-all`}
                    style={{
                        width: `${project.taskCount > 0 ? (project.completedCount / project.taskCount) * 100 : 0}%`,
                    }}
                />
            </div>
        </Link>
    );
};
