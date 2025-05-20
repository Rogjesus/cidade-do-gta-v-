import { ChatMessage } from '../../types/chat';

export class ChatbotService {
    async sendMessage(message: string): Promise<ChatMessage> {
        // Simulação de resposta do chatbot
        return {
            id: Date.now().toString(),
            text: `Resposta simulada para: ${message}`,
            isBot: true,
            timestamp: new Date()
        };
    }
}

export const chatbotService = new ChatbotService();