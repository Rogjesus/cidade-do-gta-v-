import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { ChatBubble } from "../chat/ChatBubble";
import { ChatInput } from "../chat/ChatInput";
import { chatbotService } from "../../services/ai/chatbot";
import { ChatMessage } from "../../types/chat";

type ChatScreenProps = {
    route: RouteProp<MainStackParamList, "Chat">,
    navigation: FrameNavigationProp<MainStackParamList, "Chat">,
};

export function ChatScreen({ navigation }: ChatScreenProps) {
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);

    const handleSendMessage = async (text: string) => {
        // Adiciona mensagem do usuário
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            text,
            isBot: false,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);

        // Obtém resposta do chatbot
        const botResponse = await chatbotService.sendMessage(text);
        setMessages(prev => [...prev, botResponse]);
    };

    return (
        <gridLayout rows="*, auto">
            <scrollView row="0">
                <stackLayout>
                    {messages.map(message => (
                        <ChatBubble key={message.id} message={message} />
                    ))}
                </stackLayout>
            </scrollView>
            <ChatInput row="1" onSendMessage={handleSendMessage} />
        </gridLayout>
    );
}