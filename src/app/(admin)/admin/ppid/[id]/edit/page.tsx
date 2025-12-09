import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import InformasiPublikForm from '../../InformasiPublikForm';

export default async function EditInformasiPublikPage({ params }: { params: { id: string } }) {
    const informasi = await prisma.informasiPublik.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!informasi) {
        notFound();
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">✏️ Edit Informasi Publik</h1>
                <p className="text-gray-600 mt-1">Perbarui informasi PPID</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <InformasiPublikForm informasi={informasi} />
            </div>
        </div>
    );
}
