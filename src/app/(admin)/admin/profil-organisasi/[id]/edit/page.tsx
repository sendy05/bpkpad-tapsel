import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProfilOrganisasiForm from '../../ProfilOrganisasiForm';

export default async function EditProfilOrganisasiPage({ params }: { params: { id: string } }) {
    const profil = await prisma.profil_organisasi.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!profil) {
        notFound();
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Profil Organisasi</h1>
                    <p className="text-sm text-gray-600 mt-1">Update informasi profil organisasi BPKPAD</p>
                </div>

                <ProfilOrganisasiForm profil={profil} />
            </div>
        </div>
    );
}
