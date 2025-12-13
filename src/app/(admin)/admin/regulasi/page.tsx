import Link from 'next/link';
import { prisma } from '@/lib/db';

export const metadata = {
    title: 'Kelola Regulasi | Admin BPKPAD',
    description: 'Kelola peraturan dan regulasi daerah Tapanuli Selatan',
};

export const dynamic = 'force-dynamic';

async function getRegulasiList() {
    const regulasi = await prisma.dokumen.findMany({
        orderBy: { no_dokumen: 'desc' },
    });

    return regulasi;
}

export default async function RegulasiAdminPage() {
    const regulasi = await getRegulasiList();

    // Stats
    const stats = {
        total: regulasi.length,
        perda: regulasi.filter(r => r.jns_dokumen === 'Perda').length,
        perbup: regulasi.filter(r => r.jns_dokumen === 'Perbup').length,
        sk: regulasi.filter(r => r.jns_dokumen === 'SK').length,
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Regulasi</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola dokumen regulasi dan peraturan daerah</p>
                </div>
                <Link
                    href="/admin/regulasi/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">➕</span>
                    <span>Tambah Regulasi</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-lg">
                            📋
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
                            📄
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.perda}</div>
                            <div className="text-xs text-gray-600">Perda</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-lg">
                            📃
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.perbup}</div>
                            <div className="text-xs text-gray-600">Perbup</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-lg">
                            📜
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.sk}</div>
                            <div className="text-xs text-gray-600">SK</div>
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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No Dokumen</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Judul</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Jenis</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nomor</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tahun</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {regulasi.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">📋</span>
                                            <p className="font-medium">Belum ada regulasi</p>
                                            <p className="text-sm">Klik tombol "Tambah Regulasi" untuk menambahkan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                regulasi.map((item, index) => (
                                    <tr key={item.no_dokumen} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{index + 1}</td>
                                        <td className="px-6 py-4 text-xs text-gray-600 font-mono">{item.no_dokumen}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.judul}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                item.jns_dokumen === 'Perda' ? 'bg-green-100 text-green-800' :
                                                item.jns_dokumen === 'Perbup' ? 'bg-purple-100 text-purple-800' :
                                                'bg-orange-100 text-orange-800'
                                            }`}>
                                                {item.jns_dokumen}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.nomor || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.tahun || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/regulasi/${item.no_dokumen}/edit`}
                                                    className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <form action={`/api/admin/regulasi/${item.no_dokumen}`} method="POST">
                                                    <input type="hidden" name="_method" value="DELETE" />
                                                    <button
                                                        type="submit"
                                                        onClick={(e) => {
                                                            if (!confirm('Yakin ingin menghapus regulasi ini?')) {
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
                {regulasi.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
                        <span className="text-4xl">📋</span>
                        <p className="font-medium text-gray-900 mt-4">Belum ada regulasi</p>
                        <p className="text-sm text-gray-600 mt-2">Klik tombol "Tambah Regulasi" untuk menambahkan</p>
                    </div>
                ) : (
                    regulasi.map((item, index) => (
                        <div key={item.no_dokumen} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                item.jns_dokumen === 'Perda' ? 'bg-green-100 text-green-800' :
                                                item.jns_dokumen === 'Perbup' ? 'bg-purple-100 text-purple-800' :
                                                'bg-orange-100 text-orange-800'
                                            }`}>
                                                {item.jns_dokumen}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">{item.judul}</h3>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 font-semibold w-24">No Dokumen:</span>
                                        <span className="text-gray-700 font-mono text-xs">{item.no_dokumen}</span>
                                    </div>
                                    {item.nomor && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 font-semibold w-24">Nomor:</span>
                                            <span className="text-gray-700">{item.nomor}</span>
                                        </div>
                                    )}
                                    {item.tahun && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 font-semibold w-24">Tahun:</span>
                                            <span className="text-gray-700">{item.tahun}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-3 border-t border-gray-100">
                                    <Link
                                        href={`/admin/regulasi/${item.no_dokumen}/edit`}
                                        className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium text-center active:scale-95"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <form action={`/api/admin/regulasi/${item.no_dokumen}`} method="POST" className="flex-1">
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button
                                            type="submit"
                                            onClick={(e) => {
                                                if (!confirm('Yakin ingin menghapus regulasi ini?')) {
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

