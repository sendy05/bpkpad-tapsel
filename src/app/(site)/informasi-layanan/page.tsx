import Link from 'next/link';
import { documents } from '@/data/documents';
import { StructuredData } from '@/components/StructuredData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Informasi & Layanan',
    description: 'Informasi pajak dan retribusi daerah, aset daerah, download center, dan FAQ BPKPAD Kab. Tapanuli Selatan.'
};


export default function InformasiLayananPage() {
    return (
        <div className="space-y-10 pb-12">
            <StructuredData
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: [
                        {
                            '@type': 'Question',
                            name: 'Bagaimana cara membayar pajak daerah?',
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: 'Informasi cara bayar melalui bank/online akan tersedia di sini.'
                            }
                        }
                    ]
                }}
            />

            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-12 md:p-16 shadow-2xl">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/30 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/30">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-white">Layanan Publik</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">Informasi & Layanan</h1>
                    <p className="text-xl text-emerald-50 font-light max-w-2xl mx-auto">Akses mudah untuk pajak, retribusi, aset daerah, dan dokumen penting</p>
                </div>
            </div>

            {/* Pajak Daerah */}
            <section className="relative rounded-[2rem] bg-gradient-to-br from-emerald-50 to-teal-50 p-8 shadow-xl overflow-hidden" id="pajak">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzAtMS4xMDUuODk1LTIgMi0yczIgLjg5NSAyIDItLjg5NSAyLTIgMi0yLS44OTUtMi0yem0wIDI0YzAtMS4xMDUuODk1LTIgMi0yczIgLjg5NSAyIDItLjg5NSAyLTIgMi0yLS44OTUtMi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg text-3xl">
                            💰
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-700">Informasi Pajak Daerah</h2>
                            <p className="text-emerald-600 font-medium">Jenis pajak, cara pembayaran, dan formulir</p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        {['Pajak Hotel', 'Pajak Restoran', 'Pajak Hiburan', 'PBB-P2'].map((item, i) => (
                            <div
                                key={item}
                                className="group relative rounded-2xl bg-white border-2 border-emerald-100 p-5 hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="text-2xl mb-2">📊</div>
                                <p className="font-bold text-gray-900">{item}</p>
                                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid 2 Columns */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Retribusi */}
                <section className="group relative rounded-[2rem] bg-white border-2 border-blue-100 p-8 shadow-lg hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all" id="retribusi">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                        🎫
                    </div>
                    <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-3">Retribusi Daerah</h2>
                    <p className="leading-relaxed text-gray-700">Jenis retribusi dan ketentuan pembayaran untuk berbagai layanan publik.</p>
                </section>

                {/* Aset */}
                <section className="group relative rounded-[2rem] bg-white border-2 border-purple-100 p-8 shadow-lg hover:shadow-2xl hover:border-purple-300 hover:-translate-y-1 transition-all" id="aset">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                        🏛️
                    </div>
                    <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">Aset Daerah</h2>
                    <p className="leading-relaxed text-gray-700">Pengelolaan barang milik daerah dan aset tetap pemerintah.</p>
                </section>
            </div>

            {/* Download Center */}
            <section className="relative rounded-[2rem] bg-gradient-to-br from-indigo-50 to-blue-50 p-8 shadow-xl" id="download">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg text-3xl">
                        📥
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-700">Download Center</h2>
                        <p className="text-indigo-600 font-medium">Dokumen dan formulir penting</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {documents.map((doc, i) => (
                        <div
                            key={doc.id}
                            className="group flex items-center gap-4 p-5 rounded-2xl bg-white border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <Link href={doc.file_url} className="font-bold text-gray-900 hover:text-indigo-600 transition-colors block truncate">
                                    {doc.judul}
                                </Link>
                                <p className="text-sm text-gray-600">{doc.tipe}{doc.ukuran ? ` • ${doc.ukuran}` : ''}</p>
                            </div>
                            <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="relative rounded-[2rem] bg-white border-2 border-gray-100 p-8 shadow-xl" id="faq">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg text-3xl">
                        ❓
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-700">FAQ</h2>
                        <p className="text-amber-600 font-medium">Pertanyaan yang sering ditanyakan</p>
                    </div>
                </div>

                <details className="group p-6 rounded-2xl border-2 border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-amber-50">
                    <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
                        <span>Bagaimana cara membayar pajak daerah?</span>
                        <svg className="w-5 h-5 text-amber-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <p className="mt-4 text-gray-700 leading-relaxed pl-4 border-l-4 border-amber-300">
                        Informasi cara bayar melalui bank/online akan tersedia di sini. Anda dapat melakukan pembayaran melalui berbagai channel yang telah disediakan.
                    </p>
                </details>
            </section>
        </div>
    );
}

