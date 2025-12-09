import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Informasi Publik - PPID',
    description: 'Pusat informasi publik BPKPAD Tapanuli Selatan sesuai UU Keterbukaan Informasi Publik',
};

async function getInformasiPublik() {
    return await prisma.informasiPublik.findMany({
        where: { status: 'Published' },
        orderBy: { tanggalPublikasi: 'desc' }
    });
}

type InformasiItem = Awaited<ReturnType<typeof getInformasiPublik>>[number];

export default async function PPIDPage() {
    const informasi = await getInformasiPublik();

    const berkala = informasi.filter((i: InformasiItem) => i.kategori === 'BERKALA');
    const sertaMerta = informasi.filter((i: InformasiItem) => i.kategori === 'SERTA_MERTA');
    const setiapSaat = informasi.filter((i: InformasiItem) => i.kategori === 'SETIAP_SAAT');

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            📂 PPID - PEJABAT PENGELOLA INFORMASI DAN DOKUMENTASI
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Informasi Publik
                        </h1>
                        <p className="text-xl text-purple-100 leading-relaxed mb-8">
                            Transparansi dan akuntabilitas pengelolaan informasi sesuai UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik
                        </p>
                    </div>
                </div>
            </section>

            {/* Kategori Tabs */}
            <section className="container mx-auto px-4 py-16">
                <div className="mb-12">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 mb-4 text-center">
                        Kategori Informasi Publik
                    </h2>
                    <p className="text-gray-600 text-center text-lg mb-8">
                        Informasi dibagi menjadi 3 kategori sesuai regulasi
                    </p>
                </div>

                {/* Informasi Berkala */}
                <div id="berkala" className="mb-16 scroll-mt-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
                            📅
                        </div>
                        <div>
                            <h3 className="text-3xl font-extrabold text-gray-800">Informasi Berkala</h3>
                            <p className="text-gray-600">Disediakan dan diperbarui secara berkala (minimal setiap 6 bulan)</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {berkala.map((item: InformasiItem) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                            {item.judul}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {item.ringkasan}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="text-xs text-gray-500">
                                        <div>📅 {new Date(item.tanggalPublikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                        <div>👤 {item.pejabatPengelola}</div>
                                    </div>
                                    {item.fileUrl && (
                                        <a
                                            href={item.fileUrl}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                                        >
                                            📥 Download
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Informasi Serta Merta */}
                <div id="serta-merta" className="mb-16 scroll-mt-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl">
                            ⚡
                        </div>
                        <div>
                            <h3 className="text-3xl font-extrabold text-gray-800">Informasi Serta Merta</h3>
                            <p className="text-gray-600">Wajib diumumkan segera karena mengancam hajat hidup orang banyak</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {sertaMerta.map((item: InformasiItem) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-red-500"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-2">
                                            URGENT
                                        </div>
                                        <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                                            {item.judul}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {item.ringkasan}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="text-xs text-gray-500">
                                        <div>📅 {new Date(item.tanggalPublikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                        <div>👤 {item.pejabatPengelola}</div>
                                    </div>
                                    {item.fileUrl && (
                                        <a
                                            href={item.fileUrl}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                                        >
                                            📥 Download
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Informasi Setiap Saat */}
                <div id="setiap-saat" className="scroll-mt-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl">
                            📊
                        </div>
                        <div>
                            <h3 className="text-3xl font-extrabold text-gray-800">Informasi Setiap Saat</h3>
                            <p className="text-gray-600">Dapat diakses oleh publik setiap saat tanpa pembatasan</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {setiapSaat.map((item: InformasiItem) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-green-500"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                                            {item.judul}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {item.ringkasan}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="text-xs text-gray-500">
                                        <div>📅 {new Date(item.tanggalPublikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                        <div>👤 {item.pejabatPengelola}</div>
                                    </div>
                                    {item.fileUrl && (
                                        <a
                                            href={item.fileUrl}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                                        >
                                            📥 Download
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cara Permohonan Informasi */}
            <section className="container mx-auto px-4 pb-16">
                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-[3rem] p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
                            Cara Mengajukan Permohonan Informasi
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="text-4xl mb-4">📝</div>
                                <h3 className="text-xl font-bold mb-2">1. Isi Formulir</h3>
                                <p className="text-purple-100">Download dan isi formulir permohonan informasi publik</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="text-4xl mb-4">📧</div>
                                <h3 className="text-xl font-bold mb-2">2. Kirim ke PPID</h3>
                                <p className="text-purple-100">Kirim via email atau datang langsung ke kantor BPKPAD</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="text-4xl mb-4">⏰</div>
                                <h3 className="text-xl font-bold mb-2">3. Tunggu Respons</h3>
                                <p className="text-purple-100">Maksimal 10 hari kerja untuk informasi biasa, segera untuk informasi mendesak</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link
                                href="/kontak"
                                className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-[1.5rem] hover:shadow-2xl transition-all hover:-translate-y-1"
                            >
                                📞 Hubungi PPID
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
