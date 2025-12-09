import { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, ArrowRight, Clock, FileText } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Layanan Retribusi Daerah - BPKPAD',
    description:
        'Layanan pembayaran dan pengurusan retribusi daerah oleh BPKPAD.',
};

interface Layanan {
    id: number;
    kategori: string;
    judul: string;
    deskripsi: string | null;
    biaya: string | null;
    waktu_penyelesaian: string | null;
}

async function getLayanan(): Promise<Layanan[]> {
    try {
        return await prisma.layanan.findMany({
            where: {
                kategori: 'retribusi',
                status: 1,
            },
            orderBy: { judul: 'asc' },
        });
    } catch (error) {
        console.error('Error fetching layanan:', error);
        return [];
    }
}

export default async function RetribusiPage() {
    const layanan = await getLayanan();

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Layanan Retribusi Daerah
                        </h1>
                    </div>
                    <p className="text-xl text-blue-100 max-w-3xl">
                        Layanan pembayaran dan pengurusan retribusi daerah untuk kemudahan
                        masyarakat.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {layanan.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {layanan.map((item) => (
                            <Link
                                key={item.id}
                                href={`/layanan/${item.id}`}
                                className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {item.judul}
                                    </h3>
                                    {item.deskripsi && (
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                            {item.deskripsi}
                                        </p>
                                    )}
                                    <div className="space-y-2 mb-4">
                                        {item.biaya && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <DollarSign className="w-4 h-4 text-green-600" />
                                                <span>{item.biaya}</span>
                                            </div>
                                        )}
                                        {item.waktu_penyelesaian && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span>{item.waktu_penyelesaian}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                                        Lihat Detail
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <DollarSign className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            Belum Ada Layanan Retribusi
                        </h3>
                        <p className="text-slate-600">
                            Saat ini belum ada layanan retribusi yang tersedia.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
