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
                <div className="w-full h-full border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
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
                <div className={`${dotSize[size]} bg-amber-500 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
                <div className={`${dotSize[size]} bg-amber-500 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
                <div className={`${dotSize[size]} bg-amber-500 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
            </div>
        );
    }

    if (variant === 'pulse') {
        return (
            <div className={`${sizeClasses[size]} ${className}`}>
                <div className="w-full h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-pulse" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 animate-slide-in-up">
                {children || <LoadingRoot size="lg" />}
                {message && (
                    <p className="text-zinc-700 dark:text-zinc-300 font-medium text-center">
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
            <div className="flex flex-col items-center gap-6">
                {/* Logo ou Ícone do Computaria */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
                        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <LoadingRoot size="md" variant="dots" />

                <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg">
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
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">
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