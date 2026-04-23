export default function Loading() {
    return (
        <div className="min-h-screen bg-white text-gray-900 p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3" />
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-gray-200 pb-2">
                <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Kanban スケルトン */}
            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-4" />
                        {Array.from({ length: 2 }).map((_, j) => (
                            <div
                                key={j}
                                className="bg-white rounded-lg p-3 mb-2 border border-gray-100 animate-pulse"
                            >
                                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                                <div className="h-3 w-1/2 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
