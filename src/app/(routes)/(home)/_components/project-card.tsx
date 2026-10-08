import Link from "next/link";

export interface Task {
  id: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  tasks: Task[];
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const totalTasks = project.tasks.length;
  const completedTaskCount = project.tasks.filter((t) => t.isCompleted).length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTaskCount / totalTasks) * 100) : 0;

  return (
    <Link
      href="#"
      className="block border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
    >
      {/* 1. プロジェクト名 */}
      <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
        {project.name}
      </h2>

      {/* 2. 説明文 */}
      {project.description ? (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {project.description}
        </p>
      ) : (
        <div className="min-h-[2.5rem] mb-4" />
      )}

      {/* 3. タスク数 & 完了数（プログレスバーの上に配置） */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-2">
        <span>{totalTasks} タスク</span>
        <span>
          {completedTaskCount} / {totalTasks} 完了
        </span>
      </div>

      {/* 4. プログレスバー（境界線なし） */}
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </Link>
  );
};
