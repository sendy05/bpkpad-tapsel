import { prisma } from '@/lib/db';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function SliderPage() {
    const sliders = await prisma.tbl_slider.findMany({
        orderBy: { tgl_update: 'desc' }
    });

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manajemen Slider</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola slider gambar di halaman utama website</p>
                </div>
                <Link
                    href="/admin/slider/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">➕</span>
                    <span>Tambah Slider</span>
                </Link>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xl">
                        🖼️
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{sliders.length}</div>
                        <div className="text-sm text-gray-600">Total Slider</div>
                    </div>
                </div>
            </div>

            {/* Table - Desktop */}
            <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Preview
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Keterangan
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Terakhir Update
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sliders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">📭</span>
                                            <p className="font-medium">Belum ada slider</p>
                                            <p className="text-sm">Klik tombol "Tambah Slider" untuk membuat slider baru</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                sliders.map((slider, idx) => (
                                    <tr key={slider.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                            {idx + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            {slider.foto ? (
                                                <img 
                                                    src={slider.foto} 
                                                    alt="Slider"
                                                    className="w-24 h-16 object-cover rounded-lg border border-gray-200"
                                                />
                                            ) : (
                                                <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                                                    No Image
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 line-clamp-2">
                                                {slider.keterangan || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {slider.tgl_update 
                                                ? new Date(slider.tgl_update).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })
                                                : '-'
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/slider/${slider.id}/edit`}
                                                    className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <DeleteButton resource="slider" id={slider.id.toString()} />
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
                {sliders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-4xl">📭</span>
                            <p className="font-medium text-gray-900">Belum ada slider</p>
                            <p className="text-sm text-gray-600">Klik tombol "Tambah Slider" untuk membuat slider baru</p>
                        </div>
                    </div>
                ) : (
                    sliders.map((slider, idx) => (
                        <div key={slider.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            {slider.foto && (
                                <img 
                                    src={slider.foto} 
                                    alt="Slider"
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 mb-1">Slider #{idx + 1}</div>
                                        <div className="text-sm text-gray-900 line-clamp-3">
                                            {slider.keterangan || 'Tidak ada keterangan'}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-xs text-gray-500">
                                    Update: {slider.tgl_update 
                                        ? new Date(slider.tgl_update).toLocaleDateString('id-ID', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })
                                        : '-'
                                    }
                                </div>

                                <div className="flex gap-2 pt-2 border-t border-gray-100">
                                    <Link
                                        href={`/admin/slider/${slider.id}/edit`}
                                        className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium text-center active:scale-95"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <DeleteButton 
                                        resource="slider" 
                                        id={slider.id.toString()} 
                                        className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium active:scale-95 disabled:opacity-50"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

