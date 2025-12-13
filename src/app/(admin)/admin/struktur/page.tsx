import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Struktur Organisasi | Admin BPKPAD',
    description: 'Kelola struktur organisasi BPKPAD Tapanuli Selatan',
};

export const dynamic = 'force-dynamic';

export default async function StrukturPage() {
    const strukturList = await prisma.struktur_organisasi.findMany({
        orderBy: { tgl_update: 'desc' },
    }).catch(() => []);

    // Stats
    const stats = {
        total: strukturList.length,
        dengan_gambar: strukturList.filter(s => s.gambar).length,
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Struktur Organisasi</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola gambar struktur organisasi BPKPAD</p>
                </div>
                <Link
                    href="/admin/struktur/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">➕</span>
                    <span>Tambah Struktur</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg">
                            🏢
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.total}</div>
                            <div className="text-xs text-gray-600">Total</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-lg">
                            🖼️
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.dengan_gambar}</div>
                            <div className="text-xs text-gray-600">Dengan Gambar</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            {strukturList.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
                    <span className="text-4xl">🏢</span>
                    <p className="font-medium text-gray-900 mt-4">Belum ada struktur organisasi</p>
                    <p className="text-sm text-gray-600 mt-2">Klik tombol "Tambah Struktur" untuk menambahkan</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {strukturList.map((struktur) => (
                        <div key={struktur.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                            {/* Image */}
                            {struktur.gambar && (
                                <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-50">
                                    <Image
                                        src={struktur.gambar}
                                        alt="Struktur Organisasi"
                                        fill
                                        className="object-contain p-2"
                                        unoptimized
                                    />
                                </div>
                            )}

                            <div className="p-4">
                                {/* Info */}
                                <div className="space-y-2 mb-3">
                                    {struktur.keterangan ? (
                                        <p className="text-sm text-gray-700 line-clamp-2">{struktur.keterangan}</p>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">Tanpa keterangan</p>
                                    )}
                                    {struktur.tgl_update && (
                                        <p className="text-xs text-gray-500">
                                            📅 {new Date(struktur.tgl_update).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/struktur/${struktur.id}/edit`}
                                        className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium text-center active:scale-95"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <form action={`/api/admin/struktur/${struktur.id}`} method="POST" className="flex-1">
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button
                                            type="submit"
                                            onClick={(e) => {
                                                if (!confirm('Yakin ingin menghapus struktur ini?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium active:scale-95"
                                        >
                                            🗑️ Hapus
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

