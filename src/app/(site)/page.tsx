import { HeroCarousel } from '@/components/HeroCarousel';
import { TopBar } from '@/components/TopBar';
import { NewsCard } from '@/components/NewsCard';
import { StatCards } from '@/components/StatCards';
import { FooterKemenkeu } from '@/components/FooterKemenkeu';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Beranda',
    description:
        'Website resmi BPKPAD Kab. Tapanuli Selatan: informasi pajak daerah, retribusi, aset daerah, berita, dan layanan publik.',
};

// Quick menu services
const quickMenus = [
    { id: '1', title: 'Pajak Daerah', description: 'Layanan Pajak', icon: '💳', link: '/layanan/pajak', gradient: 'from-blue-500 to-cyan-500' },
    { id: '2', title: 'Retribusi', description: 'Layanan Retribusi', icon: '🏢', link: '/layanan/retribusi', gradient: 'from-purple-500 to-pink-500' },
    { id: '3', title: 'Aset Daerah', description: 'Pengelolaan Aset', icon: '🏛️', link: '/layanan/aset', gradient: 'from-emerald-500 to-teal-500' },
    { id: '4', title: 'Regulasi', description: 'Produk Hukum', icon: '⚖️', link: '/regulasi', gradient: 'from-amber-500 to-orange-500' },
    { id: '5', title: 'Pengaduan', description: 'Layanan Pengaduan', icon: '📢', link: '/layanan/pengaduan', gradient: 'from-red-500 to-rose-500' },
    { id: '6', title: 'Galeri', description: 'Foto & Video', icon: '📸', link: '/galeri', gradient: 'from-indigo-500 to-blue-500' },
    { id: '7', title: 'Video', description: 'Video Kegiatan', icon: '🎥', link: '/video', gradient: 'from-violet-500 to-purple-500' },
    { id: '8', title: 'Kontak', description: 'Hubungi Kami', icon: '📞', link: '/kontak', gradient: 'from-slate-600 to-slate-700' },
];

export default async function HomePage() {
    // Get latest news from old database
    const beritaLama = await prisma.tbl_berita.findMany({
        orderBy: { tgl_update: 'desc' },
        take: 6,
    }).catch(() => []);

    // Get slider images
    const sliderImages = await prisma.tbl_slider.findMany({
        orderBy: { tgl_update: 'desc' },
        take: 3,
    }).catch(() => []);

    // Get aplikasi links
    const aplikasiLinks = await prisma.tbl_aplikasi.findMany({
        orderBy: { tgl_update: 'desc' },
        take: 6,
    }).catch(() => []);

    // Hero carousel slides - Kemenkeu style with #APBD2025
    const heroSlides = [
        {
            id: 1,
            title: '#APBD2025',
            subtitle: 'Anggaran Pendapatan dan Belanja Daerah Kabupaten Tapanuli Selatan 2025',
            imageUrl: 'https://images.unsplash.com/photo-1427751840561-9852520f8ce8?w=1920&h=800&fit=crop',
            tag: 'APBD',
            ctaText: 'BACA SELENGKAPNYA',
            ctaLink: '/apbd-2025'
        },
        {
            id: 2,
            title: 'Transparansi Keuangan Daerah',
            subtitle: 'Komitmen pengelolaan keuangan dan aset daerah yang transparan, akuntabel, dan profesional untuk kesejahteraan masyarakat',
            imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=800&fit=crop',
            tag: 'Transparansi',
            ctaText: 'BACA SELENGKAPNYA',
            ctaLink: '/transparansi'
        },
        {
            id: 3,
            title: 'Layanan Pajak Digital',
            subtitle: 'Sistem pembayaran pajak daerah online yang mudah, cepat, dan terintegrasi untuk kemudahan wajib pajak',
            imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=800&fit=crop',
            tag: 'Layanan Digital',
            ctaText: 'BACA SELENGKAPNYA',
            ctaLink: '/layanan/pajak'
        }
    ];

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Top Bar */}
            <TopBar />

            {/* Hero Carousel */}
            <HeroCarousel slides={heroSlides} />

            {/* Quick Access Services */}
            <section className="container py-16 -mt-24 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickMenus.map((menu) => (
                        <Link
                            key={menu.id}
                            href={menu.link}
                            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${menu.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                            <div className="relative text-center">
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${menu.gradient} text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    {menu.icon}
                                </div>
                                <h3 className="font-bold text-neutral-800 mb-1 text-sm">{menu.title}</h3>
                                <p className="text-xs text-neutral-500">{menu.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Statistics Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                <div className="container relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-3">Statistik Pendapatan Daerah</h2>
                        <p className="text-slate-300">Data realtime pendapatan asli daerah</p>
                    </div>
                    <StatCards />
                </div>
            </section>

            {/* News Section */}
            <section className="container py-20">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-4xl font-bold text-neutral-800 mb-3">
                            Berita Terkini
                        </h2>
                        <p className="text-neutral-600">Informasi dan berita terbaru BPKPAD</p>
                    </div>
                    <Link
                        href="/berita"
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Lihat Semua
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {beritaLama.map((berita) => (
                        <NewsCard
                            key={berita.id_berita}
                            id={parseInt(berita.id_berita || '0', 36)}
                            title={berita.judul || 'Berita'}
                            excerpt={berita.isi ? berita.isi.substring(0, 150) : ''}
                            imageUrl={berita.foto || '/images/default-news.jpg'}
                            category={berita.kategori || 'Umum'}
                            date={berita.tgl_update || new Date()}
                            href={`/berita/${berita.id_berita}`}
                        />
                    ))}
                </div>
            </section>

            {/* Agenda & Quick Links Section */}
            <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-20">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Agenda */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-neutral-800 mb-2 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Agenda Kegiatan
                                    </h2>
                                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {aplikasiLinks.length > 0 ? (
                                    aplikasiLinks.slice(0, 4).map((app) => (
                                        <a
                                            key={app.id_aplikasi}
                                            href={app.link || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group bg-white rounded-xl p-4 hover:shadow-xl transition-all border border-neutral-200 hover:border-emerald-400 flex items-center gap-4 hover:-translate-y-1"
                                        >
                                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                                {app.icon ? (
                                                    <img src={app.icon} alt={app.nm_aplikasi || 'Icon'} className="w-6 h-6 object-contain" />
                                                ) : (
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-neutral-800 mb-1 group-hover:text-emerald-600 transition-colors">
                                                    {app.nm_aplikasi || 'Aplikasi'}
                                                </h3>
                                                <p className="text-xs text-neutral-500 truncate">{app.link || '-'}</p>
                                            </div>
                                            <svg className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-neutral-500">
                                        <svg className="w-12 h-12 mx-auto mb-2 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm">Belum ada agenda terjadwal</p>
                                    </div>
                                )}
                            </div>
                            {aplikasiLinks.length > 0 && (
                                <Link
                                    href="/agenda"
                                    className="mt-6 inline-block w-full text-center py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/50 transition-all"
                                >
                                    Lihat Semua Agenda
                                </Link>
                            )}
                        </div>

                        {/* Data & Publikasi */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-neutral-800 mb-2 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Data & Statistik
                                    </h2>
                                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:-translate-y-1">
                                    <div className="text-3xl font-bold mb-2">125.4M</div>
                                    <div className="text-sm opacity-90">Target PAD 2024</div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all hover:-translate-y-1">
                                    <div className="text-3xl font-bold mb-2">89.2%</div>
                                    <div className="text-sm opacity-90">Realisasi PAD</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Link href="/data-statistik" className="block group">
                                    <div className="bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all border border-neutral-200 hover:border-blue-400 rounded-2xl p-5 hover:-translate-y-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-neutral-800 group-hover:text-blue-600 transition-colors">Laporan Keuangan 2024</div>
                                                    <div className="text-xs text-neutral-500">Triwulan III</div>
                                                </div>
                                            </div>
                                            <svg className="w-5 h-5 text-neutral-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/data-statistik/pad" className="block group">
                                    <div className="bg-white hover:shadow-xl hover:shadow-purple-500/10 transition-all border border-neutral-200 hover:border-purple-400 rounded-2xl p-5 hover:-translate-y-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-neutral-800 group-hover:text-purple-600 transition-colors">Statistik PAD</div>
                                                    <div className="text-xs text-neutral-500">Data Terkini</div>
                                                </div>
                                            </div>
                                            <svg className="w-5 h-5 text-neutral-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Aplikasi Section */}
            {aplikasiLinks.length > 0 && (
                <section className="container py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-neutral-800 mb-3">Aplikasi & Sistem</h2>
                        <p className="text-neutral-600">Portal aplikasi terintegrasi BPKPAD Kab. Tapanuli Selatan</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {aplikasiLinks.map((app) => (
                            <a
                                key={app.id_aplikasi}
                                href={app.link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-neutral-100 hover:border-emerald-400 text-center hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {app.icon ? (
                                        <img src={app.icon} alt={app.nm_aplikasi || 'Icon'} className="w-8 h-8 object-contain" />
                                    ) : (
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    )}
                                </div>
                                <h3 className="font-bold text-neutral-800 mb-1 text-sm group-hover:text-emerald-600 transition-colors">
                                    {app.nm_aplikasi || 'Aplikasi'}
                                </h3>
                                <p className="text-xs text-neutral-500">Buka Aplikasi</p>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer */}
            <FooterKemenkeu />
        </div>
    );
}
