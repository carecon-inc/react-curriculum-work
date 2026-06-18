import MessageBoard from "@/components/MessageBoard";
import { getMessages } from "./actions/message";

export default async function Home() {
    
    const messages = await getMessages();

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Simple Message Board
                </h1>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <MessageBoard initialMessages={messages as any} />
            </div>
        </main>
    );
}
