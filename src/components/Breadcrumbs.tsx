"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
    const pathname = usePathname();
    const parts = pathname.split('/').filter(Boolean);
    const trail = [{ label: 'Beranda', href: '/' }, ...parts.map((p, i) => ({
        label: decodeURIComponent(p.replace('-', ' ')).replace(/\b\w/g, c => c.toUpperCase()),
        href: '/' + parts.slice(0, i + 1).join('/'),
    }))];

    return (
        <nav aria-label="Breadcrumb" className="text-sm mb-4" itemScope itemType="https://schema.org/BreadcrumbList">
            <ol className="flex flex-wrap gap-2 text-gray-600">
                {trail.map((item, idx) => (
                    <li key={item.href} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center gap-2">
                        {idx > 0 && <span aria-hidden="true">/</span>}
                        <Link href={item.href} itemProp="item" className="hover:underline">
                            <span itemProp="name">{item.label}</span>
                        </Link>
                        <meta itemProp="position" content={(idx + 1).toString()} />
                    </li>
                ))}
            </ol>
        </nav>
    );
}

