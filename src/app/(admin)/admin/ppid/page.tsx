import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function InformasiPublikPage() {
    const informasiList = await prisma.informasiPublik.findMany({
        orderBy: { tanggalPublikasi: 'desc' }
    });

    const getKategoriLabel = (kategori: string) => {
        switch (kategori) {
            case 'BERKALA': return { label: 'Berkala', color: 'bg-blue-100 text-blue-700' };
            case 'SERTA_MERTA': return { label: 'Serta Merta', color: 'bg-red-100 text-red-700' };
            case 'SETIAP_SAAT': return { label: 'Setiap Saat', color: 'bg-green-100 text-green-700' };
            default: return { label: kategori, color: 'bg-gray-100 text-gray-700' };
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Published': return 'bg-green-100 text-green-700';
            case 'Draft': return 'bg-yellow-100 text-yellow-700';
            case 'Archived': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">📂 PPID - Informasi Publik</h1>
                    <p className="text-gray-600 mt-1">Kelola informasi publik sesuai UU Keterbukaan Informasi</p>
                </div>
                <Link
                    href="/admin/ppid/new"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                    ➕ Tambah Informasi
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
                    <div className="text-sm text-gray-600">Berkala</div>
                    <div className="text-2xl font-bold text-blue-600">
                        {informasiList.filter(i => i.kategori === 'BERKALA').length}
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
                    <div className="text-sm text-gray-600">Serta Merta</div>
                    <div className="text-2xl font-bold text-red-600">
                        {informasiList.filter(i => i.kategori === 'SERTA_MERTA').length}
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
                    <div className="text-sm text-gray-600">Setiap Saat</div>
                    <div className="text-2xl font-bold text-green-600">
                        {informasiList.filter(i => i.kategori === 'SETIAP_SAAT').length}
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500">
                    <div className="text-sm text-gray-600">Published</div>
                    <div className="text-2xl font-bold text-purple-600">
                        {informasiList.filter(i => i.status === 'Published').length}
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
