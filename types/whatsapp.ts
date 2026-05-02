export interface WhatsAppStatus {
    isConnected: boolean;
    needsQR: boolean;
}

export interface WhatsAppQREvent {
    type: 'qr' | 'connected' | 'disconnected';
    qrCode?: string;
}