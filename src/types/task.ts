export type Tag = {
    name: string;
    color: string;
};

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
    id: string;
    title: string;
    description?: string;
    targetDate?: string;
    dueDate?: string;
    status: TaskStatus;
    priority?: TaskPriority;
    categories: string[];
};
