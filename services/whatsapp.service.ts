import { httpClient } from '@/utils/http-client';
import { EventSourcePolyfill } from 'event-source-polyfill';
import type { WhatsAppStatus } from '@/types/whatsapp';
import {tokenManager} from "@/utils/token-manager";

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


    createQRStream: (onMessage: (data: any) => void, onError?: (error: any) => void) => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        const token = tokenManager.getAccessToken();

        const eventSource = new EventSourcePolyfill(`${API_BASE_URL}/whatsapp/qr/stream`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };

        eventSource.onerror = (err) => {
            if (onError) onError(err);
        };

        return eventSource as unknown as EventSource;
    },
};