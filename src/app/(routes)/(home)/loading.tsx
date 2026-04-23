export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
            <div className="max-w-5xl mx-auto">
                {/* ヘッドコンテンツ */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2" />
                    </div>
                    <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse" />
                </div>

                {/* プロジェクトグリッド スケルトン */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl p-5 border border-gray-200 min-h-[200px] animate-pulse"
                        >
                            <div className="h-4 w-1 bg-gray-200 rounded mb-4" />
                            <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
                            <div className="h-4 w-full bg-gray-200 rounded mb-1" />
                            <div className="h-4 w-3/4 bg-gray-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
