import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import RegulasiForm from '../../RegulasiForm';

async function getRegulasi(no_dokumen: string) {
    const regulasi = await prisma.dokumen.findUnique({
        where: { no_dokumen },
    });

    if (!regulasi) {
        notFound();
    }

    return regulasi;
}

export default async function EditRegulasiPage({ params }: { params: { id: string } }) {
    const regulasi = await getRegulasi(params.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Edit Regulasi
                </h1>
                <p className="text-gray-600 mt-1">Update dokumen regulasi dan peraturan daerah</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <RegulasiForm data={regulasi} />
            </div>
        </div>
    );
}
