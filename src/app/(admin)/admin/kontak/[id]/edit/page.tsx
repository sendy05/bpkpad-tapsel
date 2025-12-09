import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import KontakForm from '../../KontakForm';

async function getKontak(id: string) {
    const kontak = await prisma.kontak.findUnique({
        where: { id: parseInt(id) },
    });

    if (!kontak) {
        notFound();
    }

    return kontak;
}

export default async function EditKontakPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const kontak = await getKontak(id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Edit Kontak
                </h1>
                <p className="text-gray-600 mt-1">Update informasi kontak BPKPAD</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <KontakForm data={kontak} />
            </div>
        </div>
    );
}
