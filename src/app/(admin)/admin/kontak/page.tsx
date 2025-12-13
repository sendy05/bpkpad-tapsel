import Link from 'next/link';
import { prisma } from '@/lib/db';

export const metadata = {
    title: 'Kelola Kontak | Admin BPKPAD',
    description: 'Kelola informasi kontak BPKPAD Tapanuli Selatan',
};

export const dynamic = 'force-dynamic';

export default async function KontakPage() {
    const kontak = await prisma.kontak.findMany({
        orderBy: { urutan: 'asc' },
    });

    // Stats
    const stats = {
        total: kontak.length,
        kantor: kontak.filter(k => k.kategori === 'kantor').length,
        bidang: kontak.filter(k => k.kategori === 'bidang').length,
        layanan: kontak.filter(k => k.kategori === 'layanan').length,
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manajemen Kontak</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola informasi kontak BPKPAD</p>
                </div>
                <Link
                    href="/admin/kontak/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">➕</span>
                    <span>Tambah Kontak</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-lg">
                            📞
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
                            🏢
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.kantor}</div>
                            <div className="text-xs text-gray-600">Kantor</div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-lg">
                            👥
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.bidang}</div>
                            <div className="text-xs text-gray-600">Bidang</div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-lg">
                            📱
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.layanan}</div>
                            <div className="text-xs text-gray-600">Layanan</div>
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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Jabatan</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Telepon</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {kontak.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">📭</span>
                                            <p className="font-medium">Belum ada kontak</p>
                                            <p className="text-sm">Klik tombol "Tambah Kontak" untuk menambahkan kontak baru</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                kontak.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.urutan}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-900">{item.nama}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.jabatan || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                item.kategori === 'kantor' ? 'bg-green-100 text-green-800' :
                                                item.kategori === 'bidang' ? 'bg-purple-100 text-purple-800' :
                                                'bg-orange-100 text-orange-800'
                                            }`}>
                                                {item.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.telepon || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.email || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/kontak/${item.id}/edit`}
                                                    className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <form action={`/api/admin/kontak/${item.id}`} method="POST">
                                                    <input type="hidden" name="_method" value="DELETE" />
                                                    <button
                                                        type="submit"
                                                        onClick={(e) => {
                                                            if (!confirm('Yakin ingin menghapus kontak ini?')) {
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
                {kontak.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
                        <span className="text-4xl">📭</span>
                        <p className="font-medium text-gray-900 mt-4">Belum ada kontak</p>
                        <p className="text-sm text-gray-600 mt-2">Klik tombol "Tambah Kontak" untuk menambahkan kontak baru</p>
                    </div>
                ) : (
                    kontak.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            <div className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-gray-500">#{item.urutan}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                item.kategori === 'kantor' ? 'bg-green-100 text-green-800' :
                                                item.kategori === 'bidang' ? 'bg-purple-100 text-purple-800' :
                                                'bg-orange-100 text-orange-800'
                                            }`}>
                                                {item.kategori}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">{item.nama}</h3>
                                        {item.jabatan && (
                                            <p className="text-sm text-gray-600 mt-1">{item.jabatan}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    {item.telepon && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <span className="text-blue-600">📞</span>
                                            <a href={`tel:${item.telepon}`} className="hover:text-blue-600 transition-colors">
                                                {item.telepon}
                                            </a>
                                        </div>
                                    )}
                                    {item.email && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <span className="text-red-600">✉️</span>
                                            <a href={`mailto:${item.email}`} className="hover:text-blue-600 transition-colors truncate">
                                                {item.email}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-3 border-t border-gray-100">
                                    <Link
                                        href={`/admin/kontak/${item.id}/edit`}
                                        className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium text-center active:scale-95"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <form action={`/api/admin/kontak/${item.id}`} method="POST" className="flex-1">
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button
                                            type="submit"
                                            onClick={(e) => {
                                                if (!confirm('Yakin ingin menghapus kontak ini?')) {
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

