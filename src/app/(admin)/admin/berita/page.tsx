import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function BeritaListPage() {
    const beritaList = await prisma.tbl_berita.findMany({
        orderBy: { tgl_update: 'desc' },
    });

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">?? Manajemen Berita</h1>
                    <p className="text-gray-600 mt-1">Kelola artikel dan berita website</p>
                </div>
                <Link
                    href="/admin/berita/new"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Berita Baru
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Foto</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Judul</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Statistik</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {beritaList.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-lg font-semibold">Belum ada berita</p>
                                            <p className="text-sm">Klik tombol "Tambah Berita Baru" untuk membuat berita pertama</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                beritaList.map((item) => (
                                    <tr key={item.id_berita} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            {item.foto ? (
                                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 relative">
                                                    <Image
                                                        src={item.foto}
                                                        alt={item.judul || 'Berita'}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-md">
                                                <div className="text-sm font-semibold text-gray-900 line-clamp-2">
                                                    {item.judul || '-'}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    ID: {item.id_berita}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                                                {item.kategori || 'Umum'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {item.tgl_update ? new Date(item.tgl_update).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            }) : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 text-xs">
                                                <div className="flex items-center gap-1 text-blue-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    {item.baca || 0} views
                                                </div>
                                                <div className="flex items-center gap-1 text-red-600">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                    </svg>
                                                    {item.suka || 0} likes
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/berita/${item.id_berita}/edit`}
                                                    className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <DeleteButton resource="berita" id={item.id_berita.toString()} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {beritaList.length > 0 && (
                <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                    <p>Total: <span className="font-semibold text-emerald-600">{beritaList.length}</span> berita</p>
                </div>
            )}
        </div>
    );
}

