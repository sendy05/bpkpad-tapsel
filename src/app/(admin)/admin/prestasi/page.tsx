import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButtonGeneric from '@/components/admin/DeleteButtonGeneric';

export const dynamic = 'force-dynamic';

export default async function PrestasiPage() {
    const prestasiList = await prisma.prestasi_organisasi.findMany({
        orderBy: { tanggal: 'desc' },
    }).catch(() => []);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">🏆 Prestasi & Penghargaan</h1>
                    <p className="text-gray-600 mt-1">Kelola prestasi dan penghargaan organisasi</p>
                </div>
                <Link
                    href="/admin/prestasi/new"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Prestasi
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {prestasiList.length === 0 ? (
                    <div className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-3">
                            <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <p className="text-lg font-semibold">Belum ada prestasi</p>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {prestasiList.map((prestasi) => (
                            <div key={prestasi.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* Photo */}
                                    {prestasi.foto && (
                                        <div className="relative flex-shrink-0 w-full md:w-48 h-48 rounded-xl overflow-hidden ring-4 ring-yellow-100">
                                            <Image
                                                src={prestasi.foto}
                                                alt={prestasi.judul}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex-1">
                                                {prestasi.kategori && (
                                                    <span className="inline-block bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                                                        {prestasi.kategori}
                                                    </span>
                                                )}
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{prestasi.judul}</h3>
                                            </div>
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {prestasi.deskripsi && (
                                            <p className="text-gray-700 leading-relaxed mb-3">{prestasi.deskripsi}</p>
                                        )}

                                        <div className="flex flex-wrap gap-4 text-sm mb-4">
                                            {prestasi.pemberi && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span className="font-medium">{prestasi.pemberi}</span>
                                                </div>
                                            )}
                                            {prestasi.tanggal && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>{new Date(prestasi.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/prestasi/${prestasi.id}/edit`}
                                                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <DeleteButtonGeneric
                                                id={prestasi.id}
                                                endpoint="/api/admin/prestasi"
                                                itemName="prestasi"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {prestasiList.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Total: <span className="font-semibold text-gray-900">{prestasiList.length}</span> prestasi
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
