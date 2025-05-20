import * as React from "react";
import { ChatMessage } from "../../types/chat";

type ChatBubbleProps = {
    message: ChatMessage;
};

export function ChatBubble({ message }: ChatBubbleProps) {
    const bubbleClass = message.isBot 
        ? "bg-blue-100 rounded-tr-xl rounded-tl-xl rounded-br-xl" 
        : "bg-green-100 rounded-tl-xl rounded-tr-xl rounded-bl-xl ml-auto";

    return (
        <stackLayout className={`p-3 m-2 max-w-3/4 ${bubbleClass}`}>
            <label className="text-gray-800">{message.text}</label>
            <label className="text-xs text-gray-500">
                {message.timestamp.toLocaleTimeString()}
            </label>
        </stackLayout>
    );
}