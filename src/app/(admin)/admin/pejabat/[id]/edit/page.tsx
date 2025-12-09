import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PejabatForm from '../../PejabatForm';

export default async function EditPejabatPage({ params }: { params: { id: string } }) {
    // const session = await auth();
    // if (!session) redirect('/admin/login');

    const pejabat = await prisma.pejabat.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!pejabat) notFound();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <a
                        href="/admin/pejabat"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke List
                    </a>
                    <h1 className="text-3xl font-extrabold text-gray-900">Edit Pejabat</h1>
                    <p className="text-gray-600 mt-1">Update data pejabat struktural</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    <PejabatForm pejabat={pejabat} />
                </div>
            </div>
        </div>
    );
}
