import React, { forwardRef } from 'react';

interface InputRootProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

const InputRoot = forwardRef<HTMLInputElement, InputRootProps>(
    ({ error, label, className = '', id, ...props }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`
                        w-full px-4 py-3 rounded-lg
                        bg-white dark:bg-zinc-800
                        border-2 ${error ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'}
                        text-zinc-900 dark:text-zinc-100
                        placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                        focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-amber-500'}
                        transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${className}
                    `}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

InputRoot.displayName = 'InputRoot';

interface InputIconProps {
    children: React.ReactNode;
    position?: 'left' | 'right';
    onClick?: () => void;
}

const InputIcon: React.FC<InputIconProps> = ({ children, position = 'left', onClick }) => {
    const positionClasses = position === 'left' ? 'left-3' : 'right-3';

    return (
        <div
            className={`absolute top-1/2 -translate-y-1/2 ${positionClasses} text-zinc-400 dark:text-zinc-500 ${onClick ? 'cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300' : ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

interface InputWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ children, className = '' }) => {
    return (
        <div className={`relative ${className}`}>
            {children}
        </div>
    );
};

interface InputGroupProps {
    children: React.ReactNode;
    className?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ children, className = '' }) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {children}
        </div>
    );
};

export const Input = {
    Root: InputRoot,
    Icon: InputIcon,
    Wrapper: InputWrapper,
    Group: InputGroup
};