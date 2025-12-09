import { HTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}

export function Badge({
    className,
    variant = 'primary',
    children,
    ...props
}: BadgeProps) {
    const variantClasses: Record<BadgeVariant, string> = {
        primary: 'badge-primary',
        secondary: 'badge-secondary',
        success: 'badge-success',
        warning: 'badge-warning',
        danger: 'badge-danger',
        neutral: 'badge-neutral',
    };

    return (
        <span
            className={cn('badge', variantClasses[variant], className)}
            {...props}
        >
            {children}
        </span>
    );
}
