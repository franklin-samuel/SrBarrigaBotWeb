import React from 'react';

interface LoadingRootProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'spinner' | 'dots' | 'pulse';
    className?: string;
}

const LoadingRoot: React.FC<LoadingRootProps> = ({
                                                     size = 'md',
                                                     variant = 'spinner',
                                                     className = ''
                                                 }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    if (variant === 'spinner') {
        return (
            <div className={`${sizeClasses[size]} ${className}`}>
                <div className="w-full h-full border-2 border-white/20 border-t-white animate-spin" />
            </div>
        );
    }

    if (variant === 'dots') {
        const dotSize = {
            sm: 'w-2 h-2',
            md: 'w-3 h-3',
            lg: 'w-4 h-4',
            xl: 'w-5 h-5'
        };

        return (
            <div className={`flex gap-2 ${className}`}>
                <div className={`${dotSize[size]} bg-white animate-bounce`} style={{ animationDelay: '0ms' }} />
                <div className={`${dotSize[size]} bg-white animate-bounce`} style={{ animationDelay: '150ms' }} />
                <div className={`${dotSize[size]} bg-white animate-bounce`} style={{ animationDelay: '300ms' }} />
            </div>
        );
    }

    if (variant === 'pulse') {
        return (
            <div className={`${sizeClasses[size]} ${className}`}>
                <div className="w-full h-full bg-white animate-pulse-soft" />
            </div>
        );
    }

    return null;
};

interface LoadingOverlayProps {
    show: boolean;
    message?: string;
    children?: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ show, message, children }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0A0A0A] border-2 border-white p-8 flex flex-col items-center gap-4 animate-slide-in-up chamfer">
                {children || <LoadingRoot size="lg" />}
                {message && (
                    <p className="text-white body-text text-center">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

interface LoadingScreenProps {
    message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Carregando...' }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] bg-pattern">
            <div className="flex flex-col items-center gap-8">
                {/* Logo Chip */}
                <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-2xl animate-glow" />
                    <div className="relative w-24 h-24 bg-white flex items-center justify-center chamfer">
                        <div className="w-20 h-20 bg-[#0A0A0A] flex items-center justify-center chamfer-sm">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="square" strokeLinejoin="miter" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <LoadingRoot size="md" variant="dots" />

                <p className="text-white/70 body-text text-lg tracking-wide">
                    {message}
                </p>
            </div>
        </div>
    );
};

interface LoadingInlineProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
}

const LoadingInline: React.FC<LoadingInlineProps> = ({
                                                         size = 'md',
                                                         text,
                                                         className = ''
                                                     }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <LoadingRoot size={size} variant="spinner" />
            {text && (
                <span className="text-white/70 body-text">
                    {text}
                </span>
            )}
        </div>
    );
};

export const Loading = {
    Root: LoadingRoot,
    Overlay: LoadingOverlay,
    Screen: LoadingScreen,
    Inline: LoadingInline
};