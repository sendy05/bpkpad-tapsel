import Link from 'next/link';
import { prisma } from '@/lib/db';

export const metadata = {
    title: 'Kelola Agenda | Admin BPKPAD',
    description: 'Kelola agenda kegiatan BPKPAD Tapanuli Selatan',
};

export const dynamic = 'force-dynamic';

export default async function AgendaPage() {
    const agenda = await prisma.agenda.findMany({
        orderBy: { tanggal_mulai: 'desc' },
    });

    // Stats
    const now = new Date();
    const stats = {
        total: agenda.length,
        upcoming: agenda.filter(a => new Date(a.tanggal_mulai) > now).length,
        ongoing: agenda.filter(a => a.status === 'ongoing').length,
        completed: agenda.filter(a => a.status === 'completed').length,
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manajemen Agenda</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola agenda dan kegiatan BPKPAD</p>
                </div>
                <Link
                    href="/admin/agenda/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">➕</span>
                    <span>Tambah Agenda</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-lg">
                            📅
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.total}</div>
                            <div className="text-xs text-gray-600">Total</div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white text-lg">
                            ⏰
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.upcoming}</div>
                            <div className="text-xs text-gray-600">Upcoming</div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-lg">
                            ▶️
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.ongoing}</div>
                            <div className="text-xs text-gray-600">Ongoing</div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center text-white text-lg">
                            ✅
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{stats.completed}</div>
                            <div className="text-xs text-gray-600">Selesai</div>
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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">#</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Judul</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Lokasi</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {agenda.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">📭</span>
                                            <p className="font-medium">Belum ada agenda</p>
                                            <p className="text-sm">Klik tombol "Tambah Agenda" untuk membuat agenda baru</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                agenda.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{idx + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-900">{item.judul}</div>
                                            {item.penyelenggara && (
                                                <div className="text-xs text-gray-500 mt-1">{item.penyelenggara}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(item.tanggal_mulai).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.lokasi || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                item.kategori === 'rapat' ? 'bg-blue-100 text-blue-800' :
                                                item.kategori === 'sosialisasi' ? 'bg-purple-100 text-purple-800' :
                                                item.kategori === 'pelatihan' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {item.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                item.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                                                item.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/agenda/${item.id}/edit`}
                                                    className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <form action={`/api/admin/agenda/${item.id}`} method="POST">
                                                    <input type="hidden" name="_method" value="DELETE" />
                                                    <button
                                                        type="submit"
                                                        onClick={(e) => {
                                                            if (!confirm('Yakin ingin menghapus agenda ini?')) {
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
                {agenda.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
                        <span className="text-4xl">📭</span>
                        <p className="font-medium text-gray-900 mt-4">Belum ada agenda</p>
                        <p className="text-sm text-gray-600 mt-2">Klik tombol "Tambah Agenda" untuk membuat agenda baru</p>
                    </div>
                ) : (
                    agenda.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            <div className="p-4 space-y-3">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-1">{item.judul}</h3>
                                    {item.penyelenggara && (
                                        <p className="text-xs text-gray-500">{item.penyelenggara}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-xs text-gray-500">Tanggal:</span>
                                        <p className="font-medium text-gray-900">
                                            {new Date(item.tanggal_mulai).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500">Lokasi:</span>
                                        <p className="font-medium text-gray-900 truncate">{item.lokasi || '-'}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                        item.kategori === 'rapat' ? 'bg-blue-100 text-blue-800' :
                                        item.kategori === 'sosialisasi' ? 'bg-purple-100 text-purple-800' :
                                        item.kategori === 'pelatihan' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {item.kategori}
                                    </span>
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                        item.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                                        item.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>

                                <div className="flex gap-2 pt-3 border-t border-gray-100">
                                    <Link
                                        href={`/admin/agenda/${item.id}/edit`}
                                        className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium text-center active:scale-95"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <form action={`/api/admin/agenda/${item.id}`} method="POST" className="flex-1">
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button
                                            type="submit"
                                            onClick={(e) => {
                                                if (!confirm('Yakin ingin menghapus agenda ini?')) {
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

