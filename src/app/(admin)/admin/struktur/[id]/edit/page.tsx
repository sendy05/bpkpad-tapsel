import { redirect, notFound } from 'next/navigation';
// Auth handled by middleware
import { prisma } from '@/lib/db';
import StrukturForm from '../../StrukturForm';

export default async function EditStrukturPage({ params }: { params: { id: string } }) {
    const struktur = await prisma.struktur_organisasi.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!struktur) notFound();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <a
                        href="/admin/struktur"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke List
                    </a>
                    <h1 className="text-3xl font-extrabold text-gray-900">Edit Struktur Organisasi</h1>
                    <p className="text-gray-600 mt-1">Update gambar struktur organisasi</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    <StrukturForm struktur={struktur} />
                </div>
            </div>
        </div>
    );
}
