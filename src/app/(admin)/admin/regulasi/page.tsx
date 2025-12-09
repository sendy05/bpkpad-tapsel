import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import DeleteButtonGeneric from '@/components/admin/DeleteButtonGeneric';

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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Regulasi
                    </h1>
                    <p className="text-gray-600 mt-1">Kelola dokumen regulasi dan peraturan daerah</p>
                </div>
                <Link
                    href="/admin/regulasi/new"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                >
                    + Tambah Regulasi
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 border-l-4 border-blue-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Regulasi</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                            📋
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-green-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Perda</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.perda}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                            📄
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Perbup</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.perbup}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                            📃
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-orange-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">SK & Lainnya</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.sk}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                            📜
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">No Dokumen</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Judul</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Jenis</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Nomor</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Tahun</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {regulasi.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="text-6xl mb-4">📋</div>
                                            <p className="text-lg font-medium">Belum ada data regulasi</p>
                                            <p className="text-sm mt-2">Klik tombol "Tambah Regulasi" untuk menambahkan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                regulasi.map((item, index) => (
                                    <tr key={item.no_dokumen} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.no_dokumen}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.judul}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.jns_dokumen === 'Perda' ? 'bg-green-100 text-green-800' :
                                                item.jns_dokumen === 'Perbup' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-orange-100 text-orange-800'
                                                }`}>
                                                {item.jns_dokumen}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.nomor || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.tahun || '-'}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/admin/regulasi/${item.no_dokumen}/edit`}
                                                    className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                                >
                                                    Edit
                                                </Link>
                                                <DeleteButtonGeneric
                                                    id={item.no_dokumen}
                                                    endpoint="/api/admin/regulasi"
                                                    itemName="regulasi"
                                                    className="px-3 py-1.5 text-sm rounded-lg"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
