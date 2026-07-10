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

type MessageFormErrors = {
  name?: string[];
  age?: string[];
  content?: string[];
};

type Props = {
  initialMessages: Message[];
};

export default function MessageBoard({ initialMessages }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [errorMessages, setErrorMessages] = useState<MessageFormErrors>({});

  async function handleSubmit(formData: FormData) {
    const result = await postMessage(formData);

    if (!result.success) {
      setErrorMessages(result.errors);
      return;
    }

    setErrorMessages({});
    setMessages((prev) => [result.message, ...prev]);
  }

  return (
    <>
      <MessageForm action={handleSubmit} errorMessages={errorMessages} />
      <MessageList messages={messages} />
    </>
  );
}
