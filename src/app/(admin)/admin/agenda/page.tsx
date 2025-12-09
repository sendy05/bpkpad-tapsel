import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import DeleteButtonGeneric from '@/components/admin/DeleteButtonGeneric';

export const dynamic = 'force-dynamic';

// Format tanggal Indonesia
function formatDate(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Des'];
    const d = new Date(date);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

async function getAgendaList() {
    const agenda = await prisma.agenda.findMany({
        orderBy: { tanggal_mulai: 'desc' },
    });

    return agenda;
}

export default async function AgendaAdminPage() {
    const agenda = await getAgendaList();

    // Stats
    const now = new Date();
    const stats = {
        total: agenda.length,
        upcoming: agenda.filter(a => new Date(a.tanggal_mulai) > now).length,
        ongoing: agenda.filter(a => a.status === 'ongoing').length,
        completed: agenda.filter(a => a.status === 'completed').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Agenda
                    </h1>
                    <p className="text-gray-600 mt-1">Kelola agenda dan kegiatan BPKPAD</p>
                </div>
                <Link
                    href="/admin/agenda/new"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                >
                    + Tambah Agenda
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 border-l-4 border-blue-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Agenda</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                            📅
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-yellow-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Akan Datang</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.upcoming}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">
                            ⏰
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-green-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Sedang Berjalan</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.ongoing}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                            ▶️
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-l-4 border-gray-500 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Selesai</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.completed}</p>
                        </div>
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                            ✅
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
                                <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Lokasi</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {agenda.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="text-6xl mb-4">📅</div>
                                            <p className="text-lg font-medium">Belum ada data agenda</p>
                                            <p className="text-sm mt-2">Klik tombol &quot;Tambah Agenda&quot; untuk menambahkan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                agenda.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.judul}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {formatDate(item.tanggal_mulai)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.lokasi || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.kategori === 'rapat' ? 'bg-blue-100 text-blue-800' :
                                                item.kategori === 'sosialisasi' ? 'bg-purple-100 text-purple-800' :
                                                    item.kategori === 'pelatihan' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {item.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                                                item.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/admin/agenda/${item.id}/edit`}
                                                    className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                                >
                                                    Edit
                                                </Link>
                                                <DeleteButtonGeneric
                                                    id={item.id}
                                                    endpoint="/api/admin/agenda"
                                                    itemName="agenda"
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
