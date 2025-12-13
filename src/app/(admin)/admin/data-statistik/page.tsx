import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export const metadata = {
    title: 'Kelola Data Statistik | Admin BPKPAD',
    description: 'Kelola data statistik pajak, retribusi, aset dan pendapatan daerah',
};

export const dynamic = 'force-dynamic';

async function getStatistikList() {
    const statistik = await prisma.data_statistik.findMany({
        orderBy: [
            { tahun: 'desc' },
            { bulan: 'desc' },
        ],
    });

    return statistik;
}

export default async function StatistikAdminPage() {
    const statistik = await getStatistikList();

    // Stats
    const stats = {
        total: statistik.length,
        pajak: statistik.filter((s: any) => s.kategori === 'pajak').length,
        retribusi: statistik.filter((s: any) => s.kategori === 'retribusi').length,
        aset: statistik.filter((s: any) => s.kategori === 'aset').length,
        pendapatan: statistik.filter((s: any) => s.kategori === 'pendapatan').length,
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Data Statistik</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola data statistik pendapatan dan aset BPKPAD</p>
                </div>
                <Link
                    href="/admin/data-statistik/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">➕</span>
                    <span>Tambah Data</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg">
                            📊
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
                            💰
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.pajak}</div>
                            <div className="text-xs text-gray-600">Pajak</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-lg">
                            💵
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.retribusi}</div>
                            <div className="text-xs text-gray-600">Retribusi</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-lg">
                            🏢
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.aset}</div>
                            <div className="text-xs text-gray-600">Aset</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-lg">
                            📈
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.pendapatan}</div>
                            <div className="text-xs text-gray-600">Pendapatan</div>
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
                                <th className="px-6 py-4 text-left text-sm font-semibold">Judul</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Periode</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold">Nilai</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Satuan</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {statistik.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="text-6xl mb-4">📊</div>
                                            <p className="text-lg font-medium">Belum ada data statistik</p>
                                            <p className="text-sm mt-2">Klik tombol &quot;Tambah Data&quot; untuk menambahkan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                statistik.map((item: any, index: number) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.judul}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.kategori === 'pajak' ? 'bg-green-100 text-green-800' :
                                                item.kategori === 'retribusi' ? 'bg-purple-100 text-purple-800' :
                                                    item.kategori === 'aset' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-cyan-100 text-cyan-800'
                                                }`}>
                                                {item.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.periode || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-right font-semibold">
                                            {item.nilai ? new Intl.NumberFormat('id-ID').format(Number(item.nilai)) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.satuan || '-'}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/admin/data-statistik/${item.id}/edit`}
                                                    className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Yakin ingin menghapus data ini?')) {
                                                            fetch(`/api/admin/data-statistik/${item.id}`, { method: 'DELETE' })
                                                                .then(() => window.location.reload());
                                                        }
                                                    }}
                                                    className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                                                >
                                                    Hapus
                                                </button>
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

