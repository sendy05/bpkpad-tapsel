import { prisma } from '@/lib/db';
import Link from 'next/link';
import ProfilForm from './ProfilForm';

export const metadata = {
    title: 'Profil Organisasi | Admin BPKPAD',
    description: 'Kelola visi, misi, sejarah dan tugas pokok BPKPAD Tapanuli Selatan',
};

export const dynamic = 'force-dynamic';

export default async function ProfilOrganisasiPage() {
    const profil = await prisma.profil_organisasi.findFirst().catch(() => null);

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profil Organisasi</h1>
                        <p className="text-sm text-gray-600 mt-1">Kelola visi, misi, sejarah dan tugas pokok BPKPAD</p>
                    </div>
                    <Link
                        href="/admin"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 active:scale-95 font-medium"
                    >
                        <span>←</span>
                        <span>Kembali</span>
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-6 lg:p-8">
                    <ProfilForm profil={profil} />
                </div>
            </div>
        </div>
    );
}

