"use client";

import { postMessage } from "@/app/actions/message";
import { useState } from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

type Message = {
    id: number;
    name: string;
    age: number;
    content: string;
};

type Props = {
    initialMessages: Message[];
};

export default function MessageBoard({ initialMessages }: Props) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    async function handleSubmit(formData: FormData) {
        const result = await postMessage(formData);
        if (result?.success) {
            const name = formData.get("name") as string;
            const age = Number(formData.get("age"));
            const content = formData.get("content") as string;
            setMessages((prev) => [
                { id: Date.now(), name, age, content },
                ...prev,
            ]);
            // 成功した結果をMessageFormに返す
            return result;
        }
        // 失敗した結果もエラー情報が入ったresultをMessageFormに返す
        return result;
    }

    return (
        <>
            <MessageForm action={handleSubmit} />
            <MessageList messages={messages} />
        </>
    );
}
