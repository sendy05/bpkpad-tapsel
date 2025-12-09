import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButtonGeneric from '@/components/admin/DeleteButtonGeneric';

export const dynamic = 'force-dynamic';

export default async function PejabatPage() {
    const pejabatList = await prisma.pejabat.findMany({
        orderBy: { urutan: 'asc' },
    }).catch(() => []);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">👥 Pejabat Struktural</h1>
                    <p className="text-gray-600 mt-1">Kelola data pejabat dan struktur organisasi</p>
                </div>
                <Link
                    href="/admin/pejabat/new"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Pejabat
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Urutan</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Foto</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Jabatan</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">NIP</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Kontak</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pejabatList.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <p className="text-lg font-semibold">Belum ada pejabat</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                pejabatList.map((pejabat) => (
                                    <tr key={pejabat.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold">
                                                {pejabat.urutan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200 relative">
                                                {pejabat.foto ? (
                                                    <Image
                                                        src={pejabat.foto}
                                                        alt={pejabat.nama}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{pejabat.nama}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-700">{pejabat.jabatan}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 font-mono">{pejabat.nip || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm space-y-1">
                                                {pejabat.email && (
                                                    <div className="text-gray-600">{pejabat.email}</div>
                                                )}
                                                {pejabat.telepon && (
                                                    <div className="text-gray-600">{pejabat.telepon}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {pejabat.status === 1 ? (
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
                                                    href={`/admin/pejabat/${pejabat.id}/edit`}
                                                    className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <DeleteButtonGeneric
                                                    id={pejabat.id}
                                                    endpoint="/api/admin/pejabat"
                                                    itemName="pejabat"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {pejabatList.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Total: <span className="font-semibold text-gray-900">{pejabatList.length}</span> pejabat
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
