"use client";

import { useState } from "react";

type Props = {
  action: (
    formData: FormData,
  ) => Promise<{ success?: boolean; error?: unknown }>;
};

export default function MessageForm({ action }: Props) {
  // エラーメッセージ（文字列の配列）を保持する state
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(formData: FormData) {
    setErrors([]); // 送信時に一度エラー表示をクリア

    const result = await action(formData);

    // 送信結果に error 配列が含まれているか判定
    if (result?.error && Array.isArray(result.error)) {
      // [{ message: "0以上の数値を入力してください", ... }] から
      // "message" の文字列だけを取り出して ["0以上の数値を入力してください"] という配列を作る
      const errorMessages = result.error.map(
        (issue: { message: string }) => issue.message,
      );

      // state にセット（これで画面が再描画されます）
      setErrors(errorMessages);
    }
  }
  return (
    <form action={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">新規投稿</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            名前
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="山田 太郎"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            年齢
          </label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="25"
            min="0"
            max="120"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メッセージ
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            placeholder="メッセージを入力してください..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          投稿する
        </button>
        {/* ★ エラーメッセージ表示エリア ★ */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
}
