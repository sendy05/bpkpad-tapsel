import Link from 'next/link';
import Image from 'next/image';
import { news } from '@/data/news';
import { formatDate } from '@/lib/utils';

type Props = { limit?: number };

export function NewsList({ limit = 4 }: Props) {
    const list = news.slice(0, limit);
    return (
        <section aria-label="Berita Terbaru" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {list.map(item => (
                <article key={item.id} className="border rounded-xl overflow-hidden bg-white shadow-sm transition hover:shadow-md">
                    <div className="relative w-full aspect-[4/3]">
                        <Image src={item.featured_image ?? '/images/placeholder.svg'} alt={item.judul} fill className="object-cover" loading="lazy" />
                    </div>
                    <div className="p-4">
                        <p className="text-xs text-gray-500">{formatDate(item.published_at)}</p>
                        <h3 className="font-semibold mt-1 text-gray-900">
                            <Link href={`/berita/${item.slug}`} className="hover:underline focus:outline-none focus:ring-2 ring-offset-2 ring-blue-300 rounded">
                                {item.judul}
                            </Link>
                        </h3>
                        <p className="text-sm text-gray-700 line-clamp-2 mt-1">{item.konten}</p>
                        <div className="mt-3">
                            <Link href={`/berita/${item.slug}`} className="text-blue-700 hover:text-blue-800 text-sm font-medium">Baca selengkapnya →</Link>
                        </div>
                    </div>
                </article>
            ))}
        </section>
    );
}
