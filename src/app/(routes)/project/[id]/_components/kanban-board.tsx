import { Task, TaskStatus } from "@/types/task";
import { BoardColumn } from "./board-column";

type Column = {
    id: TaskStatus;
    title: string;
    bgColor: string;
    dotColor: string;
};

const columns: Column[] = [
    {
        id: "TODO",
        title: "未着手",
        bgColor: "bg-gray-100",
        dotColor: "bg-gray-400",
    },
    {
        id: "IN_PROGRESS",
        title: "進行中",
        bgColor: "bg-[#009FE8]/5",
        dotColor: "bg-[#009FE8]",
    },
    {
        id: "DONE",
        title: "完了",
        bgColor: "bg-[#009FE8]/20",
        dotColor: "bg-[#009FE8]",
    },
];

type KanbanBoardProps = {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
    onAddItem: (status: TaskStatus) => void;
};

export const KanbanBoard = ({
    tasks,
    onTaskClick,
    onAddItem,
}: KanbanBoardProps) => {
    const getTasksByStatus = (status: TaskStatus) => {
        return tasks.filter((task) => task.status === status);
    };

    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
                <BoardColumn
                    key={column.id}
                    column={column}
                    tasks={getTasksByStatus(column.id)}
                    onTaskClick={onTaskClick}
                    onAddItem={onAddItem}
                />
            ))}
        </div>
    );
};
