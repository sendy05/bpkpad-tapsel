import Link, { LinkProps } from 'next/link';
import * as React from 'react';
import { buttonVariants } from './Button';
import { cn } from './utils';
import type { VariantProps } from 'class-variance-authority';

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface LinkButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    href: LinkProps['href'];
    variant?: ButtonVariantProps['variant'];
    size?: ButtonVariantProps['size'];
}

export function LinkButton({ className, variant, size, href, ...props }: LinkButtonProps) {
    return (
        <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
}
