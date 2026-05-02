import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { tokenManager } from '@/utils/token-manager';

interface WhatsAppStatus {
    isConnected: boolean;
    needsQR: boolean;
}

interface WhatsAppQRData {
    qrCode: string;
}

export const useWhatsAppWebSocket = () => {
    const [status, setStatus] = useState<WhatsAppStatus>({
        isConnected: false,
        needsQR: false,
    });
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [isExecutingCharge, setIsExecutingCharge] = useState(false);

    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const token = tokenManager.getAccessToken();

        if (!token) {
            console.warn('No token available for WebSocket connection');
            return;
        }

        const socket = io(`${API_BASE_URL.replace('/api', '')}/whatsapp`, {
            auth: {
                token,
            },
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
            transports: ['websocket', 'polling'],
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('WebSocket connected');
        });

        socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        socket.on('whatsapp:status', (data: WhatsAppStatus) => {
            console.log('Status update:', data);
            setStatus(data);

            if (data.isConnected) {
                setQrCode(null);
                setIsConnecting(false);
            }
        });

        socket.on('whatsapp:qr', (data: WhatsAppQRData) => {
            console.log('QR Code received');
            setQrCode(data.qrCode);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const connect = useCallback(async () => {
        if (!socketRef.current) {
            throw new Error('WebSocket not connected');
        }

        setIsConnecting(true);
        setQrCode(null);

        return new Promise<void>((resolve, reject) => {
            socketRef.current!.emit('whatsapp:connect', (response: any) => {
                if (response.success) {
                    resolve();
                } else {
                    setIsConnecting(false);
                    reject(new Error(response.error || 'Falha ao conectar'));
                }
            });
        });
    }, []);

    const disconnect = useCallback(async () => {
        if (!socketRef.current) {
            throw new Error('WebSocket not connected');
        }

        setIsDisconnecting(true);

        return new Promise<void>((resolve, reject) => {
            socketRef.current!.emit('whatsapp:disconnect', (response: any) => {
                setIsDisconnecting(false);

                if (response.success) {
                    setQrCode(null);
                    resolve();
                } else {
                    reject(new Error(response.error || 'Falha ao desconectar'));
                }
            });
        });
    }, []);

    const refreshStatus = useCallback(() => {
        if (!socketRef.current) return;

        socketRef.current.emit('whatsapp:get-status', (response: any) => {
            setStatus({
                isConnected: response.isConnected,
                needsQR: response.needsQR,
            });

            if (response.qrCode) {
                setQrCode(response.qrCode);
            }
        });
    }, []);

    return {
        status,
        qrCode,
        isConnecting,
        isDisconnecting,
        connect,
        disconnect,
        refreshStatus,
    };
};