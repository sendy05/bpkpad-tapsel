import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding layanan data...');

    // Clear existing layanan data
    await prisma.layanan.deleteMany({});

    // Seed Retribusi Layanan
    const retribusiData = [
        {
            kategori: 'retribusi',
            judul: 'Retribusi Parkir Kendaraan',
            deskripsi:
                'Layanan pembayaran retribusi parkir kendaraan di area parkir umum yang dikelola oleh pemerintah daerah.',
            prosedur: `1. Datang ke lokasi parkir yang telah ditentukan
2. Ambil karcis parkir dari petugas
3. Parkir kendaraan di tempat yang tersedia
4. Saat keluar, bayar retribusi sesuai tarif
5. Serahkan karcis dan terima kembali kendaraan`,
            persyaratan: `• Kendaraan bermotor yang sah
• Membawa STNK
• Helm untuk kendaraan roda dua`,
            biaya: 'Rp 2.000 - Rp 5.000',
            waktu_penyelesaian: 'Langsung',
            link_url: null,
            icon: 'Car',
            status: 1,
            tgl_update: new Date(),
            user: 'admin',
        },
        {
            kategori: 'retribusi',
            judul: 'Retribusi Pelayanan Pasar',
            deskripsi:
                'Pembayaran retribusi untuk pedagang yang menggunakan fasilitas pasar tradisional.',
            prosedur: `1. Datang ke kantor pengelola pasar
2. Isi formulir pendaftaran pedagang
3. Serahkan persyaratan yang dibutuhkan
4. Lakukan pembayaran retribusi
5. Terima tanda bukti pembayaran dan kunci kios/los`,
            persyaratan: `• KTP asli dan fotocopy
• Surat keterangan usaha
• Pas foto 3x4 sebanyak 2 lembar
• Materai 10.000`,
            biaya: 'Rp 5.000 - Rp 15.000/hari',
            waktu_penyelesaian: '1 hari kerja',
            link_url: null,
            icon: 'Store',
            status: 1,
            tgl_update: new Date(),
            user: 'admin',
        },
        {
            kategori: 'retribusi',
            judul: 'Retribusi Izin Mendirikan Bangunan (IMB)',
            deskripsi:
                'Layanan pengurusan retribusi untuk izin mendirikan bangunan sesuai peraturan daerah.',
            prosedur: `1. Datang ke kantor BPKPAD
2. Ambil dan isi formulir permohonan IMB
3. Serahkan dokumen persyaratan
4. Tunggu proses verifikasi dan survey lokasi
5. Bayar retribusi sesuai perhitungan
6. Terima Surat Keputusan IMB`,
            persyaratan: `• Fotocopy KTP pemohon
• Fotocopy sertifikat tanah
• Gambar rencana bangunan (site plan, denah, tampak)
• Fotocopy PBB tahun terakhir
• Surat pernyataan tidak keberatan dari tetangga
• Foto lokasi bangunan`,
            biaya: 'Sesuai luas dan fungsi bangunan',
            waktu_penyelesaian: '7-14 hari kerja',
            link_url: null,
            icon: 'Building',
            status: 1,
            tgl_update: new Date(),
            user: 'admin',
        },
    ];

    // Seed Aset Layanan
    const asetData = [
        {
            kategori: 'aset',
            judul: 'Pendaftaran Barang Milik Daerah',
            deskripsi:
                'Layanan pendaftaran dan inventarisasi barang milik daerah untuk keperluan administrasi.',
            prosedur: `1. Siapkan dokumen barang milik daerah
2. Datang ke kantor BPKPAD bagian aset
3. Isi formulir pendaftaran barang
4. Serahkan dokumen pendukung
5. Petugas melakukan verifikasi
6. Terima tanda bukti pendaftaran`,
            persyaratan: `• Surat perolehan barang
• Spesifikasi teknis barang
• Bukti pembayaran (jika ada)
• Foto barang
• Surat penugasan dari SKPD`,
            biaya: 'Gratis',
            waktu_penyelesaian: '2-3 hari kerja',
            link_url: null,
            icon: 'Package',
            status: 1,
            tgl_update: new Date(),
            user: 'admin',
        },
        {
            kategori: 'aset',
            judul: 'Peminjaman Aset Daerah',
            deskripsi:
                'Layanan peminjaman aset daerah untuk kegiatan pemerintahan atau kepentingan umum.',
            prosedur: `1. Ajukan surat permohonan peminjaman
2. Datang ke kantor BPKPAD dengan surat permohonan
3. Isi formulir peminjaman aset
4. Tunggu persetujuan dari kepala BPKPAD
5. Tandatangani berita acara peminjaman
6. Terima aset yang dipinjam`,
            persyaratan: `• Surat permohonan dari instansi/organisasi
• Proposal kegiatan
• KTP penanggung jawab
• Surat jaminan pengembalian
• Fotocopy NPWP lembaga`,
            biaya: 'Gratis',
            waktu_penyelesaian: '3-5 hari kerja',
            link_url: null,
            icon: 'HandHeart',
            status: 1,
            tgl_update: new Date(),
            user: 'admin',
        },
        {
            kategori: 'aset',
            judul: 'Pelaporan Kondisi Aset Daerah',
            deskripsi:
                'Layanan pelaporan kondisi aset daerah untuk pemeliharaan dan penghapusan.',
            prosedur: `1. Identifikasi kondisi aset yang perlu dilaporkan
2. Isi formulir pelaporan kondisi aset
3. Lampirkan foto kondisi aset terkini
4. Kirim laporan ke BPKPAD via online atau langsung
5. Tunggu tindak lanjut dari BPKPAD`,
            persyaratan: `• Kode aset/nomor registrasi
• Foto kondisi aset
• Kronologi kerusakan (jika ada)
• Surat keterangan dari SKPD pengguna`,
            biaya: 'Gratis',
            waktu_penyelesaian: '1-2 hari kerja',
            link_url: null,
            icon: 'ClipboardCheck',
            status: 1,
            tgl_update: new Date(),
            user: 'admin',
        },
    ];

    // Seed Pengaduan Layanan
    const pengaduanData = [
        {
            kategori: 'pengaduan',
            judul: 'Pengaduan Pelayanan Publik',
            deskripsi:
                'Layanan penerimaan pengaduan masyarakat terkait pelayanan publik yang diberikan oleh BPKPAD.',
            prosedur: `1. Siapkan bukti atau data terkait pengaduan
2. Kunjungi kantor BPKPAD atau akses website
3. Isi formulir pengaduan dengan lengkap
4. Upload dokumen pendukung (jika ada)
5. Submit pengaduan
6. Terima nomor registrasi pengaduan
7. Pantau status pengaduan secara berkala`,
            persyaratan: `• Identitas pengadu (KTP/data diri)
• Uraian pengaduan yang jelas
• Bukti pendukung (foto, dokumen, dll)
• Nomor kontak yang dapat dihubungi`,
            biaya: 'Gratis',
            waktu_penyelesaian: '7-14 hari kerja',
            link_url: 'https://pengaduan.example.com',
            icon: 'MessageCircle',
            status: 1,
            tgl_update: new Date(),
            user: 'admin',
        },
        {
            kategori: 'pengaduan',
            judul: 'Pengaduan Retribusi Tidak Wajar',
            deskripsi:
                'Layanan pengaduan untuk kasus pungutan retribusi yang tidak sesuai dengan ketentuan.',
            prosedur: `1. Catat detail kejadian pungutan yang tidak wajar
2. Kumpulkan bukti pembayaran atau foto
3. Datang ke kantor BPKPAD atau hubungi hotline
4. Sampaikan kronologi kejadian
5. Serahkan bukti yang ada
6. Terima tanda bukti pengaduan
7. Tunggu investigasi dan tindak lanjut`,
            persyaratan: `• Identitas pengadu
• Bukti pembayaran atau karcis
• Foto atau video (jika ada)
• Tempat dan waktu kejadian
• Identitas petugas (jika diketahui)`,
            biaya: 'Gratis',
            waktu_penyelesaian: '3-7 hari kerja',
            link_url: null,
            icon: 'AlertTriangle',
            status: 1,
            tgl_update: new Date(),
            user: 'admin',
        },
        {
            kategori: 'pengaduan',
            judul: 'Pengaduan Pengelolaan Aset',
            deskripsi:
                'Layanan pengaduan terkait pengelolaan aset daerah yang tidak sesuai prosedur.',
            prosedur: `1. Identifikasi masalah pengelolaan aset
2. Kumpulkan data dan bukti
3. Isi formulir pengaduan pengelolaan aset
4. Lampirkan foto atau dokumen pendukung
5. Submit melalui online atau datang langsung
6. Dapatkan nomor tiket pengaduan
7. Pantau penanganan pengaduan`,
            persyaratan: `• Data aset yang diadukan (kode/nomor)
• Lokasi aset
• Kronologi masalah
• Foto kondisi aset
• Kontak pengadu`,
            biaya: 'Gratis',
            waktu_penyelesaian: '5-10 hari kerja',
            link_url: null,
            icon: 'ShieldAlert',
            status: 1,
            tgl_update: new Date(),
            user: 'admin',
        },
    ];

    // Insert all data
    const allLayanan = [...retribusiData, ...asetData, ...pengaduanData];

    for (const layanan of allLayanan) {
        await prisma.layanan.create({
            data: layanan,
        });
    }

    console.log(`✅ Seeded ${allLayanan.length} layanan successfully!`);
    console.log(`   - Retribusi: ${retribusiData.length}`);
    console.log(`   - Aset: ${asetData.length}`);
    console.log(`   - Pengaduan: ${pengaduanData.length}`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('Error seeding data:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
