import React from 'react';

interface ButtonRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

const ButtonRoot: React.FC<ButtonRootProps> = ({
                                                   variant = 'primary',
                                                   size = 'md',
                                                   className = '',
                                                   children,
                                                   disabled,
                                                   loading = false,
                                                   ...props
                                               }) => {
    const baseStyles = 'rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden';

    const variantStyles = {
        primary: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-900 hover:from-amber-600 hover:to-yellow-600 focus:ring-amber-500 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02]',
        secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 focus:ring-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 border border-zinc-700 dark:border-zinc-600',
        ghost: 'bg-transparent text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-400 dark:text-zinc-300 dark:hover:bg-zinc-800',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 hover:scale-[1.02]'
    };

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <div className="absolute inset-0 bg-inherit flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            <span className={loading ? 'invisible' : 'flex items-center gap-2'}>
                {children}
            </span>
        </button>
    );
};

interface ButtonIconProps {
    children: React.ReactNode;
    position?: 'left' | 'right';
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ children }) => {
    return <span className="inline-flex items-center shrink-0">{children}</span>;
};

interface ButtonTextProps {
    children: React.ReactNode;
}

const ButtonText: React.FC<ButtonTextProps> = ({ children }) => {
    return <span>{children}</span>;
};

export const Button = {
    Root: ButtonRoot,
    Icon: ButtonIcon,
    Text: ButtonText
};