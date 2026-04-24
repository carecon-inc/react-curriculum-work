import { getProjectName, getTasks } from "@/app/(routes)/project/[id]/action";
import { TaskView } from "./_components/task-view";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ search?: string }>;
};

export default async function ProjectDetail({ params, searchParams }: Props) {
    const { id } = await params;
    const { search } = await searchParams;
    const projectId = Number(id);

    const [project, tasks] = await Promise.all([
        getProjectName(projectId),
        getTasks(projectId, search),
    ]);

    return (
        <TaskView
            projectId={projectId}
            projectName={project.name}
            tasks={tasks}
            searchKeyword={search ?? ""}
        />
    );
}
