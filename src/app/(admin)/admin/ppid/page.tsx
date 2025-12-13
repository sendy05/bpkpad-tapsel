import { prisma } from '@/lib/db';
import Link from 'next/link';

export const metadata = {
    title: 'Kelola PPID | Admin BPKPAD',
    description: 'Kelola informasi publik PPID BPKPAD Tapanuli Selatan',
};

export const dynamic = 'force-dynamic';

export default async function InformasiPublikPage() {
    const informasiList = await prisma.informasiPublik.findMany({
        orderBy: { tanggalPublikasi: 'desc' }
    });

    const getKategoriLabel = (kategori: string) => {
        switch (kategori) {
            case 'BERKALA': return { label: 'Berkala', color: 'bg-blue-100 text-blue-800' };
            case 'SERTA_MERTA': return { label: 'Serta Merta', color: 'bg-red-100 text-red-800' };
            case 'SETIAP_SAAT': return { label: 'Setiap Saat', color: 'bg-green-100 text-green-800' };
            default: return { label: kategori, color: 'bg-gray-100 text-gray-800' };
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Published': return 'bg-green-100 text-green-800';
            case 'Draft': return 'bg-yellow-100 text-yellow-800';
            case 'Archived': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">PPID - Informasi Publik</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola informasi publik UU Keterbukaan Informasi</p>
                </div>
                <Link
                    href="/admin/ppid/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">➕</span>
                    <span>Tambah Informasi</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg">
                            📅
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">
                                {informasiList.filter(i => i.kategori === 'BERKALA').length}
                            </div>
                            <div className="text-xs text-gray-600">Berkala</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-lg">
                            ⚡
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">
                                {informasiList.filter(i => i.kategori === 'SERTA_MERTA').length}
                            </div>
                            <div className="text-xs text-gray-600">Serta Merta</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-lg">
                            ♻️
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">
                                {informasiList.filter(i => i.kategori === 'SETIAP_SAAT').length}
                            </div>
                            <div className="text-xs text-gray-600">Setiap Saat</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-lg">
                            ✓
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">
                                {informasiList.filter(i => i.status === 'Published').length}
                            </div>
                            <div className="text-xs text-gray-600">Published</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Judul & Kategori
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Pejabat Pengelola
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tanggal Publikasi
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {informasiList.map((item) => {
                                const kategoriInfo = getKategoriLabel(item.kategori);
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{item.judul}</div>
                                            <div className="mt-1">
                                                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${kategoriInfo.color}`}>
                                                    {kategoriInfo.label}
                                                </span>
                                            </div>
                                            {item.ringkasan && (
                                                <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                    {item.ringkasan}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {item.pejabatPengelola}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(item.tanggalPublikasi).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                                            <Link
                                                href={`/admin/ppid/${item.id}/edit`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {informasiList.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <div className="text-5xl mb-4">📂</div>
                        <p>Belum ada informasi publik</p>
                        <Link
                            href="/admin/ppid/new"
                            className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                        >
                            + Tambah Informasi Pertama
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

