import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const asetData = [
    {
        kategori: 'aset',
        judul: 'Inventarisasi Aset Daerah',
        deskripsi: 'Layanan pendataan dan inventarisasi aset milik pemerintah daerah untuk keperluan pelaporan dan pengelolaan',
        prosedur: '1. Pengajuan permohonan inventarisasi aset\n2. Verifikasi data aset oleh petugas\n3. Survey lokasi dan kondisi aset\n4. Penilaian dan dokumentasi aset\n5. Pencatatan dalam sistem informasi manajemen aset\n6. Penerbitan laporan inventarisasi',
        persyaratan: '1. Surat permohonan dari OPD/unit kerja\n2. Data aset yang akan diinventarisasi\n3. Dokumen kepemilikan/bukti perolehan aset\n4. Foto kondisi aset terkini\n5. Berita acara serah terima (jika ada)',
        biaya: 'Gratis',
        waktu_penyelesaian: '7-14 hari kerja',
        link_url: '/downloads/formulir-inventarisasi-aset.pdf',
        icon: '📋',
        status: 1
    },
    {
        kategori: 'aset',
        judul: 'Penilaian Aset Daerah',
        deskripsi: 'Layanan penilaian nilai aset daerah untuk keperluan pelaporan keuangan dan pengelolaan BMD',
        prosedur: '1. Pengajuan permohonan penilaian aset\n2. Pemeriksaan dokumen kelengkapan\n3. Tim penilai melakukan survey dan inspeksi\n4. Analisis data pasar dan kondisi aset\n5. Perhitungan nilai wajar aset\n6. Penerbitan laporan penilaian\n7. Verifikasi dan pengesahan',
        persyaratan: '1. Surat permohonan penilaian\n2. Data lengkap aset (spesifikasi, tahun, kondisi)\n3. Dokumen kepemilikan yang sah\n4. Foto kondisi aset dari berbagai sudut\n5. Data nilai perolehan awal\n6. Riwayat pemeliharaan (jika ada)',
        biaya: 'Gratis (untuk aset pemerintah)',
        waktu_penyelesaian: '14-21 hari kerja',
        link_url: '/downloads/formulir-penilaian-aset.pdf',
        icon: '💰',
        status: 1
    },
    {
        kategori: 'aset',
        judul: 'Penatausahaan BMD',
        deskripsi: 'Layanan penatausahaan Barang Milik Daerah meliputi pembukuan, inventarisasi, dan pelaporan',
        prosedur: '1. Pendaftaran BMD baru/perubahan\n2. Input data ke sistem SIMBADA\n3. Pemberian kode barang dan kartu inventaris\n4. Pencatatan mutasi/perubahan status BMD\n5. Pembuatan laporan berkala\n6. Rekonsiliasi data dengan OPD',
        persyaratan: '1. Formulir penatausahaan BMD\n2. Berita acara serah terima\n3. Dokumen perolehan (faktur/kwitansi)\n4. Spesifikasi teknis barang\n5. Kartu inventaris barang (KIB)\n6. Dokumen pendukung lainnya',
        biaya: 'Gratis',
        waktu_penyelesaian: '3-5 hari kerja',
        link_url: '/downloads/formulir-penatausahaan-bmd.pdf',
        icon: '📂',
        status: 1
    },
    {
        kategori: 'aset',
        judul: 'Penghapusan Aset',
        deskripsi: 'Layanan penghapusan aset daerah yang sudah tidak layak pakai atau rusak berat',
        prosedur: '1. Pengajuan usulan penghapusan dari OPD\n2. Pembentukan tim penilai kondisi aset\n3. Survey dan penilaian kondisi fisik\n4. Rapat pembahasan kelayakan penghapusan\n5. Pembuatan berita acara penghapusan\n6. Persetujuan dari pejabat berwenang\n7. Eksekusi penghapusan (lelang/dimusnahkan)\n8. Penerbitan SK penghapusan',
        persyaratan: '1. Surat usulan penghapusan dari kepala OPD\n2. Berita acara kondisi barang\n3. Foto kondisi aset yang akan dihapus\n4. Kartu inventaris barang (KIB)\n5. Riwayat perbaikan/pemeliharaan\n6. Perkiraan nilai sisa (jika ada)\n7. Rekomendasi tim teknis',
        biaya: 'Gratis',
        waktu_penyelesaian: '30-60 hari kerja',
        link_url: '/downloads/formulir-penghapusan-aset.pdf',
        icon: '🗑️',
        status: 1
    },
    {
        kategori: 'aset',
        judul: 'Pemindahtanganan Aset',
        deskripsi: 'Layanan pemindahtanganan aset daerah melalui penjualan, tukar menukar, atau hibah',
        prosedur: '1. Usulan pemindahtanganan dari OPD\n2. Penelitian dan penilaian aset\n3. Penetapan nilai limit/harga dasar\n4. Persetujuan DPRD (untuk nilai tertentu)\n5. Proses lelang/negosiasi\n6. Penandatanganan akta jual beli\n7. Penyetoran hasil ke kas daerah\n8. Penerbitan SK pemindahtanganan',
        persyaratan: '1. Surat usulan pemindahtanganan\n2. Hasil penilaian aset\n3. Sertifikat/bukti kepemilikan\n4. IMB dan dokumen legalitas lainnya\n5. Foto dan denah lokasi\n6. Persetujuan DPRD (jika diperlukan)\n7. NJOP dan PBB 5 tahun terakhir\n8. Surat pernyataan tidak dalam sengketa',
        biaya: 'Sesuai peraturan lelang',
        waktu_penyelesaian: '60-90 hari kerja',
        link_url: '/downloads/formulir-pemindahtanganan.pdf',
        icon: '🤝',
        status: 1
    }
];

const retribusiData = [
    {
        kategori: 'retribusi',
        judul: 'Retribusi Izin Mendirikan Bangunan (IMB)',
        deskripsi: 'Pembayaran retribusi untuk pengurusan Izin Mendirikan Bangunan',
        prosedur: '1. Mengajukan permohonan IMB ke Dinas Penanaman Modal dan PTSP\n2. Melampirkan dokumen persyaratan lengkap\n3. Pembayaran retribusi IMB di loket BPKPAD\n4. Proses verifikasi dan survey lokasi\n5. Penerbitan IMB\n6. Pengambilan IMB di loket pelayanan',
        persyaratan: '1. Fotocopy KTP pemohon\n2. Fotocopy sertifikat tanah\n3. Gambar denah bangunan\n4. Gambar situasi lokasi\n5. Rekomendasi lingkungan/RT/RW\n6. IMB lama (untuk renovasi)',
        biaya: 'Bervariasi berdasarkan luas bangunan dan peruntukan:\n- Rumah Tinggal: Rp 50.000 - Rp 500.000\n- Ruko/Kantor: Rp 500.000 - Rp 5.000.000\n- Industri: Rp 2.000.000 - Rp 20.000.000',
        waktu_penyelesaian: '7-14 hari kerja',
        link_url: '/downloads/formulir-retribusi-imb.pdf',
        icon: '🏗️',
        status: 1
    },
    {
        kategori: 'retribusi',
        judul: 'Retribusi Izin Gangguan (HO)',
        deskripsi: 'Retribusi untuk izin tempat usaha yang menimbulkan dampak lingkungan',
        prosedur: '1. Mengajukan permohonan HO/izin gangguan\n2. Melampirkan dokumen kelengkapan\n3. Survey lapangan oleh tim teknis\n4. Pembayaran retribusi di BPKPAD\n5. Penerbitan izin gangguan (HO)\n6. Monitoring berkala oleh petugas',
        persyaratan: '1. Fotocopy KTP dan NPWP\n2. Fotocopy akta pendirian usaha\n3. Fotocopy bukti kepemilikan/sewa tempat\n4. Denah lokasi usaha\n5. IMB gedung/tempat usaha\n6. Surat pernyataan tidak keberatan dari tetangga\n7. Dokumen AMDAL/UKL-UPL (jika diperlukan)',
        biaya: 'Berdasarkan jenis dan skala usaha:\n- Usaha kecil: Rp 100.000 - Rp 500.000/tahun\n- Usaha menengah: Rp 500.000 - Rp 2.000.000/tahun\n- Usaha besar: > Rp 2.000.000/tahun',
        waktu_penyelesaian: '10-14 hari kerja',
        link_url: '/downloads/formulir-retribusi-ho.pdf',
        icon: '🏭',
        status: 1
    },
    {
        kategori: 'retribusi',
        judul: 'Retribusi Izin Trayek',
        deskripsi: 'Retribusi untuk izin operasional angkutan umum penumpang',
        prosedur: '1. Pengajuan permohonan izin trayek\n2. Pemeriksaan kelayakan kendaraan\n3. Penetapan rute dan jadwal operasional\n4. Pembayaran retribusi izin trayek\n5. Penerbitan kartu izin trayek\n6. Pemasangan plat nomor trayek',
        persyaratan: '1. Fotocopy KTP dan NPWP pemilik\n2. Fotocopy STNK dan BPKB kendaraan\n3. Hasil uji KIR (Kelayakan)\n4. Foto kendaraan tampak depan dan samping\n5. SIUP/izin usaha angkutan\n6. Surat keterangan domisili usaha\n7. Asuransi kendaraan dan penumpang',
        biaya: 'Per kendaraan per tahun:\n- Angkot/mikrolet: Rp 500.000\n- Bus kecil: Rp 1.000.000\n- Bus sedang: Rp 1.500.000\n- Bus besar: Rp 2.000.000',
        waktu_penyelesaian: '5-7 hari kerja',
        link_url: '/downloads/formulir-retribusi-trayek.pdf',
        icon: '🚌',
        status: 1
    },
    {
        kategori: 'retribusi',
        judul: 'Retribusi Tempat Rekreasi dan Olahraga',
        deskripsi: 'Retribusi masuk ke tempat wisata dan fasilitas olahraga milik daerah',
        prosedur: '1. Pembelian tiket di loket masuk\n2. Pembayaran retribusi sesuai tarif\n3. Penerimaan tiket/karcis masuk\n4. Menikmati fasilitas yang tersedia\n5. Retribusi tambahan untuk fasilitas khusus (jika ada)',
        persyaratan: 'Membawa identitas diri (untuk verifikasi tarif khusus warga lokal)',
        biaya: 'Bervariasi per lokasi:\n- Anak-anak: Rp 5.000 - Rp 15.000\n- Dewasa: Rp 10.000 - Rp 30.000\n- Kendaraan roda 2: Rp 2.000 - Rp 5.000\n- Kendaraan roda 4: Rp 5.000 - Rp 10.000\n- Tarif khusus untuk rombongan',
        waktu_penyelesaian: 'Langsung (on the spot)',
        link_url: null,
        icon: '🎡',
        status: 1
    },
    {
        kategori: 'retribusi',
        judul: 'Retribusi Pelayanan Pasar',
        deskripsi: 'Retribusi untuk penggunaan tempat berjualan di pasar tradisional milik daerah',
        prosedur: '1. Pendaftaran sebagai pedagang pasar\n2. Pemilihan/penetapan lokasi berjualan\n3. Pembayaran retribusi harian/bulanan\n4. Penerimaan karcis/kartu pedagang\n5. Pembayaran rutin sesuai periode',
        persyaratan: '1. Fotocopy KTP\n2. Pas foto 3x4 (2 lembar)\n3. Surat keterangan domisili\n4. Surat pernyataan tidak memiliki tempat usaha lain',
        biaya: 'Berdasarkan jenis dan lokasi:\n- Kios permanen: Rp 5.000 - Rp 15.000/hari\n- Los: Rp 3.000 - Rp 10.000/hari\n- Pelataran: Rp 2.000 - Rp 5.000/hari\n- Sistem bulanan: diskon 10-20%',
        waktu_penyelesaian: '1 hari kerja',
        link_url: '/downloads/formulir-retribusi-pasar.pdf',
        icon: '🏪',
        status: 1
    },
    {
        kategori: 'retribusi',
        judul: 'Retribusi Parkir Tepi Jalan Umum',
        deskripsi: 'Retribusi untuk parkir kendaraan di tepi jalan umum yang dikelola pemerintah daerah',
        prosedur: '1. Parkir kendaraan di lokasi yang ditentukan\n2. Juru parkir memberikan karcis parkir\n3. Pembayaran retribusi parkir\n4. Penyimpanan karcis hingga keluar\n5. Menunjukkan karcis saat mengambil kendaraan',
        persyaratan: 'Kendaraan bermotor dengan kelengkapan dokumen',
        biaya: 'Tarif parkir per jam:\n- Motor: Rp 2.000\n- Mobil: Rp 5.000\n- Bus/Truk: Rp 10.000\nTarif khusus untuk parkir inap',
        waktu_penyelesaian: 'Langsung (on the spot)',
        link_url: null,
        icon: '🅿️',
        status: 1
    }
];

async function main() {
    console.log('🚀 Starting seed data for Aset & Retribusi...');

    console.log('\n📋 Seeding Layanan Aset...');
    for (const data of asetData) {
        const aset = await prisma.layanan.create({
            data: {
                ...data,
                tgl_update: new Date(),
                user: 'admin'
            }
        });
        console.log(`✅ Created: ${aset.judul}`);
    }

    console.log('\n💰 Seeding Layanan Retribusi...');
    for (const data of retribusiData) {
        const retribusi = await prisma.layanan.create({
            data: {
                ...data,
                tgl_update: new Date(),
                user: 'admin'
            }
        });
        console.log(`✅ Created: ${retribusi.judul}`);
    }

    console.log('\n✅ Seeding completed!');
    console.log(`📊 Total: ${asetData.length} Aset + ${retribusiData.length} Retribusi = ${asetData.length + retribusiData.length} records`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
