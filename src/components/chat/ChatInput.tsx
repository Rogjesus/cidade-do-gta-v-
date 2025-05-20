import * as React from "react";

type ChatInputProps = {
    onSendMessage: (message: string) => void;
};

export function ChatInput({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = React.useState("");

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <gridLayout columns="*, auto" className="p-2 bg-white border-t border-gray-200">
            <textField
                col="0"
                text={message}
                onTextChange={(e) => setMessage(e.value)}
                hint="Digite sua mensagem..."
                className="p-2"
            />
            <button
                col="1"
                className="bg-blue-500 text-white p-2 rounded-lg ml-2"
                text="Enviar"
                onTap={handleSend}
            />
        </gridLayout>
    );
}