import Image from 'next/image';
import { photos } from '@/data/photos';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Galeri',
    description: 'Galeri foto dan dokumentasi kegiatan BPKPAD Kab. Tapanuli Selatan.'
};

export default async function GaleriPage({ searchParams }: { searchParams?: Promise<Record<string, string>> }) {
    const sp = (await searchParams) ?? {};
    const tahun = sp.tahun ? Number(sp.tahun) : undefined;
    const event = sp.event;
    const filtered = photos.filter(p => (tahun ? p.tahun === tahun : true) && (event ? p.event === event : true));

    return (
        <div className="space-y-10 pb-12">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 p-12 md:p-16 shadow-2xl">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/30">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-white">Dokumentasi Visual</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">Galeri Foto</h1>
                    <p className="text-xl text-purple-50 font-light max-w-2xl mx-auto">Dokumentasi kegiatan dan momen penting BPKPAD Kab. Tapanuli Selatan</p>
                </div>
            </div>

            {/* Filter Card */}
            <div className="rounded-[2rem] bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-xl p-6">
                <form className="flex flex-wrap gap-4">
                    <select
                        name="tahun"
                        defaultValue={tahun}
                        className="border-2 border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all flex-1 min-w-[150px]"
                        aria-label="Tahun"
                    >
                        <option value="">📅 Semua Tahun</option>
                        {[2023, 2024, 2025, 2026].map(t => (<option key={t} value={t}>{t}</option>))}
                    </select>
                    <input
                        name="event"
                        defaultValue={event}
                        placeholder="🔍 Cari event..."
                        className="border-2 border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all flex-1 min-w-[200px]"
                        aria-label="Event"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                        Filter
                    </button>
                </form>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((item, i) => (
                    <a
                        key={item.id}
                        href={item.url}
                        className="group relative aspect-square rounded-[1.5rem] overflow-hidden ring-2 ring-purple-100 hover:ring-purple-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        aria-label={item.judul}
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        <Image
                            src={item.url}
                            alt={item.judul}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Caption */}
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <p className="text-white text-sm font-bold mb-1">{item.judul}</p>
                            {item.event && (
                                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/30">
                                    {item.event}
                                </span>
                            )}
                        </div>

                        {/* Zoom Icon */}
                        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/30">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                            </svg>
                        </div>
                    </a>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📸</div>
                    <p className="text-xl text-gray-600 font-medium">Tidak ada foto yang ditemukan</p>
                    <p className="text-gray-500 mt-2">Coba ubah filter pencarian Anda</p>
                </div>
            )}
        </div>
    );
}
