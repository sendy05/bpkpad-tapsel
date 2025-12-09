import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AplikasiForm from '@/components/admin/AplikasiForm';

async function getAplikasi(id: string) {
    const aplikasi = await prisma.tbl_aplikasi.findUnique({
        where: { id_aplikasi: parseInt(id) },
    });

    if (!aplikasi) {
        return null;
    }

    return {
        id_aplikasi: aplikasi.id_aplikasi.toString(),
        nm_aplikasi: aplikasi.nm_aplikasi || '',
        link: aplikasi.link || '',
        icon: aplikasi.icon || '',
    };
}

export default async function EditAplikasiPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const aplikasi = await getAplikasi(id);

    if (!aplikasi) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    ✏️ Edit Aplikasi
                </h1>
                <p className="text-gray-600 mt-2">Ubah informasi aplikasi <span className="font-semibold text-emerald-600">{aplikasi.nm_aplikasi}</span></p>
            </div>

            <AplikasiForm mode="edit" initialData={aplikasi} />
        </div>
    );
}
