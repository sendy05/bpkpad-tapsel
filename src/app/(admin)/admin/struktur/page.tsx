import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButtonGeneric from '@/components/admin/DeleteButtonGeneric';

export const dynamic = 'force-dynamic';

export default async function StrukturPage() {
    const strukturList = await prisma.struktur_organisasi.findMany({
        orderBy: { tgl_update: 'desc' },
    }).catch(() => []);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">🏢 Struktur Organisasi</h1>
                    <p className="text-gray-600 mt-1">Kelola gambar struktur organisasi</p>
                </div>
                <Link
                    href="/admin/struktur/new"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Struktur
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {strukturList.length === 0 ? (
                    <div className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-3">
                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <p className="text-lg font-semibold">Belum ada struktur organisasi</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        {strukturList.map((struktur) => (
                            <div key={struktur.id} className="group relative rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 p-6 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all">
                                {/* Image */}
                                {struktur.gambar && (
                                    <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
                                        <Image
                                            src={struktur.gambar}
                                            alt="Struktur Organisasi"
                                            fill
                                            className="object-contain bg-white"
                                            unoptimized
                                        />
                                    </div>
                                )}

                                {/* Info */}
                                <div className="space-y-2 mb-4">
                                    {struktur.keterangan && (
                                        <p className="text-sm text-gray-700">{struktur.keterangan}</p>
                                    )}
                                    {struktur.tgl_update && (
                                        <p className="text-xs text-gray-500">
                                            Update: {new Date(struktur.tgl_update).toLocaleDateString('id-ID')}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/struktur/${struktur.id}/edit`}
                                        className="flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold text-center transition-colors"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <DeleteButtonGeneric
                                        id={struktur.id}
                                        endpoint="/api/admin/struktur"
                                        itemName="struktur"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {strukturList.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Total: <span className="font-semibold text-gray-900">{strukturList.length}</span> struktur
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
