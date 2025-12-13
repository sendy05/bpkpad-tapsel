import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Kelola Pejabat | Admin BPKPAD',
    description: 'Kelola data pejabat dan pegawai BPKPAD Tapanuli Selatan',
};

export const dynamic = 'force-dynamic';

export default async function PejabatPage() {
    const pejabatList = await prisma.pejabat.findMany({
        orderBy: { urutan: 'asc' },
    }).catch(() => []);

    // Stats
    const stats = {
        total: pejabatList.length,
        aktif: pejabatList.filter(p => p.status === 1).length,
        nonaktif: pejabatList.filter(p => p.status === 0).length,
        lengkap: pejabatList.filter(p => p.foto && p.email && p.telepon).length,
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manajemen Pejabat</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola data pejabat struktural BPKPAD</p>
                </div>
                <Link
                    href="/admin/pejabat/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">➕</span>
                    <span>Tambah Pejabat</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-lg">
                            👥
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
                            ✓
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.aktif}</div>
                            <div className="text-xs text-gray-600">Aktif</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center text-white text-lg">
                            ✗
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.nonaktif}</div>
                            <div className="text-xs text-gray-600">Nonaktif</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-lg">
                            📋
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.lengkap}</div>
                            <div className="text-xs text-gray-600">Lengkap</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table - Desktop */}
            <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Urutan</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Foto</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Jabatan</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">NIP</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Kontak</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pejabatList.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">👥</span>
                                            <p className="font-medium">Belum ada pejabat</p>
                                            <p className="text-sm">Klik tombol "Tambah Pejabat" untuk menambahkan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                pejabatList.map((pejabat) => (
                                    <tr key={pejabat.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-bold">#{pejabat.urutan}</td>
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200 relative ring-2 ring-purple-100">
                                                {pejabat.foto ? (
                                                    <Image
                                                        src={pejabat.foto}
                                                        alt={pejabat.nama}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-purple-400 text-xl">
                                                        👤
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-900">{pejabat.nama}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{pejabat.jabatan}</td>
                                        <td className="px-6 py-4 text-xs text-gray-600 font-mono">{pejabat.nip || '-'}</td>
                                        <td className="px-6 py-4 text-xs text-gray-600">
                                            {pejabat.email && <div>{pejabat.email}</div>}
                                            {pejabat.telepon && <div>{pejabat.telepon}</div>}
                                            {!pejabat.email && !pejabat.telepon && '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {pejabat.status === 1 ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ Aktif
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    ✗ Nonaktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/pejabat/${pejabat.id}/edit`}
                                                    className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <form action={`/api/admin/pejabat/${pejabat.id}`} method="POST">
                                                    <input type="hidden" name="_method" value="DELETE" />
                                                    <button
                                                        type="submit"
                                                        onClick={(e) => {
                                                            if (!confirm('Yakin ingin menghapus pejabat ini?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                                                    >
                                                        🗑️
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Cards - Mobile */}
            <div className="md:hidden space-y-4">
                {pejabatList.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
                        <span className="text-4xl">👥</span>
                        <p className="font-medium text-gray-900 mt-4">Belum ada pejabat</p>
                        <p className="text-sm text-gray-600 mt-2">Klik tombol "Tambah Pejabat" untuk menambahkan</p>
                    </div>
                ) : (
                    pejabatList.map((pejabat) => (
                        <div key={pejabat.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start gap-4 mb-3">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200 relative ring-2 ring-purple-100 flex-shrink-0">
                                        {pejabat.foto ? (
                                            <Image
                                                src={pejabat.foto}
                                                alt={pejabat.nama}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-purple-400 text-2xl">
                                                👤
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-purple-600">#{pejabat.urutan}</span>
                                            {pejabat.status === 1 ? (
                                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ Aktif
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    ✗ Nonaktif
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">{pejabat.nama}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{pejabat.jabatan}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm mb-3">
                                    {pejabat.nip && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 font-semibold">NIP:</span>
                                            <span className="text-gray-700 font-mono text-xs">{pejabat.nip}</span>
                                        </div>
                                    )}
                                    {pejabat.email && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <span className="text-red-600">✉️</span>
                                            <a href={`mailto:${pejabat.email}`} className="hover:text-blue-600 transition-colors truncate">
                                                {pejabat.email}
                                            </a>
                                        </div>
                                    )}
                                    {pejabat.telepon && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <span className="text-blue-600">📞</span>
                                            <a href={`tel:${pejabat.telepon}`} className="hover:text-blue-600 transition-colors">
                                                {pejabat.telepon}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-3 border-t border-gray-100">
                                    <Link
                                        href={`/admin/pejabat/${pejabat.id}/edit`}
                                        className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium text-center active:scale-95"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <form action={`/api/admin/pejabat/${pejabat.id}`} method="POST" className="flex-1">
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button
                                            type="submit"
                                            onClick={(e) => {
                                                if (!confirm('Yakin ingin menghapus pejabat ini?')) {
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
                    ))
                )}
            </div>
        </div>
    );
}

