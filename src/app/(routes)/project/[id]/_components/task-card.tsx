import { Task, TaskPriority } from "@/types/task";
import { BookmarkCheck, Calendar, Flag } from "lucide-react";

const PRIORITY_LABEL: Record<TaskPriority, string> = {
    LOW: "低",
    MEDIUM: "中",
    HIGH: "高",
};

const PRIORITY_COLOR: Record<TaskPriority, string> = {
    LOW: "text-green-600",
    MEDIUM: "text-yellow-600",
    HIGH: "text-red-600",
};

type TaskCardProps = {
    task: Task;
    onClick: (task: Task) => void;
};

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
    return (
        <div
            onClick={() => onClick(task)}
            className="bg-white rounded-md p-3 hover:shadow-md transition-all cursor-pointer border border-gray-200 hover:border-[#009FE8]"
        >
            <div className="flex items-start gap-2">
                <BookmarkCheck className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                <span className="text-sm leading-relaxed text-gray-800 line-clamp-2">
                    {task.title}
                </span>
            </div>
            {task.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 ml-6">
                    {task.categories.map((category, index) => (
                        <span
                            key={index}
                            className="bg-[#009FE8] text-white text-xs px-2 py-0.5 rounded"
                        >
                            {category}
                        </span>
                    ))}
                </div>
            )}
            {task.targetDate && (
                <div className="flex items-center gap-1 mt-2 ml-6 text-xs text-blue-500">
                    <Calendar className="w-3 h-3" />
                    実施日: {task.targetDate}
                </div>
            )}
            {task.dueDate && (
                <div className="flex items-center gap-1 mt-2 ml-6 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    期日: {task.dueDate}
                </div>
            )}
            {task.priority && (
                <div
                    className={`flex items-center gap-1 mt-2 ml-6 text-xs ${PRIORITY_COLOR[task.priority]}`}
                >
                    <Flag className="w-3 h-3" />
                    優先度: {PRIORITY_LABEL[task.priority]}
                </div>
            )}
        </div>
    );
};
