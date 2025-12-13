import { prisma } from '@/lib/db';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Jenis Pajak Daerah',
    description: 'Informasi lengkap tentang jenis pajak daerah Kabupaten Tapanuli Selatan',
};

async function getJenisPajak() {
    return await prisma.layanan.findMany({
        where: {
            kategori: 'pajak',
            status: 1
        },
        orderBy: { judul: 'asc' }
    });
}

type JenisPajakItem = Awaited<ReturnType<typeof getJenisPajak>>[number];

export default async function PajakPage() {
    const pajakList = await getJenisPajak();

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            💳 LAYANAN PAJAK DAERAH
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Jenis Pajak Daerah
                        </h1>
                        <p className="text-xl text-cyan-100 leading-relaxed mb-8">
                            Informasi lengkap tentang jenis pajak daerah, tarif, dasar hukum, dan cara pembayaran
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid md:grid-cols-3 gap-6">
                    <Link href="/layanan/pajak/e-billing" className="group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl">
                                💳
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg group-hover:text-green-600 transition-colors">e-Billing</h3>
                                <p className="text-sm text-gray-600">Bayar Pajak Online</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/layanan/pajak/cek-tagihan" className="group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
                                🔍
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">Cek Tagihan</h3>
                                <p className="text-sm text-gray-600">Periksa Kewajiban</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/layanan/formulir" className="group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl">
                                📥
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg group-hover:text-amber-600 transition-colors">Download</h3>
                                <p className="text-sm text-gray-600">Formulir Pajak</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Jenis Pajak */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 mb-4">
                        Jenis Pajak Daerah
                    </h2>
                    <p className="text-gray-600 text-lg">Klik untuk melihat detail tarif dan cara pembayaran</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {pajakList.map((pajak: JenisPajakItem) => (
                        <div
                            key={pajak.id}
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-6">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="relative">
                                    {pajak.icon && (
                                        <div className="text-4xl mb-3">{pajak.icon}</div>
                                    )}
                                    <h3 className="text-2xl font-extrabold text-white mb-2">
                                        {pajak.judul}
                                    </h3>
                                    {pajak.deskripsi && (
                                        <p className="text-cyan-100 text-sm">
                                            {pajak.deskripsi}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Biaya/Tarif */}
                                {pajak.biaya && (
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border-l-4 border-amber-500">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl">💰</div>
                                            <div>
                                                <div className="text-xs font-semibold text-amber-600 mb-1">BIAYA/TARIF</div>
                                                <div className="font-bold text-gray-800">{pajak.biaya}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Persyaratan */}
                                {pajak.persyaratan && (
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border-l-4 border-purple-500">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl">📋</div>
                                            <div className="flex-1">
                                                <div className="text-xs font-semibold text-purple-600 mb-1">PERSYARATAN</div>
                                                <div className="text-sm text-gray-700 whitespace-pre-line">{pajak.persyaratan}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Prosedur */}
                                {pajak.prosedur && (
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border-l-4 border-blue-500">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl">📝</div>
                                            <div className="flex-1">
                                                <div className="text-xs font-semibold text-blue-600 mb-1">PROSEDUR</div>
                                                <div className="text-sm text-gray-700 whitespace-pre-line">{pajak.prosedur}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Waktu Penyelesaian */}
                                {pajak.waktu_penyelesaian && (
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border-l-4 border-green-500">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl">⏱️</div>
                                            <div>
                                                <div className="text-xs font-semibold text-green-600 mb-1">WAKTU PENYELESAIAN</div>
                                                <div className="text-sm font-bold text-gray-800">{pajak.waktu_penyelesaian}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Link/Button */}
                                {pajak.link_url && (
                                    <div className="pt-4 border-t border-gray-200">
                                        <a
                                            href={pajak.link_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                                        >
                                            📥 Download Formulir
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 pb-16">
                <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Butuh Bantuan Pembayaran Pajak?
                        </h2>
                        <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
                            Tim kami siap membantu Anda dalam proses pembayaran dan konsultasi pajak daerah
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/kontak"
                                className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-[1.5rem] hover:shadow-2xl transition-all hover:-translate-y-1"
                            >
                                📞 Hubungi Kami
                            </Link>
                            <Link
                                href="/layanan/pengaduan"
                                className="inline-block px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-[1.5rem] border-2 border-white hover:bg-white/30 transition-all"
                            >
                                📝 Sampaikan Pengaduan
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

