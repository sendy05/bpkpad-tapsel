import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const berita = await prisma.tbl_berita.findUnique({
        where: { id_berita: id }
    });

    return {
        title: berita?.judul || 'Berita',
        description: berita?.isi?.substring(0, 160).replace(/<[^>]*>/g, '') || '',
    };
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const berita = await prisma.tbl_berita.findUnique({
        where: { id_berita: id }
    });

    if (!berita) {
        notFound();
    }

    // Increment view counter
    await prisma.tbl_berita.update({
        where: { id_berita: id },
        data: { baca: berita.baca + 1 }
    });

    // Get related news
    const relatedNews = await prisma.tbl_berita.findMany({
        where: {
            id_berita: { not: id },
            kategori: berita.kategori
        },
        take: 3,
        orderBy: { tgl_update: 'desc' }
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                        <span>/</span>
                        <Link href="/berita" className="text-blue-600 hover:underline">Berita</Link>
                        <span>/</span>
                        <span className="text-gray-600">{berita.judul}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Header */}
                            <div className="p-8">
                                {berita.kategori && (
                                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-bold rounded-full mb-4">
                                        {berita.kategori}
                                    </span>
                                )}
                                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                                    {berita.judul}
                                </h1>
                                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                                    {berita.tgl_update && (
                                        <div className="flex items-center gap-2">
                                            <span>📅</span>
                                            <span>
                                                {new Date(berita.tgl_update).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <span>👁️</span>
                                        <span>{berita.baca} views</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>❤️</span>
                                        <span>{berita.suka} likes</span>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image */}
                            {berita.foto && (
                                <div className="relative h-96 bg-gray-200">
                                    <Image
                                        src={`/file/berita/${berita.foto}`}
                                        alt={berita.judul || ''}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-8">
                                <div
                                    className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: berita.isi || '' }}
                                />
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-6 bg-gray-50 border-t">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        {berita.user && <span>Penulis: {berita.user}</span>}
                                    </div>
                                    <Link
                                        href="/berita"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        ← Kembali ke Berita
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Related News */}
                        {relatedNews.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Berita Terkait</h3>
                                <div className="space-y-4">
                                    {relatedNews.map((related) => (
                                        <Link
                                            key={related.id_berita}
                                            href={`/berita/${related.id_berita}`}
                                            className="block group"
                                        >
                                            <div className="flex gap-3">
                                                {related.foto && (
                                                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                                        <Image
                                                            src={`/file/berita/${related.foto}`}
                                                            alt={related.judul || ''}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                        {related.judul}
                                                    </h4>
                                                    {related.tgl_update && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(related.tgl_update).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
