import { Task } from "@/types/task";
import { BookOpen, Calendar } from "lucide-react";

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
                <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                <span className="text-sm leading-relaxed text-gray-800">
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
            {task.dueDate && (
                <div className="flex items-center gap-1 mt-2 ml-6 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {task.dueDate}
                </div>
            )}
        </div>
    );
};
