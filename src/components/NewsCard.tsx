import Link from 'next/link';

interface NewsCardProps {
    id: number;
    title: string;
    excerpt: string;
    date: Date;
    category: string;
    imageUrl?: string;
    href: string;
}

export function NewsCard({ title, excerpt, date, category, imageUrl, href }: NewsCardProps) {
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));

    return (
        <Link href={href} className="group block">
            <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full border border-neutral-200 hover:border-emerald-500">
                {imageUrl && (
                    <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imageUrl}
                            alt={`${title} thumbnail`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 z-20">
                            <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                                {category}
                            </span>
                        </div>
                    </div>
                )}
                <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                        {title}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-3">
                        {excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <time dateTime={date.toISOString()}>{formattedDate}</time>
                    </div>
                </div>
            </article>
        </Link>
    );
}
