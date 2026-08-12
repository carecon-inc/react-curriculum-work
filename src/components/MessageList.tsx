import MessageItem from "@/components/MessageItem";

type Message = {
    id: number;
    name: string;
    age: number;
    content: string;
};

type Props = {
    messages: Message[];
};

export default function MessageList({ messages }: Props) {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">投稿一覧</h2>
            <MessageItem messages={messages} />
        </section>
    );
}