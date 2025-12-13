import { prisma } from '@/lib/db';
import Link from 'next/link';

export const metadata = {
    title: 'Kelola Video | Admin BPKPAD',
    description: 'Kelola video kegiatan dan promosi BPKPAD Tapanuli Selatan',
};

export const dynamic = 'force-dynamic';

// Extract YouTube video ID
function getYoutubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default async function VideoPage() {
    const videos = await prisma.tbl_video.findMany({
        orderBy: { tgl_update: 'desc' },
    });

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manajemen Video</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola video YouTube untuk website</p>
                </div>
                <Link
                    href="/admin/video/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                >
                    <span className="text-lg">?</span>
                    <span>Tambah Video</span>
                </Link>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white text-xl">
                        ??
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{videos.length}</div>
                        <div className="text-sm text-gray-600">Total Video</div>
                    </div>
                </div>
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {videos.length === 0 ? (
                    <div className="col-span-full bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
                        <span className="text-6xl">??</span>
                        <p className="font-medium text-gray-900 mt-4 text-lg">Belum ada video</p>
                        <p className="text-sm text-gray-600 mt-2">Klik tombol "Tambah Video" untuk menambahkan video YouTube</p>
                    </div>
                ) : (
                    videos.map((video) => {
                        const youtubeId = getYoutubeId(video.video);
                        const thumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null;

                        return (
                            <div key={video.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                                {/* Thumbnail */}
                                <div className="relative aspect-video bg-gray-900">
                                    {thumbnail ? (
                                        <img 
                                            src={thumbnail} 
                                            alt={video.keterangan}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl">
                                            ??
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <a 
                                            href={video.video} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors text-sm"
                                        >
                                            ? Tonton
                                        </a>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
                                        {video.keterangan}
                                    </h3>
                                    
                                    <div className="text-xs text-gray-500 mb-4">
                                        {new Date(video.tgl_update).toLocaleDateString('id-ID', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                                        <Link
                                            href={`/admin/video/${video.id}/edit`}
                                            className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium text-center active:scale-95"
                                        >
                                            ?? Edit
                                        </Link>
                                        <form action={`/api/admin/video/${video.id}`} method="POST" className="flex-1">
                                            <input type="hidden" name="_method" value="DELETE" />
                                            <button
                                                type="submit"
                                                onClick={(e) => {
                                                    if (!confirm('Yakin ingin menghapus video ini?')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium active:scale-95"
                                            >
                                                ??? Hapus
                                            </button>
                                        </form>
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

