import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with complete menu structure...');

    // 1. Quick Menu / Shortcut
    await prisma.quickMenu.createMany({
        data: [
            {
                icon: '💳',
                title: 'Bayar Pajak',
                description: 'Akses e-Billing untuk pembayaran pajak online',
                link: '/layanan/pajak/e-billing',
                color: 'blue',
                order: 1
            },
            {
                icon: '🔍',
                title: 'Cek Tagihan',
                description: 'Periksa tagihan pajak dan retribusi Anda',
                link: '/layanan/pajak/cek-tagihan',
                color: 'green',
                order: 2
            },
            {
                icon: '📊',
                title: 'Statistik PAD',
                description: 'Lihat data realisasi Pendapatan Asli Daerah',
                link: '/data-statistik',
                color: 'purple',
                order: 3
            },
            {
                icon: '📝',
                title: 'Pengaduan',
                description: 'Sampaikan pengaduan atau keluhan Anda',
                link: '/layanan/pengaduan',
                color: 'red',
                order: 4
            },
            {
                icon: '📥',
                title: 'Unduh Formulir',
                description: 'Download formulir pajak dan retribusi',
                link: '/layanan/formulir',
                color: 'amber',
                order: 5
            }
        ],
        skipDuplicates: true
    });

    // 2. Statistik PAD (Data 2025)
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const statsData = months.map(bulan => ({
        tahun: 2025,
        bulan,
        target: 500000000,
        realisasi: 400000000 + (bulan * 10000000),
        persentase: 80 + bulan,
        jenisSektor: 'PAJAK_HOTEL'
    }));
    await prisma.statistikPAD.createMany({ data: statsData, skipDuplicates: true });

    // 3. SOP & Maklumat
    await prisma.sOP.createMany({
        data: [
            {
                judul: 'SOP Pelayanan Pajak Daerah',
                kategori: 'SOP',
                deskripsi: 'Prosedur standar pelayanan pajak daerah',
                fileUrl: '/documents/sop-pajak.pdf',
                nomorDokumen: 'SOP/001/BPKPAD/2025',
                tanggalTerbit: new Date('2025-01-15'),
                status: 'Active'
            },
            {
                judul: 'Maklumat Pelayanan BPKPAD',
                kategori: 'MAKLUMAT',
                deskripsi: 'Komitmen pelayanan kepada masyarakat',
                fileUrl: '/documents/maklumat-pelayanan.pdf',
                nomorDokumen: 'MAK/001/BPKPAD/2025',
                tanggalTerbit: new Date('2025-01-10'),
                status: 'Active'
            },
            {
                judul: 'Petunjuk Teknis Pengelolaan Aset Daerah',
                kategori: 'PETUNJUK_TEKNIS',
                deskripsi: 'Panduan teknis pengelolaan barang milik daerah',
                fileUrl: '/documents/juknis-aset.pdf',
                nomorDokumen: 'JUKNIS/001/BPKPAD/2025',
                tanggalTerbit: new Date('2025-02-01'),
                status: 'Active'
            }
        ],
        skipDuplicates: true
    });

    // 4. Prestasi/Penghargaan
    await prisma.prestasi.createMany({
        data: [
            {
                judul: 'Penghargaan Kinerja Terbaik BPKPAD',
                deskripsi: 'Penghargaan dari Kementerian Keuangan atas kinerja terbaik dalam pengelolaan keuangan daerah',
                pemberi: 'Kementerian Keuangan RI',
                tanggal: new Date('2024-12-15'),
                kategori: 'NASIONAL',
                fotoUrl: '/images/prestasi/kemenkeu-award.jpg'
            },
            {
                judul: 'Juara 1 Lomba Inovasi Pelayanan Publik',
                deskripsi: 'Inovasi e-Billing pajak daerah meraih juara 1 tingkat provinsi',
                pemberi: 'Pemerintah Provinsi Sumatera Utara',
                tanggal: new Date('2024-11-20'),
                kategori: 'PROVINSI',
                fotoUrl: '/images/prestasi/juara-inovasi.jpg'
            },
            {
                judul: 'Predikat WTP 5 Tahun Berturut-turut',
                deskripsi: 'BPKPAD meraih opini Wajar Tanpa Pengecualian dari BPK',
                pemberi: 'BPK RI',
                tanggal: new Date('2024-10-10'),
                kategori: 'NASIONAL',
                fotoUrl: '/images/prestasi/wtp-bpk.jpg'
            }
        ],
        skipDuplicates: true
    });

    // 5. Informasi Publik
    await prisma.informasiPublik.createMany({
        data: [
            {
                judul: 'Laporan Keuangan BPKPAD Triwulan IV 2024',
                kategori: 'BERKALA',
                ringkasan: 'Laporan realisasi anggaran dan keuangan periode Oktober-Desember 2024',
                fileUrl: '/docs/laporan-keuangan-q4-2024.pdf',
                tanggalPublikasi: new Date('2025-01-15'),
                pejabatPengelola: 'Kepala Bidang Keuangan',
                status: 'Published'
            },
            {
                judul: 'Pengumuman Perubahan Tarif Retribusi Parkir',
                kategori: 'SERTA_MERTA',
                ringkasan: 'Penyesuaian tarif retribusi parkir berdasarkan Perbup No. 5/2025',
                fileUrl: '/docs/pengumuman-tarif-parkir.pdf',
                tanggalPublikasi: new Date('2025-02-01'),
                pejabatPengelola: 'Kepala Bidang Retribusi',
                status: 'Published'
            },
            {
                judul: 'Daftar Aset Daerah Tahun 2024',
                kategori: 'SETIAP_SAAT',
                ringkasan: 'Informasi lengkap aset daerah yang dikelola BPKPAD',
                fileUrl: '/docs/daftar-aset-2024.pdf',
                tanggalPublikasi: new Date('2025-01-10'),
                pejabatPengelola: 'Kepala Bidang Aset',
                status: 'Published'
            }
        ],
        skipDuplicates: true
    });

    // 6. Jenis Pajak Daerah
    await prisma.jenisPajak.createMany({
        data: [
            {
                nama: 'Pajak Hotel',
                kode: 'PJK-HTL',
                deskripsi: 'Pajak atas pelayanan hotel, motel, losmen, dan penginapan',
                dasar_hukum: 'UU No. 1 Tahun 2022 tentang Hubungan Keuangan Pusat dan Daerah',
                tarif: '10% dari jumlah pembayaran',
                caraBayar: 'Transfer bank, e-Billing, atau langsung ke kantor BPKPAD',
                kontakPetugas: 'Budi Santoso - 0812-3456-7890',
                formulirUrl: '/formulir/pajak-hotel.pdf',
                isActive: true
            },
            {
                nama: 'Pajak Restoran',
                kode: 'PJK-RST',
                deskripsi: 'Pajak atas pelayanan restoran, rumah makan, dan katering',
                dasar_hukum: 'UU No. 1 Tahun 2022 tentang Hubungan Keuangan Pusat dan Daerah',
                tarif: '10% dari jumlah pembayaran',
                caraBayar: 'Transfer bank, e-Billing, atau langsung ke kantor BPKPAD',
                kontakPetugas: 'Siti Aminah - 0813-4567-8901',
                formulirUrl: '/formulir/pajak-restoran.pdf',
                isActive: true
            },
            {
                nama: 'Pajak Hiburan',
                kode: 'PJK-HBR',
                deskripsi: 'Pajak atas penyelenggaraan hiburan seperti bioskop, konser, pertunjukan',
                dasar_hukum: 'UU No. 1 Tahun 2022 tentang Hubungan Keuangan Pusat dan Daerah',
                tarif: '15-35% sesuai jenis hiburan',
                caraBayar: 'Transfer bank, e-Billing, atau langsung ke kantor BPKPAD',
                kontakPetugas: 'Ahmad Fauzi - 0814-5678-9012',
                formulirUrl: '/formulir/pajak-hiburan.pdf',
                isActive: true
            },
            {
                nama: 'PBB-P2 (Pajak Bumi dan Bangunan)',
                kode: 'PBB-P2',
                deskripsi: 'Pajak atas kepemilikan tanah dan/atau bangunan',
                dasar_hukum: 'UU No. 1 Tahun 2022 tentang Hubungan Keuangan Pusat dan Daerah',
                tarif: '0.1-0.3% dari NJOP',
                caraBayar: 'Transfer bank, e-Billing, minimarket, atau kantor pos',
                kontakPetugas: 'Dewi Lestari - 0815-6789-0123',
                formulirUrl: '/formulir/pbb-p2.pdf',
                isActive: true
            }
        ],
        skipDuplicates: true
    });

    // 7. Retribusi Daerah
    await prisma.retribusi.createMany({
        data: [
            {
                nama: 'Retribusi Parkir Kendaraan',
                jenis: 'JASA_UMUM',
                deskripsi: 'Retribusi atas penyediaan tempat parkir kendaraan',
                tarif: 'Motor: Rp 2.000, Mobil: Rp 5.000',
                prosedur: '1. Ambil karcis masuk\n2. Bayar saat keluar\n3. Simpan bukti pembayaran',
                dasarHukum: 'Perda No. 3 Tahun 2024',
                isActive: true
            },
            {
                nama: 'Retribusi Pasar',
                jenis: 'JASA_USAHA',
                deskripsi: 'Retribusi atas pemakaian kios/los di pasar tradisional',
                tarif: 'Rp 5.000 - Rp 20.000 per hari sesuai ukuran',
                prosedur: '1. Daftar ke pengelola pasar\n2. Bayar retribusi harian/bulanan\n3. Dapatkan bukti pembayaran',
                dasarHukum: 'Perda No. 4 Tahun 2024',
                isActive: true
            },
            {
                nama: 'Retribusi IMB (Izin Mendirikan Bangunan)',
                jenis: 'PERIZINAN_TERTENTU',
                deskripsi: 'Retribusi atas pengurusan izin mendirikan bangunan',
                tarif: 'Dihitung berdasarkan luas bangunan',
                prosedur: '1. Ajukan permohonan IMB\n2. Lengkapi dokumen\n3. Bayar retribusi\n4. Terima IMB',
                dasarHukum: 'Perda No. 5 Tahun 2024',
                isActive: true
            }
        ],
        skipDuplicates: true
    });

    // 8. Aset Daerah (Contoh)
    await prisma.asetDaerah.createMany({
        data: [
            {
                kodeAset: 'TNH-001-2024',
                namaAset: 'Tanah Kantor BPKPAD',
                kategori: 'TANAH',
                lokasi: 'Jl. Sisingamangaraja No. 1, Sipirok',
                kondisi: 'BAIK',
                nilaiPerolehan: 2500000000,
                tahunPerolehan: 2010,
                keterangan: 'Tanah seluas 5000 m2 untuk bangunan kantor',
                status: 'AKTIF',
                fotoUrl: '/images/aset/tanah-kantor.jpg'
            },
            {
                kodeAset: 'BGN-001-2024',
                namaAset: 'Gedung Kantor BPKPAD',
                kategori: 'BANGUNAN',
                lokasi: 'Jl. Sisingamangaraja No. 1, Sipirok',
                kondisi: 'BAIK',
                nilaiPerolehan: 8500000000,
                tahunPerolehan: 2015,
                keterangan: 'Gedung berlantai 3 dengan luas 2000 m2',
                status: 'AKTIF',
                fotoUrl: '/images/aset/gedung-kantor.jpg'
            },
            {
                kodeAset: 'KND-001-2024',
                namaAset: 'Toyota Fortuner (Dinas)',
                kategori: 'KENDARAAN',
                lokasi: 'Pool BPKPAD',
                kondisi: 'BAIK',
                nilaiPerolehan: 550000000,
                tahunPerolehan: 2023,
                keterangan: 'Kendaraan dinas Kepala BPKPAD',
                status: 'AKTIF',
                fotoUrl: '/images/aset/mobil-dinas.jpg'
            }
        ],
        skipDuplicates: true
    });

    // 9. Regulasi
    await prisma.regulasi.createMany({
        data: [
            {
                judul: 'Peraturan Daerah tentang Pajak Daerah',
                jenis: 'PERDA',
                nomor: '1',
                tahun: 2025,
                tentang: 'Pajak Daerah dan Retribusi Daerah',
                tanggalTerbit: new Date('2025-01-05'),
                fileUrl: '/docs/perda-1-2025.pdf',
                status: 'Active'
            },
            {
                judul: 'Peraturan Bupati tentang Tarif Retribusi',
                jenis: 'PERBUP',
                nomor: '5',
                tahun: 2025,
                tentang: 'Penetapan Tarif Retribusi Daerah',
                tanggalTerbit: new Date('2025-02-01'),
                fileUrl: '/docs/perbup-5-2025.pdf',
                status: 'Active'
            },
            {
                judul: 'SK Kepala BPKPAD tentang Tim Penagihan',
                jenis: 'SK_KEPALA',
                nomor: '10',
                tahun: 2025,
                tentang: 'Pembentukan Tim Penagihan Pajak Daerah',
                tanggalTerbit: new Date('2025-01-20'),
                fileUrl: '/docs/sk-10-2025.pdf',
                status: 'Active'
            },
            {
                judul: 'Rencana Strategis BPKPAD 2025-2029',
                jenis: 'RENSTRA',
                nomor: '1',
                tahun: 2025,
                tentang: 'Rencana Strategis Badan Pengelola Keuangan dan Aset Daerah',
                tanggalTerbit: new Date('2025-01-15'),
                fileUrl: '/docs/renstra-2025-2029.pdf',
                status: 'Active'
            }
        ],
        skipDuplicates: true
    });

    // 10. Agenda Kegiatan
    await prisma.agenda.createMany({
        data: [
            {
                judul: 'Sosialisasi E-Billing Pajak Daerah',
                deskripsi: 'Sosialisasi penggunaan aplikasi e-Billing untuk pembayaran pajak online',
                lokasi: 'Aula BPKPAD',
                tanggalMulai: new Date('2025-12-15T09:00:00'),
                tanggalSelesai: new Date('2025-12-15T15:00:00'),
                jamMulai: '09:00',
                jamSelesai: '15:00',
                penyelenggara: 'Bidang Pajak Daerah',
                status: 'TERJADWAL',
                fotoUrl: '/images/agenda/sosialisasi-ebilling.jpg'
            },
            {
                judul: 'Rapat Koordinasi Pengelolaan Aset',
                deskripsi: 'Koordinasi dengan OPD terkait pengelolaan barang milik daerah',
                lokasi: 'Ruang Rapat BPKPAD',
                tanggalMulai: new Date('2025-12-20T10:00:00'),
                tanggalSelesai: new Date('2025-12-20T12:00:00'),
                jamMulai: '10:00',
                jamSelesai: '12:00',
                penyelenggara: 'Bidang Aset Daerah',
                status: 'TERJADWAL',
                fotoUrl: '/images/agenda/rakor-aset.jpg'
            }
        ],
        skipDuplicates: true
    });

    // 11. Video
    await prisma.video.createMany({
        data: [
            {
                judul: 'Tutorial Pembayaran Pajak Online',
                deskripsi: 'Panduan lengkap cara bayar pajak melalui e-Billing',
                videoUrl: 'https://youtube.com/watch?v=example1',
                thumbnailUrl: '/images/video/tutorial-pajak-thumb.jpg',
                durasi: '05:30',
                kategori: 'TUTORIAL',
                tanggalPublikasi: new Date('2025-01-10'),
                status: 'Published'
            },
            {
                judul: 'Profil BPKPAD Tapanuli Selatan',
                deskripsi: 'Video profil singkat BPKPAD dan layanannya',
                videoUrl: 'https://youtube.com/watch?v=example2',
                thumbnailUrl: '/images/video/profil-bpkpad-thumb.jpg',
                durasi: '03:45',
                kategori: 'PROFIL',
                tanggalPublikasi: new Date('2025-01-05'),
                status: 'Published'
            }
        ],
        skipDuplicates: true
    });

    // 12. Aplikasi Links
    await prisma.aplikasiLink.createMany({
        data: [
            {
                nama: 'e-SPPT / e-PBB',
                deskripsi: 'Sistem Informasi Pajak Bumi dan Bangunan Online',
                url: 'https://pbb.tapanuliselatankab.go.id',
                icon: '🏠',
                kategori: 'INTERNAL',
                order: 1
            },
            {
                nama: 'e-Billing Pajak',
                deskripsi: 'Pembayaran Pajak Daerah Online',
                url: 'https://ebilling.tapanuliselatankab.go.id',
                icon: '💳',
                kategori: 'INTERNAL',
                order: 2
            },
            {
                nama: 'SIMBADA',
                deskripsi: 'Sistem Informasi Manajemen Barang Daerah',
                url: 'https://simbada.tapanuliselatankab.go.id',
                icon: '📦',
                kategori: 'INTERNAL',
                order: 3
            },
            {
                nama: 'SITARIDA',
                deskripsi: 'Sistem Informasi Tarif Retribusi Daerah',
                url: 'https://sitarida.tapanuliselatankab.go.id',
                icon: '💰',
                kategori: 'INTERNAL',
                order: 4
            },
            {
                nama: 'DJPK Kemenkeu',
                deskripsi: 'Direktorat Jenderal Perimbangan Keuangan',
                url: 'https://djpk.kemenkeu.go.id',
                icon: '🏛️',
                kategori: 'PEMERINTAH',
                order: 5
            },
            {
                nama: 'Kemendagri',
                deskripsi: 'Kementerian Dalam Negeri RI',
                url: 'https://www.kemendagri.go.id',
                icon: '🏢',
                kategori: 'PEMERINTAH',
                order: 6
            }
        ],
        skipDuplicates: true
    });

    // 13. Kontak Info
    await prisma.kontakInfo.createMany({
        data: [
            {
                jenis: 'ALAMAT',
                label: 'Alamat Kantor',
                value: 'Jl. Sisingamangaraja No. 1, Sipirok, Kab. Tapanuli Selatan, Sumatera Utara 22742',
                icon: '📍',
                isPrimary: true,
                order: 1
            },
            {
                jenis: 'TELEPON',
                label: 'Telepon',
                value: '+62 634 20001',
                icon: '📞',
                isPrimary: true,
                order: 2
            },
            {
                jenis: 'FAX',
                label: 'Fax',
                value: '+62 634 20002',
                icon: '📠',
                isPrimary: false,
                order: 3
            },
            {
                jenis: 'EMAIL',
                label: 'Email Resmi',
                value: 'bpkpad@tapanuliselatankab.go.id',
                icon: '✉️',
                isPrimary: true,
                order: 4
            },
            {
                jenis: 'WHATSAPP',
                label: 'WhatsApp Center',
                value: '+62 812 6000 1234',
                icon: '💬',
                isPrimary: true,
                order: 5
            },
            {
                jenis: 'JAM_LAYANAN',
                label: 'Jam Pelayanan',
                value: 'Senin - Jumat: 08:00 - 16:00 WIB\nIstirahat: 12:00 - 13:00 WIB',
                icon: '🕐',
                isPrimary: true,
                order: 6
            }
        ],
        skipDuplicates: true
    });

    // 14. Banner untuk Beranda
    await prisma.banner.createMany({
        data: [
            {
                judul: 'Selamat Datang di Portal BPKPAD',
                subjudul: 'Badan Pengelola Keuangan dan Aset Daerah Kabupaten Tapanuli Selatan',
                imageUrl: '/images/banner/banner-1.jpg',
                link: '/profil',
                order: 1,
                isActive: true
            },
            {
                judul: 'Bayar Pajak Lebih Mudah dengan e-Billing',
                subjudul: 'Akses pembayaran pajak online 24/7 dari mana saja',
                imageUrl: '/images/banner/banner-2.jpg',
                link: '/layanan/pajak/e-billing',
                order: 2,
                isActive: true
            },
            {
                judul: 'Transparansi Pengelolaan Keuangan Daerah',
                subjudul: 'Komitmen kami untuk pelayanan yang akuntabel',
                imageUrl: '/images/banner/banner-3.jpg',
                link: '/data-statistik',
                order: 3,
                isActive: true
            }
        ],
        skipDuplicates: true
    });

    console.log('✅ Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
