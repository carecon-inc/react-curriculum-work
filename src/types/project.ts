export type Project = {
    id: number;
    name: string;
    description: string;
};

export type ProjectInfo = {
    taskCount: number;
    completedCount: number;
    color: string;
};

export type ProjectWithInfo = Project & ProjectInfo;
