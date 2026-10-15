import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "タスク管理アプリ",
  description: "Next.js + Prisma で作るタスク管理アプリ",
};

export const Header: React.FC = () => {
  return (
    <header className="bg-sky-500 text-white px-6 py-3 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <span className="text-lg font-bold tracking-wide">TaskFlow</span>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-sky-500 text-white px-6 py-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
      {/* 左側：ロゴとアイコン */}
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <span className="text-lg font-bold tracking-wide">TaskFlow</span>
      </div>

      {/* 右側：コピーライト表記（スマホ時は縦に改行して配置） */}
      <p className="text-xs text-white/90">
        &copy; 2026 TaskFlow. All rights reserved.
      </p>
    </footer>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        <div className="flex flex-col min-h-[120vh]">
          <Header />
          <main className="flex-grow pb-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
