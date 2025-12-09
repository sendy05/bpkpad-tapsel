import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    DollarSign,
    Clock,
    FileText,
    CheckCircle,
    Link2,
    Building2,
    MessageSquare,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';

interface Props {
    params: {
        id: string;
    };
}

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

async function getLayanan(id: string): Promise<Layanan | null> {
    try {
        return await prisma.layanan.findUnique({
            where: { id: parseInt(id) },
        });
    } catch (error) {
        console.error('Error fetching layanan:', error);
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const layanan = await getLayanan(id);

    if (!layanan) {
        return {
            title: 'Layanan Tidak Ditemukan',
        };
    }

    return {
        title: `${layanan.judul} - Layanan BPKPAD`,
        description: layanan.deskripsi || `Detail layanan ${layanan.judul}`,
    };
}

export default async function LayananDetailPage({ params }: Props) {
    const { id } = await params;
    const layanan = await getLayanan(id);

    if (!layanan) {
        notFound();
    }

    const getKategoriIcon = (kategori: string) => {
        switch (kategori) {
            case 'retribusi':
                return <DollarSign className="w-6 h-6" />;
            case 'aset':
                return <Building2 className="w-6 h-6" />;
            case 'pengaduan':
                return <MessageSquare className="w-6 h-6" />;
            default:
                return <FileText className="w-6 h-6" />;
        }
    };

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

    const formatProsedur = (text: string) => {
        const lines = text.split('\n').filter((line) => line.trim());
        return lines.map((line, index) => {
            const match = line.match(/^(\d+)\.\s*(.+)$/);
            if (match) {
                return { number: match[1], text: match[2] };
            }
            return { number: (index + 1).toString(), text: line.trim() };
        });
    };

    const formatPersyaratan = (text: string) => {
        return text
            .split('\n')
            .filter((line) => line.trim())
            .map((line) => line.replace(/^[•\-]\s*/, '').trim());
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Hero Section */}
            <section
                className={`bg-gradient-to-r ${getKategoriColor(
                    layanan.kategori
                )} text-white py-16`}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <Link
                        href="/layanan"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Layanan
                    </Link>
                    <div className="flex items-start gap-4">
                        <div
                            className={`p-4 bg-white/10 backdrop-blur-sm rounded-2xl`}
                        >
                            {getKategoriIcon(layanan.kategori)}
                        </div>
                        <div className="flex-1">
                            <div className="mb-3">
                                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                                    {layanan.kategori.charAt(0).toUpperCase() +
                                        layanan.kategori.slice(1)}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {layanan.judul}
                            </h1>
                            {layanan.deskripsi && (
                                <p className="text-xl text-white/90 max-w-3xl">
                                    {layanan.deskripsi}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Prosedur */}
                        {layanan.prosedur && (
                            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <FileText className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Prosedur Layanan
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    {formatProsedur(layanan.prosedur).map((step, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                                {step.number}
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <p className="text-slate-700 leading-relaxed">
                                                    {step.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Persyaratan */}
                        {layanan.persyaratan && (
                            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-purple-100 rounded-xl">
                                        <CheckCircle className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Persyaratan
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {formatPersyaratan(layanan.persyaratan).map((req, index) => (
                                        <div key={index} className="flex gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-slate-700 leading-relaxed">{req}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Info Cards */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
                            <h3 className="font-bold text-slate-900 text-lg mb-4">
                                Informasi Layanan
                            </h3>

                            {layanan.biaya && (
                                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                                    <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                                    <div>
                                        <div className="text-sm font-medium text-green-900 mb-1">
                                            Biaya
                                        </div>
                                        <div className="text-green-800 font-semibold">
                                            {layanan.biaya}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {layanan.waktu_penyelesaian && (
                                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <div className="text-sm font-medium text-blue-900 mb-1">
                                            Waktu Penyelesaian
                                        </div>
                                        <div className="text-blue-800 font-semibold">
                                            {layanan.waktu_penyelesaian}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {layanan.link_url && (
                                <a
                                    href={layanan.link_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors group"
                                >
                                    <Link2 className="w-5 h-5 text-indigo-600" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-indigo-900 mb-1">
                                            Link Terkait
                                        </div>
                                        <div className="text-indigo-600 text-sm group-hover:underline">
                                            Kunjungi Link →
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>

                        {/* CTA Card */}
                        <div
                            className={`bg-gradient-to-br ${getKategoriColor(
                                layanan.kategori
                            )} text-white rounded-2xl p-6`}
                        >
                            <h3 className="font-bold text-lg mb-2">Butuh Bantuan?</h3>
                            <p className="text-white/90 text-sm mb-4">
                                Hubungi kami untuk informasi lebih lanjut tentang layanan ini.
                            </p>
                            <Link
                                href="/kontak"
                                className="inline-block bg-white text-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                            >
                                Hubungi Kami
                            </Link>
                        </div>

                        {/* Related Services */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 text-lg mb-4">
                                Layanan Lainnya
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href="/layanan/retribusi"
                                    className="block p-3 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm font-medium text-slate-900">
                                            Retribusi Daerah
                                        </span>
                                    </div>
                                </Link>
                                <Link
                                    href="/layanan/aset"
                                    className="block p-3 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Building2 className="w-5 h-5 text-purple-600" />
                                        <span className="text-sm font-medium text-slate-900">
                                            Pengelolaan Aset
                                        </span>
                                    </div>
                                </Link>
                                <Link
                                    href="/layanan/pengaduan"
                                    className="block p-3 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="w-5 h-5 text-orange-600" />
                                        <span className="text-sm font-medium text-slate-900">
                                            Pengaduan
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
