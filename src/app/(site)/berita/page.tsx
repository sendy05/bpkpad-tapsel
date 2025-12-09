import Link from 'next/link';
import Image from 'next/image';
import { news } from '@/data/news';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Berita & Artikel',
    description: 'Kumpulan berita dan artikel resmi BPKPAD Kab. Tapanuli Selatan.'
};
import { formatDate } from '@/lib/utils';


function filterNews(
    kategori?: string,
    bulan?: number,
    tahun?: number,
    q?: string
) {
    return news.filter(n => {
        const matchKategori = kategori ? n.kategori === kategori : true;
        const d = new Date(n.published_at);
        const matchBulan = bulan ? d.getMonth() + 1 === bulan : true;
        const matchTahun = tahun ? d.getFullYear() === tahun : true;
        const matchQ = q ? (n.judul + ' ' + n.konten).toLowerCase().includes(q.toLowerCase()) : true;
        return matchKategori && matchBulan && matchTahun && matchQ;
    });
}

export default async function BeritaListPage({ searchParams }: { searchParams?: Promise<Record<string, string>> }) {
    const sp = (await searchParams) ?? {};
    const page = Number(sp.page ?? '1');
    const pageSize = 12;
    const kategori = sp.kategori;
    const bulan = sp.bulan ? Number(sp.bulan) : undefined;
    const tahun = sp.tahun ? Number(sp.tahun) : undefined;
    const q = sp.q;

    const filtered = filterNews(kategori, bulan, tahun, q);
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <div className="space-y-10 pb-12">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-600 p-12 md:p-16 shadow-2xl">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/30">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-white">Update Terbaru</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">Berita & Artikel</h1>
                    <p className="text-xl text-blue-50 font-light max-w-2xl mx-auto">Informasi terkini dan artikel resmi dari BPKPAD Kab. Tapanuli Selatan</p>
                </div>
            </div>

            {/* Filter Card */}
            <div className="rounded-[2rem] bg-white/80 backdrop-blur-sm border-2 border-blue-100 shadow-xl p-6">
                <form className="grid md:grid-cols-5 gap-4" role="search" aria-label="Pencarian Berita">
                    <input
                        name="q"
                        defaultValue={q}
                        placeholder="🔍 Cari judul/konten"
                        className="border-2 border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        aria-label="Cari"
                    />
                    <select
                        name="kategori"
                        defaultValue={kategori}
                        className="border-2 border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        aria-label="Kategori"
                    >
                        <option value="">Semua Kategori</option>
                        <option>Pengumuman</option>
                        <option>Kegiatan</option>
                        <option>Informasi</option>
                        <option>Pencapaian</option>
                    </select>
                    <select
                        name="bulan"
                        defaultValue={bulan}
                        className="border-2 border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        aria-label="Bulan"
                    >
                        <option value="">Semua Bulan</option>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <select
                        name="tahun"
                        defaultValue={tahun}
                        className="border-2 border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        aria-label="Tahun"
                    >
                        <option value="">Semua Tahun</option>
                        {[2023, 2024, 2025, 2026].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                        Filter
                    </button>
                </form>
            </div>

            {/* News Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, i) => (
                    <article
                        key={item.id}
                        className="group relative rounded-[2rem] overflow-hidden bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        {/* Image with Overlay */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                            <Image
                                src={item.featured_image ?? '/images/placeholder.svg'}
                                alt={item.judul}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        <div className="p-6">
                            {/* Meta */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {item.kategori}
                                </span>
                                <span className="text-xs text-gray-500">{formatDate(item.published_at)}</span>
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                <Link
                                    href={`/berita/${item.slug}`}
                                    className="hover:underline focus:outline-none focus:ring-2 ring-offset-2 ring-blue-300 rounded"
                                >
                                    {item.judul}
                                </Link>
                            </h3>

                            {/* Excerpt */}
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">{item.konten}</p>

                            {/* Read More Link */}
                            <Link
                                href={`/berita/${item.slug}`}
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold group/link"
                            >
                                Baca selengkapnya
                                <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>

                        {/* Hover Indicator */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
                        </div>
                    </article>
                ))}
            </div>

            <nav aria-label="Pagination" className="flex items-center gap-2 justify-center flex-wrap">
                {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    const params = new URLSearchParams({ ...(q ? { q } : {}), ...(kategori ? { kategori } : {}), ...(bulan ? { bulan: String(bulan) } : {}), ...(tahun ? { tahun: String(tahun) } : {}), page: String(p) });
                    return (
                        <Link key={p} href={`/berita?${params.toString()}`} className={`px-3 py-1.5 border rounded-md transition ${p === page ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}>
                            {p}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
