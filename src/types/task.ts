export type Tag = {
    name: string;
    color: string;
};

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
    categories: string[];
};
