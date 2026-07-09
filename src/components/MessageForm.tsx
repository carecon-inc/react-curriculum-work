"use client";

type MessageFormErrors = {
  name?: string[];
  age?: string[];
  content?: string[];
};

type Props = {
  action: (formData: FormData) => Promise<void>;
  errorMessages: MessageFormErrors;
};

export default function MessageForm({ action, errorMessages }: Props) {
  return (
    <form action={action} className="bg-white rounded-lg shadow p-6 mb-8">
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
            maxLength={20}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {errorMessages.name?.map((message, index) => (
            <p key={index} className="mt-1 text-sm text-red-600">
              {message}
            </p>
          ))}
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
            min="1"
            max="120"
            step="1"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {errorMessages.age?.map((message, index) => (
            <p key={index} className="mt-1 text-sm text-red-600">
              {message}
            </p>
          ))}
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
            maxLength={200}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {errorMessages.content?.map((message, index) => (
            <p key={index} className="mt-1 text-sm text-red-600">
              {message}
            </p>
          ))}
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
