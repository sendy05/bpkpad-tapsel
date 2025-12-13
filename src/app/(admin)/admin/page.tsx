import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';

export const metadata = {
    title: 'Dashboard Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
    const session = await auth();
    if (!session) redirect('/admin/login');

    // Get statistics from database
    const [
        beritaCount, 
        sliderCount, 
        galeriCount, 
        aplikasiCount, 
        dokumenCount, 
        videoCount,
        agendaCount,
        kontakCount,
        layananCount,
        pejabatCount,
        ppidCount,
        prestasiCount,
        sopCount,
        strukturCount,
        dataStatistikCount
    ] = await Promise.all([
        prisma.tbl_berita.count().catch(() => 0),
        prisma.tbl_slider.count().catch(() => 0),
        prisma.tbl_galery.count().catch(() => 0),
        prisma.tbl_aplikasi.count().catch(() => 0),
        prisma.dokumen.count().catch(() => 0),
        prisma.tbl_video.count().catch(() => 0),
        prisma.agenda.count().catch(() => 0),
        prisma.kontak.count().catch(() => 0),
        prisma.layanan.count().catch(() => 0),
        prisma.pejabat.count().catch(() => 0),
        prisma.informasiPublik.count().catch(() => 0),
        prisma.prestasi_organisasi.count().catch(() => 0),
        prisma.sop_dokumen.count().catch(() => 0),
        prisma.struktur_organisasi.count().catch(() => 0),
        prisma.data_statistik.count().catch(() => 0),
    ]);

    const menuKonten = [
        { label: 'Berita', value: beritaCount, icon: '📰', color: 'from-blue-500 to-cyan-500', link: '/admin/berita', desc: 'Kelola artikel & berita' },
        { label: 'Slider', value: sliderCount, icon: '🖼️', color: 'from-pink-500 to-rose-500', link: '/admin/slider', desc: 'Kelola gambar slider' },
        { label: 'Galeri', value: galeriCount, icon: '📷', color: 'from-purple-500 to-pink-500', link: '/admin/galeri', desc: 'Kelola foto galeri' },
        { label: 'Video', value: videoCount, icon: '🎥', color: 'from-red-500 to-pink-500', link: '/admin/video', desc: 'Kelola video' },
    ];

    const menuLayanan = [
        { label: 'Layanan', value: layananCount, icon: '🏢', color: 'from-emerald-500 to-teal-500', link: '/admin/layanan', desc: 'Layanan publik' },
        { label: 'Aplikasi', value: aplikasiCount, icon: '🚀', color: 'from-sky-500 to-blue-500', link: '/admin/aplikasi', desc: 'Aplikasi & link' },
        { label: 'PPID', value: ppidCount, icon: '📋', color: 'from-indigo-500 to-purple-500', link: '/admin/ppid', desc: 'Info publik' },
        { label: 'Regulasi', value: dokumenCount, icon: '📜', color: 'from-amber-500 to-orange-500', link: '/admin/regulasi', desc: 'Dokumen regulasi' },
    ];

    const menuProfil = [
        { label: 'Pejabat', value: pejabatCount, icon: '👥', color: 'from-teal-500 to-cyan-500', link: '/admin/pejabat', desc: 'Data pejabat' },
        { label: 'Struktur', value: strukturCount, icon: '🏛️', color: 'from-violet-500 to-purple-500', link: '/admin/struktur', desc: 'Struktur organisasi' },
        { label: 'SOP', value: sopCount, icon: '📑', color: 'from-blue-500 to-indigo-500', link: '/admin/sop', desc: 'Standard Operating' },
        { label: 'Prestasi', value: prestasiCount, icon: '🏆', color: 'from-yellow-500 to-amber-500', link: '/admin/prestasi', desc: 'Prestasi & capaian' },
    ];

    const menuLainnya = [
        { label: 'Agenda', value: agendaCount, icon: '📅', color: 'from-rose-500 to-pink-500', link: '/admin/agenda', desc: 'Jadwal kegiatan' },
        { label: 'Kontak', value: kontakCount, icon: '📞', color: 'from-green-500 to-emerald-500', link: '/admin/kontak', desc: 'Informasi kontak' },
        { label: 'Data Statistik', value: dataStatistikCount, icon: '📊', color: 'from-cyan-500 to-blue-500', link: '/admin/data-statistik', desc: 'Data & statistik' },
        { label: 'Profil Organisasi', value: 1, icon: '🏢', color: 'from-gray-500 to-slate-600', link: '/admin/profil-organisasi', desc: 'Profil instansi' },
    ];

    return (
        <div className="min-h-screen pb-8">
            {/* Mobile-First Header */}
            <div className="mb-6 md:mb-10">
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2 md:mb-3">
                    Dashboard Admin
                </h1>
                <p className="text-sm md:text-lg text-gray-600">
                    Selamat datang, <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{session.user?.name}</span> 👋
                </p>
            </div>

            {/* Menu Konten */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-xl md:text-2xl">📝</span>
                    <span>Manajemen Konten</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {menuKonten.map((menu, index) => (
                        <Link
                            key={index}
                            href={menu.link}
                            className="group bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 active:scale-95"
                        >
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${menu.color} flex items-center justify-center text-lg md:text-2xl shadow-md mb-2 md:mb-3`}>
                                {menu.icon}
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900 mb-0.5 md:mb-1">{menu.value}</div>
                            <div className="text-xs md:text-sm font-semibold text-gray-700">{menu.label}</div>
                            <div className="text-[10px] md:text-xs text-gray-500 mt-1 hidden sm:block">{menu.desc}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Menu Layanan */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-xl md:text-2xl">🏢</span>
                    <span>Layanan & Informasi</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {menuLayanan.map((menu, index) => (
                        <Link
                            key={index}
                            href={menu.link}
                            className="group bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 active:scale-95"
                        >
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${menu.color} flex items-center justify-center text-lg md:text-2xl shadow-md mb-2 md:mb-3`}>
                                {menu.icon}
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900 mb-0.5 md:mb-1">{menu.value}</div>
                            <div className="text-xs md:text-sm font-semibold text-gray-700">{menu.label}</div>
                            <div className="text-[10px] md:text-xs text-gray-500 mt-1 hidden sm:block">{menu.desc}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Menu Profil */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-xl md:text-2xl">👥</span>
                    <span>Profil & Organisasi</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {menuProfil.map((menu, index) => (
                        <Link
                            key={index}
                            href={menu.link}
                            className="group bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 active:scale-95"
                        >
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${menu.color} flex items-center justify-center text-lg md:text-2xl shadow-md mb-2 md:mb-3`}>
                                {menu.icon}
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900 mb-0.5 md:mb-1">{menu.value}</div>
                            <div className="text-xs md:text-sm font-semibold text-gray-700">{menu.label}</div>
                            <div className="text-[10px] md:text-xs text-gray-500 mt-1 hidden sm:block">{menu.desc}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Menu Lainnya */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-xl md:text-2xl">⚙️</span>
                    <span>Menu Lainnya</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {menuLainnya.map((menu, index) => (
                        <Link
                            key={index}
                            href={menu.link}
                            className="group bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 active:scale-95"
                        >
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${menu.color} flex items-center justify-center text-lg md:text-2xl shadow-md mb-2 md:mb-3`}>
                                {menu.icon}
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900 mb-0.5 md:mb-1">{menu.value}</div>
                            <div className="text-xs md:text-sm font-semibold text-gray-700">{menu.label}</div>
                            <div className="text-[10px] md:text-xs text-gray-500 mt-1 hidden sm:block">{menu.desc}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Quick Actions - Mobile Friendly */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 mb-6 md:mb-8">
                <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="text-lg md:text-2xl">⚡</span>
                    <span>Aksi Cepat</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    <Link
                        href="/admin/berita/new"
                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all border border-blue-200 active:scale-95"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-lg md:text-xl flex-shrink-0">
                            ➕
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900 text-sm md:text-base">Tambah Berita</div>
                            <div className="text-xs md:text-sm text-gray-600">Buat artikel baru</div>
                        </div>
                    </Link>
                    <Link
                        href="/admin/regulasi/new"
                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all border border-emerald-200 active:scale-95"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg md:text-xl flex-shrink-0">
                            📄
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900 text-sm md:text-base">Tambah Regulasi</div>
                            <div className="text-xs md:text-sm text-gray-600">Upload dokumen</div>
                        </div>
                    </Link>
                    <Link
                        href="/admin/slider/new"
                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 transition-all border border-pink-200 active:scale-95"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-lg md:text-xl flex-shrink-0">
                            🖼️
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900 text-sm md:text-base">Tambah Slider</div>
                            <div className="text-xs md:text-sm text-gray-600">Upload gambar</div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Logout Button - Mobile Friendly */}
            <div className="flex justify-center md:justify-end">
                <form
                    action={async () => {
                        'use server';
                        await signOut({ redirectTo: '/admin/login' });
                    }}
                    className="w-full md:w-auto"
                >
                    <button 
                        type="submit" 
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Keluar
                    </button>
                </form>
            </div>
        </div>
    );
}

