import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteButtonGeneric from '@/components/admin/DeleteButtonGeneric';

export const dynamic = 'force-dynamic';

export default async function SopPage() {
    const sopList = await prisma.sop_dokumen.findMany({
        orderBy: { tgl_terbit: 'desc' },
    }).catch(() => []);

    const kategoriList = [...new Set(sopList.map(s => s.kategori).filter(Boolean))];

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📄 SOP & Dokumen</h1>
                    <p className="text-gray-600 mt-1">Kelola standar operasional prosedur dan dokumen</p>
                </div>
                <Link
                    href="/admin/sop/new"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Dokumen
                </Link>
            </div>

            {kategoriList.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                    <span className="text-sm font-semibold text-gray-600">Filter:</span>
                    {kategoriList.map(kat => (
                        <span key={kat} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                            {kat}
                        </span>
                    ))}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Judul</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Nomor</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Tgl Terbit</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sopList.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-lg font-semibold">Belum ada dokumen SOP</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                sopList.map((sop) => (
                                    <tr key={sop.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{sop.judul}</div>
                                            {sop.deskripsi && (
                                                <div className="text-sm text-gray-600 mt-1 line-clamp-2">{sop.deskripsi}</div>
                                            )}
                                            {sop.file && (
                                                <a href={sop.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    Download File
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                                                {sop.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 font-mono">{sop.nomor || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {sop.tgl_terbit ? new Date(sop.tgl_terbit).toLocaleDateString('id-ID') : '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {sop.status === 1 ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                                    ✓ Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                                    ✗ Nonaktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/sop/${sop.id}/edit`}
                                                    className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <DeleteButtonGeneric
                                                    id={sop.id}
                                                    endpoint="/api/admin/sop"
                                                    itemName="SOP"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {sopList.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Total: <span className="font-semibold text-gray-900">{sopList.length}</span> dokumen
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
