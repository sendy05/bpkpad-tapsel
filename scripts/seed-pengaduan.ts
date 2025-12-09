import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pengaduanData = [
    {
        kategori: 'pengaduan',
        judul: 'Pengaduan Pelayanan Pajak',
        deskripsi: 'Layanan penerimaan pengaduan terkait pelayanan pajak daerah yang kurang memuaskan',
        prosedur: '1. Isi formulir pengaduan secara online atau datang langsung\n2. Lampirkan bukti pendukung (jika ada)\n3. Pengaduan akan dicatat dan diberi nomor registrasi\n4. Tim akan melakukan verifikasi pengaduan\n5. Investigasi dan klarifikasi dengan pihak terkait\n6. Penyelesaian dan tindak lanjut\n7. Pemberitahuan hasil penanganan kepada pengadu',
        persyaratan: '1. Identitas pengadu (KTP/kartu identitas lain)\n2. Uraian pengaduan yang jelas\n3. Bukti pendukung (foto, dokumen, dll)\n4. Kontak yang dapat dihubungi',
        biaya: 'Gratis',
        waktu_penyelesaian: '7-14 hari kerja',
        link_url: '/downloads/formulir-pengaduan-pajak.pdf',
        icon: '🏛️',
        status: 1
    },
    {
        kategori: 'pengaduan',
        judul: 'Pengaduan Retribusi Daerah',
        deskripsi: 'Penerimaan pengaduan terkait pungutan retribusi yang tidak sesuai aturan',
        prosedur: '1. Sampaikan pengaduan melalui form online/langsung/telepon\n2. Jelaskan kronologi kejadian secara rinci\n3. Lampirkan bukti transaksi atau kwitansi (jika ada)\n4. Petugas akan meregistrasi pengaduan\n5. Tim investigasi akan turun ke lapangan\n6. Mediasi dengan pihak-pihak terkait\n7. Pemberian solusi dan sanksi (jika terbukti)\n8. Laporan hasil penanganan',
        persyaratan: '1. Fotocopy identitas diri\n2. Bukti pembayaran/kwitansi\n3. Surat pengaduan tertulis (untuk yang datang langsung)\n4. Nomor kontak aktif\n5. Email (jika ada)',
        biaya: 'Gratis',
        waktu_penyelesaian: '10-21 hari kerja',
        link_url: '/downloads/formulir-pengaduan-retribusi.pdf',
        icon: '💰',
        status: 1
    },
    {
        kategori: 'pengaduan',
        judul: 'Pengaduan Aset Daerah',
        deskripsi: 'Layanan pengaduan terkait pengelolaan dan pemanfaatan aset daerah yang tidak sesuai',
        prosedur: '1. Laporkan temuan penyimpangan aset daerah\n2. Isi formulir pengaduan dengan lengkap\n3. Sertakan lokasi dan bukti (foto/video)\n4. Pengaduan diverifikasi oleh tim\n5. Survey dan inspeksi lapangan\n6. Koordinasi dengan OPD pengelola aset\n7. Tindakan korektif dan perbaikan\n8. Feedback kepada pengadu',
        persyaratan: '1. Data diri pengadu\n2. Lokasi aset yang diadukan\n3. Foto/video kondisi aset\n4. Kronologi temuan\n5. Dokumen pendukung lainnya (opsional)',
        biaya: 'Gratis',
        waktu_penyelesaian: '14-30 hari kerja',
        link_url: '/downloads/formulir-pengaduan-aset.pdf',
        icon: '🏢',
        status: 1
    },
    {
        kategori: 'pengaduan',
        judul: 'Pengaduan Perilaku Pegawai',
        deskripsi: 'Saluran pengaduan terhadap perilaku pegawai BPKPAD yang tidak profesional',
        prosedur: '1. Sampaikan pengaduan secara tertulis atau online\n2. Jelaskan peristiwa, waktu, dan tempat kejadian\n3. Sebutkan identitas pegawai yang diadukan (jika tahu)\n4. Lampirkan bukti (jika ada)\n5. Registrasi oleh bagian kepegawaian\n6. Pemanggilan pegawai untuk klarifikasi\n7. Sidang kode etik (jika diperlukan)\n8. Sanksi sesuai tingkat pelanggaran\n9. Pemberitahuan hasil kepada pengadu',
        persyaratan: '1. Identitas pengadu (dapat dirahasiakan)\n2. Uraian lengkap kejadian\n3. Waktu dan lokasi kejadian\n4. Saksi (jika ada)\n5. Bukti pendukung (rekaman, foto, dll)',
        biaya: 'Gratis',
        waktu_penyelesaian: '14-30 hari kerja',
        link_url: '/downloads/formulir-pengaduan-pegawai.pdf',
        icon: '👤',
        status: 1
    },
    {
        kategori: 'pengaduan',
        judul: 'Whistleblowing System',
        deskripsi: 'Sistem pelaporan pelanggaran dan penyimpangan internal secara aman dan terjamin kerahasiaannya',
        prosedur: '1. Akses portal whistleblowing online (dapat anonim)\n2. Pilih kategori pelanggaran\n3. Uraikan detail pelanggaran yang ditemukan\n4. Upload bukti digital (opsional)\n5. Sistem akan memberi kode akses untuk tracking\n6. Tim khusus akan menindaklanjuti\n7. Investigasi mendalam dan rahasia\n8. Perlindungan hukum bagi pelapor\n9. Update status penanganan via kode akses',
        persyaratan: '1. Dapat dilaporkan secara anonim\n2. Uraian pelanggaran yang jelas dan faktual\n3. Bukti yang kuat (sangat direkomendasikan)\n4. Email/nomor HP untuk notifikasi (opsional)',
        biaya: 'Gratis',
        waktu_penyelesaian: '30-60 hari kerja (tergantung kompleksitas)',
        link_url: 'https://wbs.bpkpad.go.id',
        icon: '🔒',
        status: 1
    },
    {
        kategori: 'pengaduan',
        judul: 'Pengaduan Online (e-Complaint)',
        deskripsi: 'Platform pengaduan online untuk kemudahan masyarakat menyampaikan keluhan 24/7',
        prosedur: '1. Daftar/login ke sistem e-Complaint\n2. Pilih kategori pengaduan\n3. Isi formulir dengan lengkap\n4. Upload dokumen pendukung\n5. Submit dan dapatkan nomor tiket\n6. Tracking status via nomor tiket\n7. Notifikasi otomatis setiap update\n8. Rating kepuasan setelah selesai',
        persyaratan: '1. Registrasi dengan email aktif\n2. Nomor HP untuk OTP\n3. Pengaduan yang masuk dalam lingkup BPKPAD\n4. Bukti pendukung (foto/dokumen)',
        biaya: 'Gratis',
        waktu_penyelesaian: '1-14 hari kerja (tergantung kategori)',
        link_url: 'https://complaint.bpkpad.go.id',
        icon: '📱',
        status: 1
    },
    {
        kategori: 'pengaduan',
        judul: 'Pengaduan via Call Center',
        deskripsi: 'Layanan pengaduan melalui telepon dengan operator yang siap membantu',
        prosedur: '1. Hubungi call center BPKPAD (0634-123456)\n2. Sampaikan pengaduan kepada operator\n3. Operator akan mencatat detail pengaduan\n4. Dapatkan nomor registrasi pengaduan\n5. Tunggu tindak lanjut dari tim terkait\n6. Follow-up via telepon atau email\n7. Konfirmasi penyelesaian',
        persyaratan: '1. Identitas pelapor\n2. Detail pengaduan yang jelas\n3. Kontak yang dapat dihubungi\n4. Kesediaan untuk dihubungi kembali',
        biaya: 'Gratis (biaya pulsa normal)',
        waktu_penyelesaian: '7-14 hari kerja',
        link_url: null,
        icon: '📞',
        status: 1
    },
    {
        kategori: 'pengaduan',
        judul: 'Kotak Saran dan Pengaduan',
        deskripsi: 'Kotak pengaduan fisik yang tersedia di kantor BPKPAD untuk penyampaian saran dan keluhan',
        prosedur: '1. Ambil formulir pengaduan di meja informasi\n2. Isi formulir dengan lengkap dan jelas\n3. Masukkan formulir ke kotak pengaduan\n4. Kotak dibuka setiap hari Senin dan Kamis\n5. Tim akan memproses semua pengaduan\n6. Pengadu akan dihubungi via kontak yang tertera\n7. Tindak lanjut sesuai kategori pengaduan',
        persyaratan: '1. Formulir pengaduan yang sudah diisi\n2. Identitas (dapat anonim)\n3. Kontak yang jelas (untuk feedback)\n4. Uraian masalah yang spesifik',
        biaya: 'Gratis',
        waktu_penyelesaian: '7-21 hari kerja',
        link_url: '/downloads/formulir-kotak-saran.pdf',
        icon: '📮',
        status: 1
    }
];

async function main() {
    console.log('🚀 Starting seed data for Pengaduan...');

    for (const data of pengaduanData) {
        const pengaduan = await prisma.layanan.create({
            data: {
                ...data,
                tgl_update: new Date(),
                user: 'admin'
            }
        });
        console.log(`✅ Created: ${pengaduan.judul}`);
    }

    console.log('\n✅ Seeding completed!');
    console.log(`📊 Total: ${pengaduanData.length} layanan pengaduan`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
