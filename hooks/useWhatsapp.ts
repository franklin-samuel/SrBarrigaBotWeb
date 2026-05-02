import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { whatsappService } from '@/services/whatsapp.service';
import { useState, useEffect, useRef } from 'react';
import type { WhatsAppQREvent } from '@/types/whatsapp';

export const WHATSAPP_QUERY_KEY = 'whatsapp-status';

export const useWhatsAppStatus = () => {
    return useQuery({
        queryKey: [WHATSAPP_QUERY_KEY],
        queryFn: () => whatsappService.getStatus(),
        refetchInterval: 10000,
        refetchIntervalInBackground: false,
    });
};

export const useWhatsAppConnect = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => whatsappService.connect(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [WHATSAPP_QUERY_KEY] });
        },
    });
};

export const useWhatsAppDisconnect = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => whatsappService.disconnect(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [WHATSAPP_QUERY_KEY] });
        },
    });
};

export const useExecuteCharge = () => {
    return useMutation({
        mutationFn: () => whatsappService.executeCharge(),
    });
};


export const useWhatsAppQRStream = () => {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'disconnected'>('idle');
    const eventSourceRef = useRef<EventSource | null>(null);
    const queryClient = useQueryClient();

    const startStream = () => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        setConnectionStatus('connecting');
        setQrCode(null);

        const eventSource = whatsappService.createQRStream(
            (data: WhatsAppQREvent) => {
                if (data.type === 'qr' && data.qrCode) {
                    setQrCode(data.qrCode);
                } else if (data.type === 'connected') {
                    setConnectionStatus('connected');
                    setQrCode(null);
                    queryClient.invalidateQueries({ queryKey: [WHATSAPP_QUERY_KEY] });
                    stopStream();
                } else if (data.type === 'disconnected') {
                    setConnectionStatus('disconnected');
                    setQrCode(null);
                    queryClient.invalidateQueries({ queryKey: [WHATSAPP_QUERY_KEY] });
                }
            },
            (error) => {
                console.error('Erro no SSE:', error);
                setConnectionStatus('disconnected');
            }
        );

        eventSourceRef.current = eventSource;
    };

    const stopStream = () => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }
        setConnectionStatus('idle');
        setQrCode(null);
    };

    useEffect(() => {
        return () => {
            stopStream();
        };
    }, []);

    return {
        qrCode,
        connectionStatus,
        startStream,
        stopStream,
    };
};