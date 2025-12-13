import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButtonGeneric from '@/components/admin/DeleteButtonGeneric';

export const dynamic = 'force-dynamic';

export default async function AplikasiPage() {
    const aplikasiList = await prisma.tbl_aplikasi.findMany({
        orderBy: { tgl_update: 'desc' },
    });

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Aplikasi BPKPAD
                    </h1>
                    <p className="text-gray-600 mt-2">Kelola aplikasi yang ditampilkan di homepage</p>
                </div>
                <Link
                    href="/admin/aplikasi/new"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Aplikasi
                </Link>
            </div>

            {/* Stats */}
            <div className="mb-6 bg-white rounded-2xl p-6 border-l-4 border-emerald-500 shadow-lg w-64">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm">Total Aplikasi</p>
                        <p className="text-4xl font-bold text-gray-800 mt-2">{aplikasiList.length}</p>
                    </div>
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">

                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {aplikasiList.length === 0 ? (
                    <div className="col-span-full bg-white rounded-2xl p-16 text-center shadow-lg">
                        <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Aplikasi</p>
                        <p className="text-gray-600">Klik tombol Tambah Aplikasi untuk menambahkan aplikasi baru</p>
                    </div>
                ) : (
                    aplikasiList.map((app) => (
                        <div key={app.id_aplikasi} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="relative w-full aspect-square bg-gradient-to-br from-emerald-50 to-teal-50 p-8 flex items-center justify-center">
                                {app.icon ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={app.icon}
                                            alt={app.nm_aplikasi || ''}
                                            fill
                                            className="object-contain group-hover:scale-110 transition-transform duration-300 p-4"
                                            unoptimized
                                        />
                                    </div>
                                ) : (
                                    <div className="text-6xl"></div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{app.nm_aplikasi}</h3>
                                    <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded inline-block">{app.id_aplikasi}</p>
                                </div>
                                <div className="mb-4">
                                    <a
                                        href={app.link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline line-clamp-1 flex items-center gap-1"
                                    >
                                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        <span className="truncate">{app.link}</span>
                                    </a>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500 pb-4 mb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="font-medium">{app.user || 'Admin'}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{app.tgl_update ? new Date(app.tgl_update).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : '-'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/aplikasi//edit`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold transition-all shadow-md hover:shadow-lg text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </Link>
                                    <DeleteButtonGeneric
                                        id={app.id_aplikasi}
                                        endpoint="/api/admin/aplikasi"
                                        itemName="aplikasi"
                                        className="flex-1 py-2.5 rounded-xl shadow-md hover:shadow-lg text-sm"
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

