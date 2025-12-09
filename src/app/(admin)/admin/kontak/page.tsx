import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import DeleteButtonGeneric from '@/components/admin/DeleteButtonGeneric';

export const dynamic = 'force-dynamic';

async function getKontakList() {
    const kontak = await prisma.kontak.findMany({
        orderBy: { urutan: 'asc' },
    });

    return kontak;
}

export default async function KontakAdminPage() {
    const kontak = await getKontakList();

    // Stats
    const stats = {
        total: kontak.length,
        kantor: kontak.filter(k => k.kategori === 'kantor').length,
        bidang: kontak.filter(k => k.kategori === 'bidang').length,
        layanan: kontak.filter(k => k.kategori === 'layanan').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Kontak
                    </h1>
                    <p className="text-gray-600 mt-1">Kelola informasi kontak BPKPAD</p>
                </div>
                <Link
                    href="/admin/kontak/new"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                >
                    + Tambah Kontak
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 border-l-4 border-blue-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Kontak</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                            📞
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-green-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Kantor</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.kantor}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                            🏢
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Bidang</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.bidang}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                            👥
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-orange-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Layanan</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.layanan}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                            📱
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
                                <th className="px-6 py-4 text-left text-sm font-semibold">Urutan</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Jabatan</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Telepon</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {kontak.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="text-6xl mb-4">📞</div>
                                            <p className="text-lg font-medium">Belum ada data kontak</p>
                                            <p className="text-sm mt-2">Klik tombol &quot;Tambah Kontak&quot; untuk menambahkan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                kontak.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.urutan}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.nama}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.jabatan || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.kategori === 'kantor' ? 'bg-green-100 text-green-800' :
                                                item.kategori === 'bidang' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-orange-100 text-orange-800'
                                                }`}>
                                                {item.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.telepon || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.email || '-'}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/admin/kontak/${item.id}/edit`}
                                                    className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                                >
                                                    Edit
                                                </Link>
                                                <DeleteButtonGeneric
                                                    id={item.id}
                                                    endpoint="/api/admin/kontak"
                                                    itemName="kontak"
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
