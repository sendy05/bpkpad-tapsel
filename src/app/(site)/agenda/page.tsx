import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Agenda Kegiatan',
    description: 'Jadwal kegiatan dan agenda BPKPAD Kabupaten Tapanuli Selatan',
};

// Sample data - di production akan menggunakan database
const agendaList = [
    {
        id: 1,
        judul: 'Sosialisasi Peraturan Bupati tentang Pajak Daerah Tahun 2025',
        tanggal: '2025-02-15',
        waktu: '09:00 - 12:00 WIB',
        tempat: 'Aula BPKPAD Kabupaten Tapanuli Selatan',
        deskripsi: 'Sosialisasi peraturan baru tentang pajak daerah kepada wajib pajak dan masyarakat',
        kategori: 'Sosialisasi',
        status: 'akan-datang',
        peserta: '150 orang',
        narahubung: 'Budi Santoso - 08123456789'
    },
    {
        id: 2,
        judul: 'Rapat Evaluasi Realisasi PAD Triwulan I 2025',
        tanggal: '2025-02-20',
        waktu: '13:00 - 16:00 WIB',
        tempat: 'Ruang Rapat Utama',
        deskripsi: 'Evaluasi pencapaian target PAD triwulan pertama tahun 2025',
        kategori: 'Rapat Internal',
        status: 'akan-datang',
        peserta: '30 orang (internal)',
        narahubung: 'Kasubbid Perencanaan'
    },
    {
        id: 3,
        judul: 'Penilaian dan Inventarisasi Aset Daerah',
        tanggal: '2025-02-22',
        waktu: '08:00 - 17:00 WIB',
        tempat: 'Berbagai lokasi aset di Kab. Tapsel',
        deskripsi: 'Kegiatan penilaian dan pendataan ulang aset daerah yang tersebar di berbagai lokasi',
        kategori: 'Inventarisasi',
        status: 'akan-datang',
        peserta: 'Tim inventarisasi',
        narahubung: 'Kasubbid Aset'
    },
    {
        id: 4,
        judul: 'Workshop Peningkatan Kapasitas Petugas Pajak',
        tanggal: '2025-02-25',
        waktu: '08:00 - 16:00 WIB',
        tempat: 'Hotel Grand Sipirok',
        deskripsi: 'Pelatihan untuk meningkatkan kompetensi petugas pajak dalam pelayanan dan penagihan',
        kategori: 'Workshop',
        status: 'akan-datang',
        peserta: '50 petugas',
        narahubung: 'Kabag Umum - 08234567890'
    },
    {
        id: 5,
        judul: 'Rakor Penyusunan APBD 2026',
        tanggal: '2025-03-05',
        waktu: '09:00 - 15:00 WIB',
        tempat: 'Kantor Bupati Tapanuli Selatan',
        deskripsi: 'Rapat koordinasi penyusunan Anggaran Pendapatan dan Belanja Daerah tahun 2026',
        kategori: 'Rapat Koordinasi',
        status: 'akan-datang',
        peserta: 'Kepala SKPD',
        narahubung: 'Sekretaris BPKPAD'
    },
    {
        id: 6,
        judul: 'Operasi Pajak Kendaraan Bermotor',
        tanggal: '2025-01-20',
        waktu: '09:00 - 14:00 WIB',
        tempat: 'Jl. Sisingamangaraja, Sipirok',
        deskripsi: 'Operasi bersama dengan Polres untuk penertiban pajak kendaraan bermotor',
        kategori: 'Operasi',
        status: 'selesai',
        peserta: 'Tim gabungan',
        narahubung: 'Kasubbid Pajak'
    },
    {
        id: 7,
        judul: 'Sosialisasi e-SPTPD Online',
        tanggal: '2025-01-15',
        waktu: '13:00 - 16:00 WIB',
        tempat: 'Gedung Serba Guna Sipirok',
        deskripsi: 'Pengenalan sistem pelaporan pajak daerah secara online kepada wajib pajak',
        kategori: 'Sosialisasi',
        status: 'selesai',
        peserta: '200 wajib pajak',
        narahubung: 'Tim IT BPKPAD'
    },
    {
        id: 8,
        judul: 'Audit Aset Daerah',
        tanggal: '2025-01-10',
        waktu: '08:00 - 17:00 WIB',
        tempat: 'Seluruh OPD Kab. Tapsel',
        deskripsi: 'Audit dan verifikasi aset daerah yang berada di masing-masing OPD',
        kategori: 'Audit',
        status: 'selesai',
        peserta: 'Tim Auditor Internal',
        narahubung: 'Inspektorat'
    }
];

export default function AgendaPage() {
    const akanDatang = agendaList.filter(a => a.status === 'akan-datang');
    const selesai = agendaList.filter(a => a.status === 'selesai');

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
                <div className="container">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        📅 AGENDA KEGIATAN
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Agenda Kegiatan</h1>
                    <p className="text-xl text-emerald-50">Jadwal lengkap kegiatan dan event BPKPAD Kabupaten Tapanuli Selatan</p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-8 bg-white shadow-sm">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-emerald-600 mb-2">{akanDatang.length}</div>
                            <div className="text-neutral-600">Agenda Mendatang</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">{selesai.length}</div>
                            <div className="text-neutral-600">Kegiatan Terlaksana</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">{agendaList.length}</div>
                            <div className="text-neutral-600">Total Agenda</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Agenda Akan Datang */}
            <section className="py-12">
                <div className="container">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl">
                            🗓️
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-800">Agenda Akan Datang</h2>
                            <p className="text-neutral-600">Jadwal kegiatan yang akan dilaksanakan</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {akanDatang.map((agenda) => (
                            <div
                                key={agenda.id}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-emerald-500"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Date Box */}
                                    <div className="flex-shrink-0">
                                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 text-center w-32">
                                            <div className="text-3xl font-bold mb-1">
                                                {new Date(agenda.tanggal).getDate()}
                                            </div>
                                            <div className="text-sm font-semibold">
                                                {new Date(agenda.tanggal).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }).toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                                                    {agenda.kategori}
                                                </span>
                                                <h3 className="text-xl font-bold text-neutral-800 mb-2">
                                                    {agenda.judul}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-neutral-600 mb-4">{agenda.deskripsi}</p>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-neutral-500 font-semibold">WAKTU</div>
                                                    <div className="text-sm font-medium text-neutral-800">{agenda.waktu}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-neutral-500 font-semibold">TEMPAT</div>
                                                    <div className="text-sm font-medium text-neutral-800">{agenda.tempat}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-neutral-500 font-semibold">PESERTA</div>
                                                    <div className="text-sm font-medium text-neutral-800">{agenda.peserta}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-neutral-500 font-semibold">NARAHUBUNG</div>
                                                    <div className="text-sm font-medium text-neutral-800">{agenda.narahubung}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Agenda Selesai */}
            <section className="py-12 bg-white">
                <div className="container">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-neutral-500 to-neutral-600 rounded-2xl flex items-center justify-center text-3xl">
                            ✅
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-800">Kegiatan Terlaksana</h2>
                            <p className="text-neutral-600">Agenda yang telah selesai dilaksanakan</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {selesai.map((agenda) => (
                            <div
                                key={agenda.id}
                                className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="bg-neutral-200 text-neutral-600 rounded-xl p-3 text-center min-w-[60px]">
                                        <div className="text-xl font-bold">
                                            {new Date(agenda.tanggal).getDate()}
                                        </div>
                                        <div className="text-xs font-semibold">
                                            {new Date(agenda.tanggal).toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <span className="inline-block bg-neutral-200 text-neutral-600 text-xs font-bold px-3 py-1 rounded-full mb-2">
                                            {agenda.kategori}
                                        </span>
                                        <h3 className="text-lg font-bold text-neutral-800 mb-2">
                                            {agenda.judul}
                                        </h3>
                                        <p className="text-sm text-neutral-600 mb-3">{agenda.deskripsi}</p>
                                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                                            <span>📍 {agenda.tempat}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12">
                <div className="container">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Ingin Berpartisipasi dalam Kegiatan Kami?</h2>
                        <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
                            Hubungi kami untuk informasi lebih lanjut tentang agenda kegiatan dan cara berpartisipasi
                        </p>
                        <Link
                            href="/kontak"
                            className="inline-block px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-2xl transition-all"
                        >
                            📞 Hubungi Kami
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

