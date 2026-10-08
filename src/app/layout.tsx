import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "タスク管理アプリ",
  description: "Next.js + Prisma で作るタスク管理アプリ",
};

/* Header component */
export const Header: React.FC = () => {
  return (
    <header className="bg-sky-500 text-white px-6 py-3 shadow-sm flex justify-between items-center">
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
    </header>
  );
};

/* Footer component */
export const Footer: React.FC = () => {
  return (
    <header className="bg-sky-500 text-white px-6 py-3 shadow-sm flex justify-between items-center">
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
      {/* 右側：コピーライト表記 */}
      <p className="text-xs text-white/80">
        &copy; 2026 TaskFlow. All rights reserved.
      </p>
    </header>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
