import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Message Board",
  description: "Next.js で作る簡易掲示板アプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
