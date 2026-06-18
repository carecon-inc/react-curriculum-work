"use client";
// useStateを追加
import { useState } from "react";
// 戻り値の型をanyに変更
type Props = {
    action: (
        formData: FormData,
    ) => Promise<any>;
};

export default function MessageForm({ action }: Props) {
    // エラーメッセージを保存しておくステート
    const [errors, setErrors] = useState<{ name?: string; age?: string; content?: string}>({});
    // Zodを使って入力内容が正しいかチェックする関数
    async function handleSubmit(formData: FormData) {
        // 一度エラーを空にする
        setErrors({});
        // Zodのチェックを待つ
        const result = await action(formData);
        // ブラウザ画面にエラーメッセージを表示する処理
        if (result && result.error) {
            const formattedErrors: any = {};
            result.error.forEach((issue: any) => {
                const path = issue.path[0];
                formattedErrors[path] = issue.message;
            });
            // ブラウザ画面にエラーメッセージを表示
            setErrors(formattedErrors);
        }
    }
    return (
        // サーバーから返ってきたエラーをキャッチ
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
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
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
                    {errors.age && (
                        <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                    )}
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
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                    投稿する
                </button>
            </div>
        </form>
    );
}
