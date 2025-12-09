import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButtonGeneric from '@/components/admin/DeleteButtonGeneric';

export const dynamic = 'force-dynamic';

export default async function GaleriPage() {
    const galeriList = await prisma.tbl_galery.findMany({
        orderBy: { id: 'desc' },
    });

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                         Galeri Foto
                    </h1>
                    <p className="text-gray-600 mt-2">Kelola foto dokumentasi dan kegiatan BPKPAD</p>
                </div>
                <Link
                    href="/admin/galeri/new"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Foto
                </Link>
            </div>

            {/* Stats */}
            <div className="mb-6 bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-lg w-64">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm">Total Foto</p>
                        <p className="text-4xl font-bold text-gray-800 mt-2">{galeriList.length}</p>
                    </div>
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl">
                        
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {galeriList.length === 0 ? (
                    <div className="col-span-full bg-white rounded-2xl p-16 text-center shadow-lg">
                        <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Foto</p>
                        <p className="text-gray-600">Klik tombol Tambah Foto untuk menambahkan foto baru</p>
                    </div>
                ) : (
                    galeriList.map((item) => (
                        <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100">
                            <div className="relative w-full aspect-square bg-gradient-to-br from-purple-50 to-pink-50">
                                {item.foto ? (
                                    <Image
                                        src={item.foto}
                                        alt={item.keterangan || 'Galeri'}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute top-3 right-3">
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-purple-500 text-white shadow-lg backdrop-blur-sm">
                                        #{item.id}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="mb-4">
                                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 min-h-[3.6rem]">
                                        {item.keterangan || 'Tidak ada keterangan'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                    <Link
                                        href={`/admin/galeri//edit`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold transition-all shadow-md hover:shadow-lg text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </Link>
                                    <DeleteButtonGeneric
                                        id={item.id}
                                        endpoint="/api/admin/galeri"
                                        itemName="foto"
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
