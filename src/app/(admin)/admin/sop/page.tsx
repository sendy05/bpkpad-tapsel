import { prisma } from '@/lib/db';
import Link from 'next/link';

export const metadata = {
    title: 'Kelola SOP | Admin BPKPAD',
    description: 'Kelola Standar Operasional Prosedur BPKPAD Tapanuli Selatan',
};

export const dynamic = 'force-dynamic';

export default async function SopPage() {
    const sopList = await prisma.sop_dokumen.findMany({
        orderBy: { tgl_terbit: 'desc' },
    }).catch(() => []);

    const kategoriList = [...new Set(sopList.map(s => s.kategori).filter(Boolean))];

    // Stats
    const stats = {
        total: sopList.length,
        aktif: sopList.filter(s => s.status === 1).length,
        nonaktif: sopList.filter(s => s.status === 0).length,
        dengan_file: sopList.filter(s => s.file).length,
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">SOP & Dokumen</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola standar operasional prosedur</p>
                </div>
                <Link
                    href="/admin/sop/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">➕</span>
                    <span>Tambah Dokumen</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-lg">
                            📄
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
                            📎
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.dengan_file}</div>
                            <div className="text-xs text-gray-600">File</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kategori Filter */}
            {kategoriList.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                    <span className="text-sm font-semibold text-gray-600">Kategori:</span>
                    {kategoriList.map(kat => (
                        <span key={kat} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                            {kat}
                        </span>
                    ))}
                </div>
            )}

            {/* Table - Desktop */}
            <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Judul</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nomor</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sopList.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">📄</span>
                                            <p className="font-medium">Belum ada dokumen SOP</p>
                                            <p className="text-sm">Klik tombol "Tambah Dokumen" untuk menambahkan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                sopList.map((sop) => (
                                    <tr key={sop.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-900">{sop.judul}</div>
                                            {sop.deskripsi && (
                                                <div className="text-xs text-gray-600 mt-1 line-clamp-1">{sop.deskripsi}</div>
                                            )}
                                            {sop.file && (
                                                <a href={sop.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-1">
                                                    📎 Download
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                {sop.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-600 font-mono">{sop.nomor || '-'}</td>
                                        <td className="px-6 py-4 text-xs text-gray-600">
                                            {sop.tgl_terbit ? new Date(sop.tgl_terbit).toLocaleDateString('id-ID') : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {sop.status === 1 ? (
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
                                                    href={`/admin/sop/${sop.id}/edit`}
                                                    className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <form action={`/api/admin/sop/${sop.id}`} method="POST">
                                                    <input type="hidden" name="_method" value="DELETE" />
                                                    <button
                                                        type="submit"
                                                        onClick={(e) => {
                                                            if (!confirm('Yakin ingin menghapus SOP ini?')) {
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
                {sopList.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
                        <span className="text-4xl">📄</span>
                        <p className="font-medium text-gray-900 mt-4">Belum ada dokumen SOP</p>
                        <p className="text-sm text-gray-600 mt-2">Klik tombol "Tambah Dokumen" untuk menambahkan</p>
                    </div>
                ) : (
                    sopList.map((sop) => (
                        <div key={sop.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                {sop.kategori}
                                            </span>
                                            {sop.status === 1 ? (
                                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ Aktif
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    ✗ Nonaktif
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">{sop.judul}</h3>
                                        {sop.deskripsi && (
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{sop.deskripsi}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm mb-3">
                                    {sop.nomor && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 font-semibold">Nomor:</span>
                                            <span className="text-gray-700 font-mono text-xs">{sop.nomor}</span>
                                        </div>
                                    )}
                                    {sop.tgl_terbit && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <span className="text-blue-600">📅</span>
                                            <span className="text-xs">
                                                {new Date(sop.tgl_terbit).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    )}
                                    {sop.file && (
                                        <a href={sop.file} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                            <span>📎</span>
                                            <span className="text-xs font-medium">Download File</span>
                                        </a>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-3 border-t border-gray-100">
                                    <Link
                                        href={`/admin/sop/${sop.id}/edit`}
                                        className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium text-center active:scale-95"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <form action={`/api/admin/sop/${sop.id}`} method="POST" className="flex-1">
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button
                                            type="submit"
                                            onClick={(e) => {
                                                if (!confirm('Yakin ingin menghapus SOP ini?')) {
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

