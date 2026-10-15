import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  // 実際にはここで id をもとにデータベースやモックデータからプロジェクト情報を取得します
  const projectId = params.id;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* 戻るリンク */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-sky-600 hover:underline flex items-center gap-1 font-medium"
        >
          &larr; プロジェクト一覧に戻る
        </Link>
      </div>

      {/* ヘッダー部分 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-2">
          <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="4" className="fill-sky-500" />
            <path
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900">
            プロジェクト詳細 (ID: {projectId})
          </h1>
        </div>
        <p className="text-gray-600 text-sm">
          このプロジェクトに含まれるタスクの確認・管理を行います。
        </p>
      </div>

      {/* タスク一覧セクション */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">タスク一覧</h2>
          <button className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors">
            + タスクを追加
          </button>
        </div>

        {/* 簡易的なタスクリストのモック */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-sky-500 rounded" />
              <span className="text-sm text-gray-800 font-medium">
                サンプルタスク 1: 要件定義の確認
              </span>
            </label>
            <span className="text-xs text-gray-400">未完了</span>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-sky-500 rounded"
              />
              <span className="text-sm text-gray-500 line-through">
                サンプルタスク 2: 環境構築
              </span>
            </label>
            <span className="text-xs text-sky-600 font-medium">完了</span>
          </div>
        </div>
      </div>
    </div>
  );
}
