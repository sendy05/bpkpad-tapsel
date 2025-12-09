import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AgendaForm from '../../AgendaForm';

async function getAgenda(id: string) {
    const agenda = await prisma.agenda.findUnique({
        where: { id: parseInt(id) },
    });

    if (!agenda) {
        notFound();
    }

    return agenda;
}

export default async function EditAgendaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const agenda = await getAgenda(id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Edit Agenda
                </h1>
                <p className="text-gray-600 mt-1">Update agenda atau kegiatan BPKPAD</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <AgendaForm data={agenda} />
            </div>
        </div>
    );
}
