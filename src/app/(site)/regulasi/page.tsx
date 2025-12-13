import { prisma } from '@/lib/db';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Regulasi',
    description: 'Produk hukum dan regulasi BPKPAD Tapanuli Selatan',
};

async function getRegulasi() {
    return await prisma.dokumen.findMany({
        where: { status: 'Active' },
        orderBy: [
            { tahun: 'desc' },
            { nomor: 'desc' }
        ]
    });
}

type RegulasiItem = Awaited<ReturnType<typeof getRegulasi>>[number];

export default async function RegulasiPage() {
    const regulasiList = await getRegulasi();

    const perda = regulasiList.filter((r: RegulasiItem) => r.jns_dokumen === 'PERDA');
    const perbup = regulasiList.filter((r: RegulasiItem) => r.jns_dokumen === 'PERBUP');
    const sk = regulasiList.filter((r: RegulasiItem) => r.jns_dokumen === 'SK');
    const renstra = regulasiList.filter((r: RegulasiItem) => r.jns_dokumen === 'RENSTRA');
    const rkpd = regulasiList.filter((r: RegulasiItem) => r.jns_dokumen === 'RKPD');

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            ⚖️ PRODUK HUKUM
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Regulasi & Produk Hukum
                        </h1>
                        <p className="text-xl text-indigo-100 leading-relaxed mb-8">
                            Peraturan daerah, peraturan bupati, dan produk hukum lainnya yang menjadi dasar pelaksanaan tugas BPKPAD
                        </p>
                    </div>
                </div>
            </section>

            {/* Peraturan Daerah */}
            <section className="container mx-auto px-4 py-16">
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">
                            📜
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-800">Peraturan Daerah (PERDA)</h2>
                            <p className="text-gray-600">Peraturan yang dibuat oleh DPRD bersama Bupati</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {perda.map((item: RegulasiItem) => (
                            <div
                                key={item.no_dokumen}
                                className="group bg-white rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-red-500"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                                            PERDA No. {item.nomor}/{item.tahun}
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                                            {item.judul}
                                        </h3>
                                        {item.deskripsi && (
                                            <p className="text-sm text-gray-600 mb-3">
                                                {item.deskripsi}
                                            </p>
                                        )}
                                        {item.tgl_upload && (
                                            <div className="text-xs text-gray-500">
                                                📅 Upload: {new Date(item.tgl_upload).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {item.file && (
                                    <a
                                        href={`/uploads/dokumen/${item.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                                    >
                                        📥 Download Dokumen
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Peraturan Bupati */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
                            📋
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-800">Peraturan Bupati (PERBUP)</h2>
                            <p className="text-gray-600">Peraturan yang ditetapkan oleh Bupati</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {perbup.map((item: RegulasiItem) => (
                            <div
                                key={item.no_dokumen}
                                className="group bg-white rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                                            PERBUP No. {item.nomor}/{item.tahun}
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                            {item.judul}
                                        </h3>
                                        {item.deskripsi && (
                                            <p className="text-sm text-gray-600 mb-3">
                                                {item.deskripsi}
                                            </p>
                                        )}
                                        {item.tgl_upload && (
                                            <div className="text-xs text-gray-500">
                                                📅 Upload: {new Date(item.tgl_upload).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {item.file && (
                                    <a
                                        href={`/uploads/dokumen/${item.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                                    >
                                        📥 Download Dokumen
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* SK Kepala */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">
                            📄
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-800">Surat Keputusan (SK) Kepala BPKPAD</h2>
                            <p className="text-gray-600">Keputusan internal BPKPAD</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {sk.map((item: RegulasiItem) => (
                            <div
                                key={item.no_dokumen}
                                className="group bg-white rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-500"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="inline-block bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                                            SK No. {item.nomor}/{item.tahun}
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                                            {item.judul}
                                        </h3>
                                        {item.deskripsi && (
                                            <p className="text-sm text-gray-600 mb-3">
                                                {item.deskripsi}
                                            </p>
                                        )}
                                        {item.tgl_upload && (
                                            <div className="text-xs text-gray-500">
                                                📅 Upload: {new Date(item.tgl_upload).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {item.file && (
                                    <a
                                        href={`/uploads/dokumen/${item.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                                    >
                                        📥 Download Dokumen
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dokumen Perencanaan */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Renstra */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl">
                                📊
                            </div>
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-800">Rencana Strategis</h2>
                                <p className="text-gray-600 text-sm">RENSTRA BPKPAD</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {renstra.map((item: RegulasiItem) => (
                                <div
                                    key={item.no_dokumen}
                                    className="group bg-white rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-green-500"
                                >
                                    <div className="inline-block bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                                        {item.tahun}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                                        {item.judul}
                                    </h3>
                                    {item.deskripsi && (
                                        <p className="text-sm text-gray-600 mb-4">
                                            {item.deskripsi}
                                        </p>
                                    )}
                                    {item.file && (
                                        <a
                                            href={`/uploads/dokumen/${item.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                                        >
                                            📥 Download
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RKPD */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl">
                                📑
                            </div>
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-800">Rencana Kerja</h2>
                                <p className="text-gray-600 text-sm">RKPD BPKPAD</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {rkpd.map((item: RegulasiItem) => (
                                <div
                                    key={item.no_dokumen}
                                    className="group bg-white rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-amber-500"
                                >
                                    <div className="inline-block bg-amber-100 text-amber-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                                        {item.tahun}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                                        {item.judul}
                                    </h3>
                                    {item.deskripsi && (
                                        <p className="text-sm text-gray-600 mb-4">
                                            {item.deskripsi}
                                        </p>
                                    )}
                                    {item.file && (
                                        <a
                                            href={`/uploads/dokumen/${item.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                                        >
                                            📥 Download
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 pb-16">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Butuh Dokumen Lainnya?
                        </h2>
                        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                            Ajukan permohonan informasi publik melalui PPID
                        </p>
                        <Link
                            href="/ppid"
                            className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-[1.5rem] hover:shadow-2xl transition-all hover:-translate-y-1"
                        >
                            📂 Ke Halaman PPID
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

