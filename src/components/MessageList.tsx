"use client";

import MessageItem from "@/components/MessageItem";
import { getServerInfo } from "@/lib/serverUtils";

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
    const serverInfo = getServerInfo();

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">投稿一覧</h2>
            <p className="text-xs text-gray-400 mb-2">
                app: {serverInfo.appName}
            </p>
            <MessageItem messages={messages} />
        </section>
    );
}
