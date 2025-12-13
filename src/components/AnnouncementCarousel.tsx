import { announcements } from '@/data/announcements';

export function AnnouncementCarousel() {
    return (
        <section aria-label="Pengumuman Penting" className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-4 md:overflow-visible overflow-x-auto md:auto-cols-auto auto-cols-[minmax(280px,1fr)] md:grid-flow-row grid-flow-col">
                {announcements.map((item) => (
                    <div key={item.id} className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
                        <div className="text-amber-800 text-sm font-semibold">Pengumuman</div>
                        <p className="font-medium text-gray-900 mt-1">{item.judul}</p>
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{item.isi}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

