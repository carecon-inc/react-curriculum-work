import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const BackHome = () => {
    return (
        <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#009FE8] mb-3 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
            プロジェクト一覧に戻る
        </Link>
    );
};
