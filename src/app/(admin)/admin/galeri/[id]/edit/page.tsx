import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import GaleriForm from '../../GaleriForm';

async function getGaleri(id: string) {
    const galeri = await prisma.tbl_galery.findUnique({
        where: { id: parseInt(id) },
    });

    if (!galeri) {
        notFound();
    }

    return galeri;
}

export default async function EditGaleriPage({ params }: { params: { id: string } }) {
    const galeri = await getGaleri(params.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Edit Foto
                </h1>
                <p className="text-gray-600 mt-1">Update foto dokumentasi dan kegiatan BPKPAD</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <GaleriForm data={galeri} />
            </div>
        </div>
    );
}
