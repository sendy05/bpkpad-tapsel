import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import ProfilForm from './ProfilForm';

export const dynamic = 'force-dynamic';

export default async function ProfilOrganisasiPage() {
    const profil = await prisma.profil_organisasi.findFirst().catch(() => null);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📋 Profil Organisasi</h1>
                    <p className="text-gray-600 mt-1">Kelola visi, misi, dan tugas pokok organisasi</p>
                </div>
                <Link
                    href="/admin"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    ← Kembali
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <ProfilForm profil={profil} />
            </div>
        </div>
    );
}
