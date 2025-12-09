import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Data Statistik
                    </h1>
                    <p className="text-gray-600 mt-1">Kelola data statistik pendapatan dan aset BPKPAD</p>
                </div>
                <Link
                    href="/admin/data-statistik/new"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                >
                    + Tambah Data
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-white rounded-2xl p-6 border-l-4 border-blue-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Data</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                            📊
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-green-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Pajak</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.pajak}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                            💰
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Retribusi</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.retribusi}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                            💵
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-orange-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Aset</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.aset}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                            🏢
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-cyan-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Pendapatan</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.pendapatan}</p>
                        </div>
                        <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-2xl">
                            📈
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
                                            <p className="text-sm mt-2">Klik tombol "Tambah Data" untuk menambahkan</p>
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
