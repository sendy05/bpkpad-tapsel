import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pajakData = [
    {
        kategori: 'pajak',
        judul: 'Pajak Bumi dan Bangunan (PBB)',
        deskripsi: 'Pajak atas kepemilikan tanah dan bangunan di wilayah Kabupaten Tapanuli Selatan',
        prosedur: '1. Wajib pajak mengisi SPOP (Surat Pemberitahuan Objek Pajak)\n2. Menyerahkan dokumen persyaratan ke loket pelayanan\n3. Petugas melakukan verifikasi dan validasi data\n4. SPPT (Surat Pemberitahuan Pajak Terutang) diterbitkan\n5. Pembayaran dapat dilakukan di Bank/ATM/Mobile Banking',
        persyaratan: '1. Fotocopy KTP/identitas pemilik\n2. Fotocopy sertifikat/bukti kepemilikan tanah\n3. Fotocopy IMB (jika ada bangunan)\n4. SPOP yang sudah diisi lengkap\n5. Surat kuasa (jika dikuasakan)',
        biaya: '0,5% dari NJOP (Nilai Jual Objek Pajak)',
        waktu_penyelesaian: '1-3 hari kerja',
        link_url: '/downloads/formulir-pbb.pdf',
        icon: '🏠',
        status: 1
    },
    {
        kategori: 'pajak',
        judul: 'Pajak Reklame',
        deskripsi: 'Pajak atas penyelenggaraan reklame komersial di wilayah Kabupaten Tapanuli Selatan',
        prosedur: '1. Mengisi formulir permohonan izin reklame\n2. Melampirkan dokumen persyaratan\n3. Petugas survei lokasi reklame\n4. Perhitungan nilai sewa pajak reklame\n5. Pembayaran pajak dan retribusi izin\n6. Penerbitan izin reklame',
        persyaratan: '1. Fotocopy KTP/identitas pemohon\n2. Fotocopy NPWP perusahaan\n3. Gambar desain reklame (ukuran, warna, lighting)\n4. Foto lokasi penempatan reklame\n5. Surat pernyataan kesanggupan pemeliharaan\n6. IMB gedung (untuk reklame di gedung)',
        biaya: 'Dihitung berdasarkan: Luas reklame x Nilai Strategis Lokasi x Jenis Reklame x Waktu',
        waktu_penyelesaian: '3-5 hari kerja',
        link_url: '/downloads/formulir-reklame.pdf',
        icon: '📢',
        status: 1
    },
    {
        kategori: 'pajak',
        judul: 'Pajak Hotel',
        deskripsi: 'Pajak atas pelayanan hotel yang disediakan oleh pengusaha hotel di Kabupaten Tapanuli Selatan',
        prosedur: '1. Pendaftaran NPWPD (Nomor Pokok Wajib Pajak Daerah)\n2. Pengisian SPTPD (Surat Pemberitahuan Pajak Daerah) setiap bulan\n3. Penyetoran pajak setiap bulan maksimal tanggal 15\n4. Pelaporan SPTPD maksimal tanggal 20 setiap bulan\n5. Verifikasi dan validasi oleh petugas pajak',
        persyaratan: '1. Fotocopy KTP pemilik/pengelola\n2. Fotocopy NPWP pribadi/perusahaan\n3. Fotocopy izin usaha hotel\n4. Fotocopy akta pendirian perusahaan\n5. Data tarif kamar hotel\n6. Laporan omzet bulanan',
        biaya: '10% dari jumlah pembayaran atau yang seharusnya dibayar kepada hotel',
        waktu_penyelesaian: 'Setiap bulan (recurring)',
        link_url: '/downloads/formulir-pajak-hotel.pdf',
        icon: '🏨',
        status: 1
    },
    {
        kategori: 'pajak',
        judul: 'Pajak Restoran',
        deskripsi: 'Pajak atas pelayanan restoran, rumah makan, kafe, dan sejenisnya',
        prosedur: '1. Pendaftaran NPWPD untuk usaha baru\n2. Pengisian SPTPD setiap bulan\n3. Pembayaran pajak maksimal tanggal 15 setiap bulan\n4. Pelaporan SPTPD maksimal tanggal 20\n5. Sistem self-assessment (menghitung sendiri pajak terutang)',
        persyaratan: '1. Fotocopy KTP pemilik/pengelola\n2. Fotocopy NPWP\n3. Fotocopy izin usaha/SIUP\n4. Fotocopy TDP (Tanda Daftar Perusahaan)\n5. Daftar menu dan harga\n6. Laporan omzet penjualan bulanan',
        biaya: '10% dari jumlah pembayaran yang diterima restoran',
        waktu_penyelesaian: 'Setiap bulan (recurring)',
        link_url: '/downloads/formulir-pajak-restoran.pdf',
        icon: '🍽️',
        status: 1
    },
    {
        kategori: 'pajak',
        judul: 'Pajak Hiburan',
        deskripsi: 'Pajak atas penyelenggaraan hiburan seperti bioskop, konser, diskotik, karaoke, dan sejenisnya',
        prosedur: '1. Pendaftaran NPWPD untuk penyelenggara hiburan\n2. Pengisian SPTPD setiap bulan\n3. Pembayaran pajak paling lambat tanggal 15\n4. Pelaporan paling lambat tanggal 20\n5. Untuk hiburan insidental: lapor sebelum acara\n6. Verifikasi dan validasi petugas',
        persyaratan: '1. Fotocopy KTP penyelenggara\n2. Fotocopy NPWP\n3. Fotocopy izin penyelenggaraan hiburan\n4. Proposal kegiatan (untuk hiburan insidental)\n5. Rincian harga tiket/tarif masuk\n6. Laporan jumlah pengunjung',
        biaya: 'Bervariasi: 10-35% tergantung jenis hiburan\n- Bioskop: 10%\n- Karaoke: 25%\n- Diskotik: 35%\n- Konser/Pertunjukan: 15%',
        waktu_penyelesaian: '2-5 hari kerja',
        link_url: '/downloads/formulir-pajak-hiburan.pdf',
        icon: '🎭',
        status: 1
    },
    {
        kategori: 'pajak',
        judul: 'Pajak Parkir',
        deskripsi: 'Pajak atas penyelenggaraan tempat parkir di luar badan jalan oleh orang pribadi atau badan',
        prosedur: '1. Pendaftaran NPWPD untuk pengelola parkir\n2. Mengisi SPTPD setiap bulan\n3. Melaporkan jumlah kendaraan dan pendapatan parkir\n4. Pembayaran pajak maksimal tanggal 15\n5. Pelaporan maksimal tanggal 20\n6. Pemeriksaan berkala oleh petugas',
        persyaratan: '1. Fotocopy KTP pengelola\n2. Fotocopy NPWP\n3. Fotocopy izin pengelolaan parkir\n4. Surat perjanjian sewa lahan (jika menyewa)\n5. Denah lokasi parkir\n6. Tarif parkir yang berlaku\n7. Laporan pendapatan parkir bulanan',
        biaya: '30% dari jumlah pembayaran atau yang seharusnya dibayar kepada penyelenggara parkir',
        waktu_penyelesaian: 'Setiap bulan (recurring)',
        link_url: '/downloads/formulir-pajak-parkir.pdf',
        icon: '🅿️',
        status: 1
    },
    {
        kategori: 'pajak',
        judul: 'Pajak Air Tanah',
        deskripsi: 'Pajak atas pengambilan dan/atau pemanfaatan air tanah untuk keperluan komersial',
        prosedur: '1. Permohonan izin pengambilan air tanah\n2. Survey lokasi oleh petugas teknis\n3. Perhitungan volume air dan tarif pajak\n4. Pendaftaran NPWPD\n5. Pelaporan volume penggunaan setiap bulan\n6. Pembayaran pajak berdasarkan meter air\n7. Monitoring berkala',
        persyaratan: '1. Fotocopy KTP/identitas pemohon\n2. Fotocopy NPWP\n3. Fotocopy izin usaha\n4. Gambar teknis sumur/pompa\n5. Spesifikasi pompa dan kapasitas\n6. Hasil uji kualitas air (jika diperlukan)\n7. Surat pernyataan tidak merusak lingkungan',
        biaya: '20% dari nilai perolehan air tanah\nTarif per m³ berdasarkan klasifikasi penggunaan:\n- Industri: Rp 2.000/m³\n- Komersial: Rp 1.500/m³\n- Lainnya: Rp 1.000/m³',
        waktu_penyelesaian: '5-7 hari kerja (izin baru)\n1 hari kerja (perpanjangan)',
        link_url: '/downloads/formulir-pajak-air-tanah.pdf',
        icon: '💧',
        status: 1
    },
    {
        kategori: 'pajak',
        judul: 'Pajak Mineral Bukan Logam dan Batuan',
        deskripsi: 'Pajak atas kegiatan pengambilan mineral bukan logam dan batuan seperti pasir, batu, kerikil, tanah liat',
        prosedur: '1. Permohonan izin pengambilan mineral/batuan\n2. Survey lokasi dan volume cadangan\n3. Penghitungan pajak berdasarkan volume\n4. Pendaftaran NPWPD\n5. Pelaporan produksi setiap bulan\n6. Pembayaran pajak sesuai realisasi produksi\n7. Monitoring dan evaluasi berkala',
        persyaratan: '1. Fotocopy KTP/identitas pemohon\n2. Fotocopy NPWP\n3. Fotocopy izin usaha pertambangan (IUP)\n4. Peta lokasi pertambangan\n5. Rencana kerja dan anggaran biaya\n6. Laporan studi kelayakan\n7. Dokumen AMDAL/UKL-UPL\n8. Surat pernyataan reklamasi',
        biaya: '25% dari nilai jual hasil mineral/batuan\n\nHarga dasar per m³:\n- Pasir: Rp 50.000\n- Batu: Rp 75.000\n- Kerikil: Rp 45.000\n- Tanah liat: Rp 30.000',
        waktu_penyelesaian: '7-14 hari kerja',
        link_url: '/downloads/formulir-pajak-mineral.pdf',
        icon: '⛰️',
        status: 1
    }
];

async function main() {
    console.log('🚀 Starting seed data for Pajak...');

    for (const data of pajakData) {
        const pajak = await prisma.layanan.create({
            data: {
                ...data,
                tgl_update: new Date(),
                user: 'admin'
            }
        });
        console.log(`✅ Created: ${pajak.judul}`);
    }

    console.log('✅ Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
