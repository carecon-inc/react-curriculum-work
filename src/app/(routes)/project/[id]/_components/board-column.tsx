import { Task, TaskStatus } from "@/types/task";
import { Plus } from "lucide-react";
import { TaskCard } from "./task-card";

type Column = {
    id: TaskStatus;
    title: string;
    bgColor: string;
    dotColor: string;
};

type BoardColumnProps = {
    column: Column;
    tasks: Task[];
    onTaskClick: (task: Task) => void;
    onAddItem: (status: TaskStatus) => void;
};

export const BoardColumn = ({
    column,
    tasks,
    onTaskClick,
    onAddItem,
}: BoardColumnProps) => {
    return (
        <div
            className={`${column.bgColor} rounded-lg p-3 min-w-[280px] max-w-[300px] flex-shrink-0 border border-gray-200`}
        >
            <div className="flex items-center gap-2 mb-3">
                <span
                    className={`w-2.5 h-2.5 rounded-full ${column.dotColor}`}
                />
                <span className="font-medium text-sm text-gray-700">
                    {column.title}
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                    {tasks.length}
                </span>
            </div>

            <div className="space-y-2">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} onClick={onTaskClick} />
                ))}
            </div>

            <button
                onClick={() => onAddItem(column.id)}
                className="flex items-center gap-2 text-[#009FE8] text-sm mt-3 px-2 py-1.5 hover:bg-[#009FE8]/10 rounded w-full transition-colors"
            >
                <Plus className="w-4 h-4" />
                New item
            </button>
        </div>
    );
};
