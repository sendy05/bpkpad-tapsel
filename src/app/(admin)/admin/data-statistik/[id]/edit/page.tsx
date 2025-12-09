import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import StatistikForm from '../../StatistikForm';

async function getStatistik(id: string) {
    const statistik = await prisma.data_statistik.findUnique({
        where: { id: parseInt(id) },
    });

    if (!statistik) {
        notFound();
    }

    return statistik;
}

export default async function EditStatistikPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const statistik = await getStatistik(id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Edit Data Statistik
                </h1>
                <p className="text-gray-600 mt-1">Update data statistik pendapatan dan aset BPKPAD</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <StatistikForm data={statistik} />
            </div>
        </div>
    );
}
