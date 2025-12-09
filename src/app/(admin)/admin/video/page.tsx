import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteButtonGeneric from '@/components/admin/DeleteButtonGeneric';

export const dynamic = 'force-dynamic';

// Extract YouTube video ID
function getYoutubeEmbedUrl(url: string) {
    try {
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/)?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
        return null;
    }
}

export default async function VideoPage() {
    const videoList = await prisma.tbl_video.findMany({
        orderBy: { id: 'desc' },
    });

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                        Video
                    </h1>
                    <p className="text-gray-600 mt-2">Kelola video dokumentasi dan kegiatan BPKPAD</p>
                </div>
                <Link
                    href="/admin/video/new"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Video
                </Link>
            </div>

            {/* Stats */}
            <div className="mb-6 bg-white rounded-2xl p-6 border-l-4 border-red-500 shadow-lg w-64">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm">Total Video</p>
                        <p className="text-4xl font-bold text-gray-800 mt-2">{videoList.length}</p>
                    </div>
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-3xl">

                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoList.length === 0 ? (
                    <div className="col-span-full bg-white rounded-2xl p-16 text-center shadow-lg">
                        <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Video</p>
                        <p className="text-gray-600">Klik tombol Tambah Video untuk menambahkan video YouTube baru</p>
                    </div>
                ) : (
                    videoList.map((video) => {
                        const embedUrl = getYoutubeEmbedUrl(video.video);
                        return (
                            <div key={video.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100">
                                <div className="relative w-full aspect-video bg-gradient-to-br from-red-50 to-pink-50">
                                    {embedUrl ? (
                                        <iframe
                                            src={embedUrl}
                                            title={video.keterangan || 'Video'}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-red-500 text-white shadow-lg backdrop-blur-sm">
                                            #{video.id}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                            {video.keterangan || 'Tanpa Judul'}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 min-h-[3.6rem]">
                                            {video.keterangan || 'Tidak ada keterangan'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                        <Link
                                            href={`/admin/video//edit`}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold transition-all shadow-md hover:shadow-lg text-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </Link>
                                        <DeleteButtonGeneric
                                            id={video.id}
                                            endpoint="/api/admin/video"
                                            itemName="video"
                                            className="flex-1 py-2.5 rounded-xl shadow-md hover:shadow-lg text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
