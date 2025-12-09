import { Metadata } from 'next';
import Link from 'next/link';
import {
    DollarSign,
    Building2,
    MessageSquare,
    ArrowRight,
    Clock,
    FileText,
    CheckCircle,
} from 'lucide-react';

export const dynamic = 'force-dynamic';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Layanan BPKPAD - Badan Pengelolaan Keuangan dan Aset Daerah',
    description:
        'Layanan BPKPAD meliputi retribusi daerah, pengelolaan aset, dan pengaduan masyarakat.',
    keywords: [
        'layanan BPKPAD',
        'retribusi daerah',
        'pengelolaan aset',
        'pengaduan',
    ],
};

interface Layanan {
    id: number;
    kategori: string;
    judul: string;
    deskripsi: string | null;
    prosedur: string | null;
    persyaratan: string | null;
    biaya: string | null;
    waktu_penyelesaian: string | null;
    link_url: string | null;
    icon: string | null;
    status: number;
}

async function getLayanan(): Promise<Layanan[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/layanan`, {
            cache: 'no-store',
        });
        if (!response.ok) return [];
        return response.json();
    } catch (error) {
        console.error('Error fetching layanan:', error);
        return [];
    }
}

export default async function LayananPage() {
    const layanan = await getLayanan();

    const retribusiLayanan = layanan.filter((l) => l.kategori === 'retribusi');
    const asetLayanan = layanan.filter((l) => l.kategori === 'aset');
    const pengaduanLayanan = layanan.filter((l) => l.kategori === 'pengaduan');

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <Breadcrumbs />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Layanan BPKPAD
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl">
                        Kami menyediakan berbagai layanan untuk kemudahan masyarakat dalam
                        urusan retribusi daerah, pengelolaan aset, dan pengaduan.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Kategori Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Link
                        href="/layanan/retribusi"
                        className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                    >
                        <DollarSign className="w-12 h-12 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Retribusi Daerah</h2>
                        <p className="text-blue-100 mb-4">
                            {retribusiLayanan.length} layanan tersedia
                        </p>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            Lihat Layanan
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link
                        href="/layanan/aset"
                        className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                    >
                        <Building2 className="w-12 h-12 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Pengelolaan Aset</h2>
                        <p className="text-purple-100 mb-4">
                            {asetLayanan.length} layanan tersedia
                        </p>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            Lihat Layanan
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link
                        href="/layanan/pengaduan"
                        className="group bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                    >
                        <MessageSquare className="w-12 h-12 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Pengaduan</h2>
                        <p className="text-orange-100 mb-4">
                            {pengaduanLayanan.length} layanan tersedia
                        </p>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            Lihat Layanan
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>

                {/* All Services Section */}
                {layanan.length > 0 ? (
                    <div className="space-y-12">
                        {/* Retribusi */}
                        {retribusiLayanan.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <DollarSign className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">
                                            Retribusi Daerah
                                        </h2>
                                        <p className="text-slate-600">
                                            Layanan pembayaran dan pengurusan retribusi
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {retribusiLayanan.map((item) => (
                                        <LayananCard key={item.id} layanan={item} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Aset */}
                        {asetLayanan.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-purple-100 rounded-xl">
                                        <Building2 className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">
                                            Pengelolaan Aset
                                        </h2>
                                        <p className="text-slate-600">
                                            Layanan pengelolaan dan inventarisasi aset daerah
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {asetLayanan.map((item) => (
                                        <LayananCard key={item.id} layanan={item} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Pengaduan */}
                        {pengaduanLayanan.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-orange-100 rounded-xl">
                                        <MessageSquare className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">
                                            Pengaduan Masyarakat
                                        </h2>
                                        <p className="text-slate-600">
                                            Layanan penerimaan dan penanganan pengaduan
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {pengaduanLayanan.map((item) => (
                                        <LayananCard key={item.id} layanan={item} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            Belum Ada Layanan
                        </h3>
                        <p className="text-slate-600">
                            Saat ini belum ada layanan yang tersedia.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

function LayananCard({ layanan }: { layanan: Layanan }) {
    const getKategoriColor = (kategori: string) => {
        switch (kategori) {
            case 'retribusi':
                return 'from-blue-500 to-blue-600';
            case 'aset':
                return 'from-purple-500 to-purple-600';
            case 'pengaduan':
                return 'from-orange-500 to-orange-600';
            default:
                return 'from-slate-500 to-slate-600';
        }
    };

    return (
        <Link
            href={`/layanan/${layanan.id}`}
            className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
        >
            <div
                className={`h-2 bg-gradient-to-r ${getKategoriColor(
                    layanan.kategori
                )}`}
            ></div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {layanan.judul}
                </h3>
                {layanan.deskripsi && (
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {layanan.deskripsi}
                    </p>
                )}

                <div className="space-y-2 mb-4">
                    {layanan.biaya && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span>{layanan.biaya}</span>
                        </div>
                    )}
                    {layanan.waktu_penyelesaian && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>{layanan.waktu_penyelesaian}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                    Lihat Detail
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
