import type { ProjectColor } from "@/generated/prisma/enums";

export type Project = {
    id: number;
    name: string;
    description: string;
};

export type ProjectInfo = {
    taskCount: number;
    completedCount: number;
    color: ProjectColor;
};

export type ProjectWithInfo = Project & ProjectInfo;
