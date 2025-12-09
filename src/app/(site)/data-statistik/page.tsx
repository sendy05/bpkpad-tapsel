import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Data & Statistik',
    description: 'Data dan Statistik Keuangan BPKPAD Kabupaten Tapanuli Selatan',
};

export default function DataStatistikPage() {
    // Sample data PAD Tapanuli Selatan
    const padData = {
        target2024: 125400000000,
        realisasi2024: 111900000000,
        persentase: 89.2
    };

    const padPerJenis = [
        { jenis: 'Pajak Daerah', target: 75000000000, realisasi: 68500000000, persentase: 91.3 },
        { jenis: 'Retribusi Daerah', target: 28000000000, realisasi: 24200000000, persentase: 86.4 },
        { jenis: 'Hasil Pengelolaan Kekayaan Daerah', target: 15400000000, realisasi: 13800000000, persentase: 89.6 },
        { jenis: 'Lain-lain PAD Yang Sah', target: 7000000000, realisasi: 5400000000, persentase: 77.1 },
    ];

    const trendPAD = [
        { tahun: 2020, target: 98000000000, realisasi: 85200000000 },
        { tahun: 2021, target: 105000000000, realisasi: 94500000000 },
        { tahun: 2022, target: 112000000000, realisasi: 103800000000 },
        { tahun: 2023, target: 118000000000, realisasi: 107400000000 },
        { tahun: 2024, target: 125400000000, realisasi: 111900000000 },
    ];

    const asetDaerah = {
        tanah: 1245,
        bangunan: 486,
        kendaraan: 324,
        peralatan: 2568,
        totalNilai: 2850000000000
    };

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Data & Statistik</h1>
                    <p className="text-xl text-emerald-50">Informasi Keuangan dan Aset Daerah Kabupaten Tapanuli Selatan</p>
                </div>
            </section>

            {/* PAD Summary Cards */}
            <section className="py-12 bg-white">
                <div className="container">
                    <h2 className="text-3xl font-bold text-neutral-800 mb-8">Pendapatan Asli Daerah (PAD) 2024</h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-blue-100">Target PAD</h3>
                            </div>
                            <div className="text-4xl font-bold mb-2">{formatRupiah(padData.target2024)}</div>
                            <div className="text-sm text-blue-100">Tahun Anggaran 2024</div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-emerald-100">Realisasi PAD</h3>
                            </div>
                            <div className="text-4xl font-bold mb-2">{formatRupiah(padData.realisasi2024)}</div>
                            <div className="text-sm text-emerald-100">Per November 2024</div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-amber-100">Persentase</h3>
                            </div>
                            <div className="text-4xl font-bold mb-2">{padData.persentase}%</div>
                            <div className="text-sm text-amber-100">Capaian Target 2024</div>
                        </div>
                    </div>

                    {/* PAD Per Jenis */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
                        <h3 className="text-2xl font-bold text-neutral-800 mb-6">Rincian PAD Per Jenis</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-neutral-200">
                                        <th className="text-left py-4 px-4 font-semibold text-neutral-700">Jenis Pendapatan</th>
                                        <th className="text-right py-4 px-4 font-semibold text-neutral-700">Target</th>
                                        <th className="text-right py-4 px-4 font-semibold text-neutral-700">Realisasi</th>
                                        <th className="text-right py-4 px-4 font-semibold text-neutral-700">%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {padPerJenis.map((item, index) => (
                                        <tr key={index} className="border-b border-neutral-100 hover:bg-emerald-50 transition-colors">
                                            <td className="py-4 px-4 font-medium text-neutral-800">{item.jenis}</td>
                                            <td className="py-4 px-4 text-right text-neutral-600">{formatRupiah(item.target)}</td>
                                            <td className="py-4 px-4 text-right text-emerald-600 font-semibold">{formatRupiah(item.realisasi)}</td>
                                            <td className="py-4 px-4 text-right">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${item.persentase >= 90 ? 'bg-green-100 text-green-700' :
                                                        item.persentase >= 80 ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                    }`}>
                                                    {item.persentase}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-neutral-300 bg-neutral-50 font-bold">
                                        <td className="py-4 px-4">TOTAL</td>
                                        <td className="py-4 px-4 text-right">{formatRupiah(padData.target2024)}</td>
                                        <td className="py-4 px-4 text-right text-emerald-600">{formatRupiah(padData.realisasi2024)}</td>
                                        <td className="py-4 px-4 text-right">{padData.persentase}%</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trend PAD */}
            <section className="py-12 bg-neutral-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-neutral-800 mb-8">Trend PAD 5 Tahun Terakhir</h2>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
                        <div className="grid md:grid-cols-5 gap-4">
                            {trendPAD.map((data, index) => (
                                <div key={data.tahun} className="text-center">
                                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-6 mb-3">
                                        <div className="text-2xl font-bold text-emerald-700 mb-2">{data.tahun}</div>
                                        <div className="space-y-2">
                                            <div>
                                                <div className="text-xs text-neutral-600 mb-1">Target</div>
                                                <div className="text-sm font-semibold text-neutral-800">{formatRupiah(data.target)}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-neutral-600 mb-1">Realisasi</div>
                                                <div className="text-sm font-semibold text-emerald-600">{formatRupiah(data.realisasi)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-semibold text-neutral-500">
                                        {((data.realisasi / data.target) * 100).toFixed(1)}% Tercapai
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Aset Daerah */}
            <section className="py-12 bg-white">
                <div className="container">
                    <h2 className="text-3xl font-bold text-neutral-800 mb-8">Data Aset Daerah</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-6 border-l-4 border-purple-500">
                            <div className="text-3xl mb-3">🏢</div>
                            <div className="text-sm text-purple-700 font-semibold mb-1">Tanah</div>
                            <div className="text-3xl font-bold text-purple-900">{formatNumber(asetDaerah.tanah)}</div>
                            <div className="text-xs text-purple-600 mt-1">Bidang</div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 border-l-4 border-blue-500">
                            <div className="text-3xl mb-3">🏛️</div>
                            <div className="text-sm text-blue-700 font-semibold mb-1">Bangunan</div>
                            <div className="text-3xl font-bold text-blue-900">{formatNumber(asetDaerah.bangunan)}</div>
                            <div className="text-xs text-blue-600 mt-1">Unit</div>
                        </div>

                        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 border-l-4 border-green-500">
                            <div className="text-3xl mb-3">🚗</div>
                            <div className="text-sm text-green-700 font-semibold mb-1">Kendaraan</div>
                            <div className="text-3xl font-bold text-green-900">{formatNumber(asetDaerah.kendaraan)}</div>
                            <div className="text-xs text-green-600 mt-1">Unit</div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-6 border-l-4 border-amber-500">
                            <div className="text-3xl mb-3">💼</div>
                            <div className="text-sm text-amber-700 font-semibold mb-1">Peralatan</div>
                            <div className="text-3xl font-bold text-amber-900">{formatNumber(asetDaerah.peralatan)}</div>
                            <div className="text-xs text-amber-600 mt-1">Item</div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white border-l-4 border-emerald-700">
                            <div className="text-3xl mb-3">💰</div>
                            <div className="text-sm text-emerald-100 font-semibold mb-1">Total Nilai</div>
                            <div className="text-2xl font-bold">{formatRupiah(asetDaerah.totalNilai)}</div>
                            <div className="text-xs text-emerald-100 mt-1">Nilai Aset</div>
                        </div>
                    </div>

                    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-emerald-900 mb-2">Informasi</h3>
                                <p className="text-neutral-700 text-sm">
                                    Data aset daerah dikelola dan diinventarisasi secara berkala oleh Bidang Aset BPKPAD.
                                    Untuk informasi lebih detail atau permintaan data spesifik, silakan hubungi kami melalui halaman kontak.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section className="py-12 bg-neutral-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-neutral-800 mb-8">Unduh Laporan</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="#" className="group bg-white rounded-xl p-6 shadow-lg border border-neutral-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-neutral-800 group-hover:text-emerald-600 transition-colors">Laporan Keuangan 2024</h3>
                                    <p className="text-sm text-neutral-600">PDF • 2.5 MB</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="#" className="group bg-white rounded-xl p-6 shadow-lg border border-neutral-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-neutral-800 group-hover:text-teal-600 transition-colors">Data Aset Daerah 2024</h3>
                                    <p className="text-sm text-neutral-600">Excel • 1.8 MB</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="#" className="group bg-white rounded-xl p-6 shadow-lg border border-neutral-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-neutral-800 group-hover:text-cyan-600 transition-colors">APBD 2025</h3>
                                    <p className="text-sm text-neutral-600">PDF • 3.2 MB</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
