import Link from 'next/link';

type ProjectCardProps = {
  project: {
    id: number;
    name: string;
    description: string | null;
    tasks: { id: number; status: string }[];
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  const totalTasks = project.tasks?.length || 0;
  const completedTasks = project.tasks?.filter((t) => t.status === 'DONE').length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

return (
 <div>
   <h3>{project.name}</h3>
   <p>{project.description || '説明なし'}</p>
   <p>{totalTasks}</p>
   <p>{completedTasks}/{totalTasks}</p>
 </div>
);
}