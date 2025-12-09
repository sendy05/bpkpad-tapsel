import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import VideoForm from '../../VideoForm';

async function getVideo(id: string) {
    const video = await prisma.tbl_video.findUnique({
        where: { id: id },
    });

    if (!video) {
        notFound();
    }

    return video;
}

export default async function EditVideoPage({ params }: { params: { id: string } }) {
    const video = await getVideo(params.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Edit Video
                </h1>
                <p className="text-gray-600 mt-1">Update video dokumentasi dan kegiatan BPKPAD</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <VideoForm data={video} />
            </div>
        </div>
    );
}
