import { getProject, getTasks } from "@/app/(routes)/project/[id]/action";
import { TaskView } from "./_components/task-view";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function ProjectDetail({ params }: Props) {
    const { id } = await params;
    const projectId = Number(id);

    const [project, tasks] = await Promise.all([
        getProject(projectId),
        getTasks(projectId),
    ]);

    return (
        <TaskView
            projectId={projectId}
            projectName={project.name}
            initialTasks={tasks}
        />
    );
}
