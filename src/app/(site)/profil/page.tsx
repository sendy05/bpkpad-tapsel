import Image from 'next/image';
import { orgUnits } from '@/data/orgUnits';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';export const metadata: Metadata = {
    title: 'Profil BPKPAD',
    description: 'Visi, misi, sejarah, tupoksi, struktur organisasi, dan profil pejabat BPKPAD Kab. Tapanuli Selatan.'
};

export default async function ProfilPage() {
    // Fetch data from database
    const profil = await prisma.profil_organisasi.findFirst();
    const struktur = await prisma.struktur_organisasi.findFirst();
    const pejabatList = await prisma.pejabat.findMany({
        where: { status: 1 },
        orderBy: { urutan: 'asc' }
    });
    const sopList = await prisma.sop_dokumen.findMany({
        where: { status: 1 },
        orderBy: { tgl_terbit: 'desc' }
    });
    const prestasiList = await prisma.prestasi_organisasi.findMany({
        orderBy: { tanggal: 'desc' }
    });

    const kepala = pejabatList[0];

    return (
        <div className="space-y-10 pb-12">
            {/* Hero Header with Animated Gradient */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-8 md:p-16 shadow-2xl">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/30">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-white">Pemerintahan Berkualitas</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
                        Profil BPKPAD
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-50 font-light leading-relaxed max-w-2xl">
                        Badan Pengelola Keuangan dan Aset Daerah<br />
                        <span className="font-semibold">Kabupaten Tapanuli Selatan</span>
                    </p>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {[
                            { label: 'Transparansi', icon: '🔍', value: '100%' },
                            { label: 'Akuntabel', icon: '✓', value: 'A+' },
                            { label: 'Profesional', icon: '⭐', value: 'Terbaik' },
                            { label: 'Inovatif', icon: '💡', value: '2025' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-blue-100">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Visi Misi - Modern Cards */}
            <section className="relative scroll-mt-24" id="visi-misi">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 mb-3">
                        Visi & Misi
                    </h2>
                    <p className="text-gray-600 text-lg">Arah dan tujuan kami untuk melayani</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Visi Card */}
                    <div className="group relative rounded-[2rem] bg-gradient-to-br from-blue-500 to-cyan-500 p-[2px] shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="relative rounded-[2rem] bg-white p-8 h-full">
                            <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                                VISI
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 pr-20">Masa Depan Cerah</h3>
                            <div className="text-base leading-relaxed text-gray-700 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: profil?.visi || 'Belum ada visi' }} />
                        </div>
                    </div>

                    {/* Misi Card */}
                    <div className="group relative rounded-[2rem] bg-gradient-to-br from-cyan-500 to-blue-500 p-[2px] shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="relative rounded-[2rem] bg-white p-8 h-full">
                            <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                                MISI
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 pr-20">Langkah Strategis</h3>
                            <div className="text-base leading-relaxed text-gray-700 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: profil?.misi || 'Belum ada misi' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sejarah - Glass Card */}
            <section className="relative rounded-[2rem] bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 p-8 md:p-10 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzAtMS4xMDUuODk1LTIgMi0yczIgLjg5NSAyIDItLjg5NSAyLTIgMi0yLS44OTUtMi0yem0wIDI0YzAtMS4xMDUuODk1LTIgMi0yczIgLjg5NSAyIDItLjg5NSAyLTIgMi0yLS44OTUtMi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">Sejarah Singkat</h2>
                            <p className="text-blue-600 font-medium">Perjalanan menuju tata kelola profesional</p>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-inner">
                        <div className="text-lg text-gray-800 leading-relaxed prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: profil?.sejarah || 'Belum ada sejarah' }} />
                    </div>
                </div>
            </section>

            {/* Tupoksi - Icon Cards */}
            <section className="relative">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 mb-3">
                        Tugas Pokok & Fungsi
                    </h2>
                    <p className="text-gray-600 text-lg">Peran kami dalam pembangunan daerah</p>
                </div>

                <div className="bg-white rounded-[2rem] border-2 border-blue-100 p-8 shadow-xl">
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: profil?.tugas_pokok || 'Belum ada tugas pokok' }} />
                </div>
            </section>

            {/* Struktur Organisasi - Bento Grid */}
            <section className="relative scroll-mt-24" id="struktur">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 mb-3">
                        Struktur Organisasi
                    </h2>
                    <p className="text-gray-600 text-lg">Unit kerja yang solid dan profesional</p>
                </div>

                {struktur?.gambar && (
                    <div className="mb-8 rounded-[2rem] overflow-hidden shadow-xl border-2 border-blue-100">
                        <Image
                            src={struktur.gambar}
                            alt="Struktur Organisasi BPKPAD"
                            width={1200}
                            height={800}
                            className="w-full h-auto"
                        />
                        {struktur.keterangan && (
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                                <p className="text-white text-center text-sm">{struktur.keterangan}</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orgUnits.map((u, i) => (
                        <div
                            key={u.id}
                            className="group relative rounded-2xl bg-gradient-to-br from-white to-blue-50 border border-blue-100 p-6 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            {/* Number Badge */}
                            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">
                                {i + 1}
                            </div>

                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>

                            <h3 className="font-bold text-lg text-gray-900 mb-2 pr-8 leading-tight">{u.nama}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{u.deskripsi}</p>

                            {/* Hover indicator */}
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Profil Pejabat - Hero Card */}
            <section className="relative scroll-mt-24" id="pejabat">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 mb-3">
                        Profil Pejabat
                    </h2>
                    <p className="text-gray-600 text-lg">Pimpinan yang berdedikasi untuk melayani</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pejabatList.map((pejabat, i) => (
                        <div key={pejabat.id} className="group relative rounded-[2rem] bg-gradient-to-br from-purple-500 to-pink-500 p-[2px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="relative rounded-[2rem] bg-white p-6 h-full">
                                {/* Photo */}
                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden ring-4 ring-purple-100 group-hover:ring-purple-200 transition-all">
                                    {pejabat.foto ? (
                                        <Image src={pejabat.foto} alt={pejabat.nama} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                            <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Badge */}
                                <div className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                    {i + 1}
                                </div>

                                {/* Info */}
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{pejabat.nama}</h3>
                                    <p className="text-sm font-medium text-purple-600 mb-3">{pejabat.jabatan}</p>

                                    {pejabat.nip && (
                                        <p className="text-xs text-gray-600 mb-2">NIP: {pejabat.nip}</p>
                                    )}

                                    <div className="space-y-1 text-xs text-gray-600">
                                        {pejabat.email && (
                                            <div className="flex items-center justify-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="truncate">{pejabat.email}</span>
                                            </div>
                                        )}
                                        {pejabat.telepon && (
                                            <div className="flex items-center justify-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span>{pejabat.telepon}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SOP Dokumen */}
            <section className="relative scroll-mt-24" id="sop">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 mb-3">
                        SOP & Dokumen
                    </h2>
                    <p className="text-gray-600 text-lg">Standar operasional prosedur dan regulasi</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {sopList.map((sop) => (
                        <div key={sop.id} className="group relative rounded-2xl bg-white border-2 border-orange-100 p-6 shadow-lg hover:shadow-xl hover:border-orange-300 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                                        {sop.kategori}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{sop.judul}</h3>
                                    {sop.nomor && (
                                        <p className="text-sm text-gray-600 mb-2">Nomor: {sop.nomor}</p>
                                    )}
                                    {sop.deskripsi && (
                                        <p className="text-sm text-gray-700 leading-relaxed mb-3">{sop.deskripsi}</p>
                                    )}
                                    {sop.file && (
                                        <a href={sop.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Download
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Prestasi */}
            <section className="relative scroll-mt-24" id="prestasi">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 mb-3">
                        Prestasi & Penghargaan
                    </h2>
                    <p className="text-gray-600 text-lg">Pencapaian yang membanggakan</p>
                </div>

                <div className="space-y-6">
                    {prestasiList.map((prestasi, i) => (
                        <div key={prestasi.id} className="group relative rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 p-6 shadow-lg hover:shadow-xl hover:border-yellow-300 transition-all">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Photo */}
                                {prestasi.foto && (
                                    <div className="relative flex-shrink-0 w-full md:w-48 h-48 rounded-xl overflow-hidden ring-4 ring-yellow-200 group-hover:ring-yellow-300 transition-all">
                                        <Image src={prestasi.foto} alt={prestasi.judul} fill className="object-cover" />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div>
                                            <div className="inline-block bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                                                {prestasi.kategori || 'Penghargaan'}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{prestasi.judul}</h3>
                                        </div>
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {prestasi.deskripsi && (
                                        <p className="text-gray-700 leading-relaxed mb-3">{prestasi.deskripsi}</p>
                                    )}

                                    <div className="flex flex-wrap gap-4 text-sm">
                                        {prestasi.pemberi && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                <span className="font-medium">{prestasi.pemberi}</span>
                                            </div>
                                        )}
                                        {prestasi.tanggal && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{new Date(prestasi.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

