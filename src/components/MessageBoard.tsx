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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await postMessage(formData);
    if (!result.success) {
      setErrorMessage(result.error);
      return;
    }
    setErrorMessage(null);
    setMessages((prev) => [result.message, ...prev]);
  }

  return (
    <>
      <MessageForm action={handleSubmit} errorMessage={errorMessage} />
      <MessageList messages={messages} />
    </>
  );
}
