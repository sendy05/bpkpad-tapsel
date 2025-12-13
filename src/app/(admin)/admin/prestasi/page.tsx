import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Kelola Prestasi | Admin BPKPAD',
    description: 'Kelola prestasi dan penghargaan BPKPAD Tapanuli Selatan',
};

export const dynamic = 'force-dynamic';

export default async function PrestasiPage() {
    const prestasiList = await prisma.prestasi_organisasi.findMany({
        orderBy: { tanggal: 'desc' },
    }).catch(() => []);

    // Stats
    const stats = {
        total: prestasiList.length,
        dengan_foto: prestasiList.filter(p => p.foto).length,
        kategori: [...new Set(prestasiList.map(p => p.kategori).filter(Boolean))].length,
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Prestasi & Penghargaan</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola prestasi organisasi BPKPAD</p>
                </div>
                <Link
                    href="/admin/prestasi/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">➕</span>
                    <span>Tambah Prestasi</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white text-lg">
                            🏆
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.total}</div>
                            <div className="text-xs text-gray-600">Total</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-lg">
                            📸
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.dengan_foto}</div>
                            <div className="text-xs text-gray-600">Foto</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-lg">
                            📂
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.kategori}</div>
                            <div className="text-xs text-gray-600">Kategori</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            {prestasiList.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
                    <span className="text-4xl">🏆</span>
                    <p className="font-medium text-gray-900 mt-4">Belum ada prestasi</p>
                    <p className="text-sm text-gray-600 mt-2">Klik tombol "Tambah Prestasi" untuk menambahkan</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {prestasiList.map((prestasi) => (
                        <div key={prestasi.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                            <div className="p-4 md:p-6">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Photo */}
                                    {prestasi.foto && (
                                        <div className="relative flex-shrink-0 w-full md:w-40 h-40 rounded-xl overflow-hidden ring-2 ring-yellow-100">
                                            <Image
                                                src={prestasi.foto}
                                                alt={prestasi.judul}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-3 mb-2">
                                            <div className="flex-1">
                                                {prestasi.kategori && (
                                                    <span className="inline-block bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-2">
                                                        {prestasi.kategori}
                                                    </span>
                                                )}
                                                <h3 className="text-lg md:text-xl font-bold text-gray-900">{prestasi.judul}</h3>
                                            </div>
                                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                                                <span className="text-white text-xl">🏆</span>
                                            </div>
                                        </div>

                                        {prestasi.deskripsi && (
                                            <p className="text-sm text-gray-700 mb-3 line-clamp-2">{prestasi.deskripsi}</p>
                                        )}

                                        <div className="flex flex-wrap gap-3 text-sm mb-4">
                                            {prestasi.pemberi && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <span>🏛️</span>
                                                    <span className="font-medium">{prestasi.pemberi}</span>
                                                </div>
                                            )}
                                            {prestasi.tanggal && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <span>📅</span>
                                                    <span className="text-xs">{new Date(prestasi.tanggal).toLocaleDateString('id-ID', { 
                                                        year: 'numeric', 
                                                        month: 'long', 
                                                        day: 'numeric' 
                                                    })}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/prestasi/${prestasi.id}/edit`}
                                                className="flex-1 md:flex-initial px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium text-center active:scale-95"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <form action={`/api/admin/prestasi/${prestasi.id}`} method="POST" className="flex-1 md:flex-initial">
                                                <input type="hidden" name="_method" value="DELETE" />
                                                <button
                                                    type="submit"
                                                    onClick={(e) => {
                                                        if (!confirm('Yakin ingin menghapus prestasi ini?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium active:scale-95"
                                                >
                                                    🗑️ Hapus
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

