type Message = {
    id: number;
    name: string;
    age: number;
    content: string;
};

type Props = {
    messages: Message[];
};

export default function MessageItem({ messages }: Props) {
    return (
        <ul className="space-y-4">
            {messages.map((message) => (
                <li key={0} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-800">
                            {message.name}
                        </span>
                        <span className="text-sm text-gray-500">
                            （{message.age}歳）
                        </span>
                    </div>
                    <p className="text-gray-600">{message.content}</p>
                </li>
            ))}
        </ul>
    );
}
