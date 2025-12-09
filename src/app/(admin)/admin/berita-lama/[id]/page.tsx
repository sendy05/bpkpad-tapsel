import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function DetailBeritaLamaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const berita = await prisma.tbl_berita.findUnique({
        where: { id_berita: id },
    });

    if (!berita) {
        notFound();
    }

    return (
        <div>
            <div className="mb-6">
                <Link
                    href="/admin/berita-lama"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors mb-4"
                >
                    ← Kembali ke Daftar
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mt-4">Detail Berita</h1>
                <p className="text-gray-600 mt-1">ID: {berita.id_berita}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header dengan foto */}
                {berita.foto && (
                    <div className="relative w-full h-96 bg-gray-100">
                        <Image
                            src={berita.foto}
                            alt={berita.judul || 'Berita'}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                )}

                <div className="p-8">
                    {/* Metadata */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                                {berita.kategori || 'Umum'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{berita.user || 'Admin'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{berita.tgl_update ? new Date(berita.tgl_update).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : '-'}</span>
                        </div>
                    </div>

                    {/* Judul */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {berita.judul}
                    </h2>

                    {/* Statistik */}
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="text-gray-700 font-semibold">{berita.baca} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span className="text-gray-700 font-semibold">{berita.suka} likes</span>
                        </div>
                    </div>

                    {/* Konten */}
                    <div className="prose prose-lg max-w-none">
                        <div
                            dangerouslySetInnerHTML={{ __html: berita.isi || '<p>Tidak ada konten</p>' }}
                            className="text-gray-700 leading-relaxed"
                        />
                    </div>

                    {/* Info File */}
                    {berita.foto && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Informasi File</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Tipe File:</span>
                                    <p className="font-semibold text-gray-900">{berita.type}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Ukuran File:</span>
                                    <p className="font-semibold text-gray-900">{berita.ukuran}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
