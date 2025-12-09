import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Video Kegiatan',
    description: 'Dokumentasi video kegiatan BPKPAD Kabupaten Tapanuli Selatan',
};

// Sample data - di production akan menggunakan database
const videoList = [
    {
        id: 1,
        judul: 'Sosialisasi Peraturan Pajak Daerah 2025',
        deskripsi: 'Kegiatan sosialisasi peraturan bupati tentang pajak daerah kepada para wajib pajak dan pelaku usaha di Kabupaten Tapanuli Selatan',
        thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
        youtubeId: 'dQw4w9WgXcQ',
        kategori: 'Sosialisasi',
        durasi: '12:35',
        tanggal: '2025-01-20',
        views: '1.2K'
    },
    {
        id: 2,
        judul: 'Rapat Evaluasi Realisasi PAD Semester II 2024',
        deskripsi: 'Dokumentasi rapat evaluasi pencapaian target Pendapatan Asli Daerah semester kedua tahun 2024 bersama seluruh pejabat struktural',
        thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=450&fit=crop',
        youtubeId: 'dQw4w9WgXcQ',
        kategori: 'Rapat',
        durasi: '45:20',
        tanggal: '2025-01-15',
        views: '850'
    },
    {
        id: 3,
        judul: 'Operasi Pajak Kendaraan Bermotor',
        deskripsi: 'Operasi bersama BPKPAD dan Polres Tapanuli Selatan dalam penertiban pajak kendaraan bermotor yang menunggak',
        thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=450&fit=crop',
        youtubeId: 'dQw4w9WgXcQ',
        kategori: 'Operasi',
        durasi: '8:15',
        tanggal: '2025-01-12',
        views: '2.5K'
    },
    {
        id: 4,
        judul: 'Workshop Peningkatan Kapasitas SDM BPKPAD',
        deskripsi: 'Kegiatan workshop peningkatan kompetensi dan kapasitas sumber daya manusia BPKPAD dalam pelayanan publik',
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=450&fit=crop',
        youtubeId: 'dQw4w9WgXcQ',
        kategori: 'Workshop',
        durasi: '1:15:30',
        tanggal: '2025-01-08',
        views: '680'
    },
    {
        id: 5,
        judul: 'Penilaian dan Inventarisasi Aset Daerah',
        deskripsi: 'Dokumentasi kegiatan penilaian dan inventarisasi aset daerah yang tersebar di berbagai lokasi di Kabupaten Tapanuli Selatan',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop',
        youtubeId: 'dQw4w9WgXcQ',
        kategori: 'Inventarisasi',
        durasi: '22:45',
        tanggal: '2024-12-28',
        views: '920'
    },
    {
        id: 6,
        judul: 'Launching Aplikasi e-SPTPD Online',
        deskripsi: 'Peluncuran aplikasi pelaporan Surat Pemberitahuan Pajak Daerah secara online untuk memudahkan wajib pajak',
        thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop',
        youtubeId: 'dQw4w9WgXcQ',
        kategori: 'Launching',
        durasi: '18:20',
        tanggal: '2024-12-15',
        views: '3.1K'
    },
    {
        id: 7,
        judul: 'Kunjungan Kerja Bupati ke BPKPAD',
        deskripsi: 'Kunjungan kerja Bupati Tapanuli Selatan untuk meninjau langsung kinerja dan pelayanan BPKPAD kepada masyarakat',
        thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=450&fit=crop',
        youtubeId: 'dQw4w9WgXcQ',
        kategori: 'Kunjungan',
        durasi: '15:40',
        tanggal: '2024-12-10',
        views: '4.2K'
    },
    {
        id: 8,
        judul: 'Lomba Cerdas Cermat Pajak Tingkat Pelajar',
        deskripsi: 'Kegiatan lomba cerdas cermat tentang perpajakan daerah untuk pelajar SMA/SMK se-Kabupaten Tapanuli Selatan',
        thumbnail: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=450&fit=crop',
        youtubeId: 'dQw4w9WgXcQ',
        kategori: 'Lomba',
        durasi: '35:15',
        tanggal: '2024-12-05',
        views: '1.8K'
    },
    {
        id: 9,
        judul: 'Serah Terima Jabatan Kepala BPKPAD',
        deskripsi: 'Upacara serah terima jabatan Kepala BPKPAD periode 2024-2029 di hadapan Bupati dan Sekda',
        thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=450&fit=crop',
        youtubeId: 'dQw4w9WgXcQ',
        kategori: 'Upacara',
        durasi: '28:50',
        tanggal: '2024-11-25',
        views: '5.3K'
    }
];

const categories = ['Semua', 'Sosialisasi', 'Rapat', 'Operasi', 'Workshop', 'Inventarisasi', 'Launching', 'Kunjungan', 'Lomba', 'Upacara'];

export default function VideoPage() {
    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 text-white py-16 shadow-2xl">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/30">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium">VIDEO DOKUMENTASI</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Video Kegiatan</h1>
                    <p className="text-xl text-rose-50 font-light max-w-2xl">Dokumentasi video kegiatan dan event BPKPAD Kabupaten Tapanuli Selatan</p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-8 rounded-[2rem] bg-white shadow-xl border-2 border-gray-100">
                <div className="container">
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center group">
                            <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">{videoList.length}</div>
                            <div className="text-neutral-600 font-medium">Total Video</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">125K</div>
                            <div className="text-neutral-600 font-medium">Total Views</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">2.5K</div>
                            <div className="text-neutral-600 font-medium">Subscribers</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">9</div>
                            <div className="text-neutral-600 font-medium">Kategori</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Categories */}
            <section className="py-8">
                <div className="container">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all ${cat === 'Semua'
                                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/50 hover:-translate-y-0.5'
                                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border-2 border-neutral-300 hover:border-red-400 hover:-translate-y-0.5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Grid */}
            <section className="py-8">
                <div className="container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videoList.map((video) => (
                            <div
                                key={video.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.judul}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                            <svg className="w-8 h-8 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Duration Badge */}
                                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                                        {video.durasi}
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {video.kategori}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-neutral-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                                        {video.judul}
                                    </h3>
                                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                                        {video.deskripsi}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-4 border-t border-neutral-200">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            <span>{video.views} views</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{new Date(video.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    </div>

                                    {/* Watch Button */}
                                    <a
                                        href={`https://youtube.com/watch?v=${video.youtubeId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                        </svg>
                                        Tonton Video
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* YouTube Channel CTA */}
            <section className="py-12">
                <div className="container">
                    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="text-6xl mb-6">📺</div>
                            <h2 className="text-3xl font-bold mb-4">Subscribe Channel YouTube Kami</h2>
                            <p className="text-rose-100 mb-8 max-w-2xl mx-auto">
                                Dapatkan notifikasi setiap ada video baru dengan subscribe channel YouTube BPKPAD Tapanuli Selatan
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://youtube.com/@bpkpadtapsel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:shadow-2xl transition-all"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                    Subscribe Sekarang
                                </a>
                                <Link
                                    href="/kontak"
                                    className="inline-block px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white hover:bg-white/30 transition-all"
                                >
                                    📞 Hubungi Kami
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
