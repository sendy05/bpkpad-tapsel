import { HTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    icon?: React.ReactNode;
    title?: string;
}

const icons: Record<AlertVariant, string> = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    danger: '❌',
};

export function Alert({
    className,
    variant = 'info',
    icon,
    title,
    children,
    ...props
}: AlertProps) {
    const variantClasses: Record<AlertVariant, string> = {
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning',
        danger: 'alert-danger',
    };

    const displayIcon = icon || icons[variant];

    return (
        <div
            role="alert"
            className={cn('alert', variantClasses[variant], className)}
            {...props}
        >
            {displayIcon && (
                <span className="text-2xl flex-shrink-0" aria-hidden="true">
                    {displayIcon}
                </span>
            )}
            <div className="flex-1">
                {title && (
                    <div className="font-bold mb-1">{title}</div>
                )}
                <div className="text-sm">{children}</div>
            </div>
        </div>
    );
}

