import Image from 'next/image';
import { photos } from '@/data/photos';

type Props = { limit?: number };

export function GalleryGrid({ limit = 6 }: Props) {
    const list = photos.slice(0, limit);
    return (
        <section aria-label="Galeri Foto" className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {list.map(item => (
                <a key={item.id} href={item.url} className="relative block aspect-square rounded-lg overflow-hidden ring-1 ring-gray-200 hover:ring-blue-200 transition group" aria-label={item.judul}>
                    <Image src={item.url} alt={item.judul} fill className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </a>
            ))}
        </section>
    );
}
