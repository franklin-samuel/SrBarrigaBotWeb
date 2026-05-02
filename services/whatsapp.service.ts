import { httpClient } from '@/utils/http-client';
import type { WhatsAppStatus } from '@/types/whatsapp';

export const whatsappService = {
    getStatus: async (): Promise<WhatsAppStatus> => {
        const response = await httpClient.get<WhatsAppStatus>('/whatsapp/status');
        return response.data!;
    },

    connect: async (): Promise<void> => {
        await httpClient.post('/whatsapp/connect');
    },

    disconnect: async (): Promise<void> => {
        await httpClient.post('/whatsapp/disconnect');
    },

    executeCharge: async (): Promise<void> => {
        await httpClient.post('/whatsapp/execute-charge');
    },


    createQRStream: (
        onMessage: (data: any) => void,
        onError?: (error: Event) => void
    ): EventSource => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        const eventSource = new EventSource(`${API_BASE_URL}/whatsapp/qr/stream`, {
            withCredentials: true,
        });

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (error) {
                console.error('Erro ao processar mensagem SSE:', error);
            }
        };

        if (onError) {
            eventSource.onerror = onError;
        }

        return eventSource;
    },
};