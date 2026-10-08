import { ProjectCard, Project } from "./project-card";

interface ProjectListProps {
  projects: Project[];
  onOpenCreateModal?: () => void;
}

export const ProjectList = ({
  projects,
  onOpenCreateModal,
}: ProjectListProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ヘッダー領域 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">プロジェクト一覧</h1>
          <p className="text-sm text-gray-500 mt-1">
            タスクを管理するプロジェクトを選択してください
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          + 新規プロジェクト
        </button>
      </div>

      {/* カードグリッド表示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 既存プロジェクトのカード一覧 */}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {/* 点線枠のカード型新規作成ボタン */}
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="flex flex-col items-center justify-center min-h-[160px] p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 hover:bg-gray-100/80 hover:border-gray-400 transition-all text-gray-600 hover:text-gray-900 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-2 shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xl font-light text-gray-500">+</span>
          </div>
          <span className="text-sm font-medium">新しいプロジェクトを作成</span>
        </button>
      </div>
    </div>
  );
};
