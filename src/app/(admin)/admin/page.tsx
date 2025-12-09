import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata = {
    title: 'Dashboard Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
    const session = await auth();
    if (!session) redirect('/admin/login');

    // Get statistics from database
    const [beritaCount, sliderCount, galeriCount, aplikasiCount, dokumenCount, videoCount] = await Promise.all([
        prisma.tbl_berita.count().catch(() => 0),
        prisma.tbl_slider.count().catch(() => 0),
        prisma.tbl_galery.count().catch(() => 0),
        prisma.tbl_aplikasi.count().catch(() => 0),
        prisma.dokumen.count().catch(() => 0),
        prisma.tbl_video.count().catch(() => 0),
    ]);

    const stats = [
        { label: 'Total Berita', value: beritaCount, icon: '📰', color: 'from-blue-500 to-cyan-500', link: '/admin/berita-lama' },
        { label: 'Slider Website', value: sliderCount, icon: '🖼️', color: 'from-pink-500 to-rose-500', link: '/admin/slider' },
        { label: 'Galeri Foto', value: galeriCount, icon: '📷', color: 'from-purple-500 to-pink-500', link: '/admin/galeri' },
        { label: 'Aplikasi', value: aplikasiCount, icon: '🚀', color: 'from-emerald-500 to-teal-500', link: '/admin/aplikasi' },
    ];

    const statsLama = [
        { label: 'Regulasi', value: dokumenCount, icon: '📋', color: 'from-indigo-500 to-blue-500', link: '/admin/regulasi' },
        { label: 'Video', value: videoCount, icon: '🎥', color: 'from-red-500 to-pink-500', link: '/admin/video' },
        { label: 'Agenda', value: 0, icon: '📅', color: 'from-amber-500 to-orange-500', link: '/admin/agenda' },
        { label: 'Kontak', value: 0, icon: '📞', color: 'from-green-500 to-emerald-500', link: '/admin/kontak' },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">Dashboard Admin</h1>
                <p className="text-gray-600 text-lg">Selamat datang kembali, <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{session.user?.name}</span> 👋</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Link
                        key={index}
                        href={stat.link}
                        className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                        <div className="relative">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}>
                                    {stat.icon}
                                </div>
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Menu Manajemen Lainnya */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Menu Manajemen Lainnya</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsLama.map((stat, index) => (
                        <Link
                            key={index}
                            href={stat.link}
                            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                            <div className="relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}>
                                        {stat.icon}
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/admin/berita-lama/new"
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all border border-blue-200"
                    >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xl">
                            ➕
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">Tambah Berita</div>
                            <div className="text-sm text-gray-600">Buat artikel baru</div>
                        </div>
                    </Link>
                    <Link
                        href="/admin/regulasi/new"
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all border border-emerald-200"
                    >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl">
                            📄
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">Tambah Regulasi</div>
                            <div className="text-sm text-gray-600">Upload dokumen</div>
                        </div>
                    </Link>
                    <Link
                        href="/admin/slider/new"
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 transition-all border border-pink-200"
                    >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-xl">
                            🖼️
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">Tambah Slider</div>
                            <div className="text-sm text-gray-600">Upload gambar</div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Logout */}
            <div className="flex justify-end">
                <form
                    action={async () => {
                        'use server';
                        await signOut({ redirectTo: '/admin/login' });
                    }}
                >
                    <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
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
