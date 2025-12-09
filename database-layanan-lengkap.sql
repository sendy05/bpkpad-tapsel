-- ===================================================
-- SQL Script untuk Tabel Layanan, Agenda, Kontak, Data Statistik
-- Database: db_web_bpkpad
-- ===================================================

USE db_web_bpkpad;

-- Drop tables jika sudah ada (uncomment jika ingin reset)
-- DROP TABLE IF EXISTS layanan;
-- DROP TABLE IF EXISTS agenda;
-- DROP TABLE IF EXISTS kontak;
-- DROP TABLE IF EXISTS data_statistik;

-- ===================================================
-- TABEL LAYANAN
-- ===================================================
CREATE TABLE IF NOT EXISTS layanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kategori VARCHAR(100) NOT NULL COMMENT 'retribusi, aset, pengaduan, dll',
    judul VARCHAR(225) NOT NULL,
    deskripsi TEXT,
    prosedur TEXT,
    persyaratan TEXT,
    biaya VARCHAR(200),
    waktu_penyelesaian VARCHAR(100),
    link_url VARCHAR(255),
    icon VARCHAR(100),
    status INT DEFAULT 1 COMMENT '1=Active, 0=Inactive',
    tgl_update DATETIME,
    user VARCHAR(100)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Sample data Layanan
INSERT INTO
    layanan (
        kategori,
        judul,
        deskripsi,
        prosedur,
        persyaratan,
        biaya,
        waktu_penyelesaian,
        link_url,
        icon,
        status,
        tgl_update,
        user
    )
VALUES (
        'retribusi',
        'Pelayanan Retribusi Daerah',
        'Layanan pembayaran retribusi daerah termasuk retribusi pasar, parkir, dan kebersihan',
        '1. Isi formulir permohonan\n2. Lampirkan dokumen persyaratan\n3. Bayar di kasir\n4. Terima bukti pembayaran',
        '- KTP/Identitas\n- Surat Keterangan Usaha\n- NPWPD',
        'Sesuai Perda yang berlaku',
        '1-2 hari kerja',
        'https://retribusi.bpkpad.go.id',
        'receipt',
        1,
        NOW(),
        'admin'
    ),
    (
        'retribusi',
        'Retribusi Tempat Rekreasi',
        'Pembayaran retribusi untuk pengelola tempat rekreasi dan wisata',
        '1. Daftar online atau datang langsung\n2. Isi formulir dan lampirkan dokumen\n3. Verifikasi petugas\n4. Bayar sesuai tarif\n5. Terima bukti retribusi',
        '- Identitas pengelola\n- Izin usaha tempat rekreasi\n- NPWPD\n- Dokumen kepemilikan',
        'Sesuai Perda Kabupaten Tapanuli Selatan',
        '3 hari kerja',
        NULL,
        'tree',
        1,
        NOW(),
        'admin'
    ),
    (
        'aset',
        'Pendaftaran Aset Daerah',
        'Layanan pendaftaran dan pendataan aset milik Pemerintah Daerah',
        '1. Pengajuan surat permohonan\n2. Verifikasi dokumen kepemilikan\n3. Survey lokasi\n4. Penilaian aset\n5. Penerbitan sertifikat',
        '- Surat permohonan\n- Dokumen kepemilikan\n- Foto aset\n- Peta lokasi',
        'Gratis',
        '5-7 hari kerja',
        NULL,
        'building',
        1,
        NOW(),
        'admin'
    ),
    (
        'aset',
        'Penilaian Aset Daerah',
        'Layanan penilaian aset untuk pengelolaan BMD (Barang Milik Daerah)',
        '1. Ajukan permohonan penilaian\n2. Tim melakukan survey\n3. Analisis nilai aset\n4. Penerbitan laporan penilaian',
        '- SK Penugasan\n- Data aset yang akan dinilai\n- Dokumen pendukung',
        'Gratis',
        '7-14 hari kerja',
        NULL,
        'chart-bar',
        1,
        NOW(),
        'admin'
    ),
    (
        'pengaduan',
        'Pengaduan Pajak Online',
        'Layanan pengaduan terkait pajak daerah dan retribusi',
        '1. Isi formulir pengaduan online\n2. Upload bukti pendukung\n3. Tunggu verifikasi petugas\n4. Tindak lanjut dan penyelesaian\n5. Notifikasi hasil',
        '- Identitas pengadu\n- Uraian pengaduan\n- Bukti pendukung (jika ada)',
        'Gratis',
        'Maksimal 7 hari kerja',
        'https://pengaduan.bpkpad.go.id',
        'megaphone',
        1,
        NOW(),
        'admin'
    ),
    (
        'pengaduan',
        'Pengaduan Pelayanan Publik',
        'Saluran pengaduan untuk pelayanan BPKPAD yang kurang memuaskan',
        '1. Sampaikan pengaduan via online/offline\n2. Petugas mencatat dan verifikasi\n3. Investigasi dan tindak lanjut\n4. Pemberitahuan hasil kepada pengadu',
        '- Nama dan kontak pengadu\n- Detail pengaduan\n- Bukti (opsional)',
        'Gratis',
        '3-5 hari kerja',
        NULL,
        'alert-circle',
        1,
        NOW(),
        'admin'
    );

-- ===================================================
-- TABEL AGENDA
-- ===================================================
CREATE TABLE IF NOT EXISTS agenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(225) NOT NULL,
    deskripsi TEXT,
    tanggal_mulai DATETIME NOT NULL,
    tanggal_selesai DATETIME,
    lokasi VARCHAR(255),
    penyelenggara VARCHAR(200),
    kategori VARCHAR(100) COMMENT 'rapat, sosialisasi, pelatihan, dll',
    foto VARCHAR(255),
    status VARCHAR(50) DEFAULT 'upcoming' COMMENT 'upcoming, ongoing, completed',
    tgl_update DATETIME,
    user VARCHAR(100)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Sample data Agenda
INSERT INTO
    agenda (
        judul,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
        lokasi,
        penyelenggara,
        kategori,
        status,
        tgl_update,
        user
    )
VALUES (
        'Rapat Koordinasi Pajak Daerah Q1 2025',
        'Rapat koordinasi evaluasi penerimaan pajak daerah kuartal 1 tahun 2025',
        '2025-01-15 08:00:00',
        '2025-01-15 12:00:00',
        'Ruang Rapat BPKPAD Tapanuli Selatan',
        'Kepala BPKPAD',
        'rapat',
        'upcoming',
        NOW(),
        'admin'
    ),
    (
        'Sosialisasi Pajak PBB-P2 2025',
        'Sosialisasi pembayaran Pajak Bumi dan Bangunan Perdesaan dan Perkotaan tahun 2025',
        '2025-01-20 09:00:00',
        '2025-01-20 15:00:00',
        'Aula Kantor Bupati',
        'Bidang Pendapatan',
        'sosialisasi',
        'upcoming',
        NOW(),
        'admin'
    ),
    (
        'Pelatihan E-Samsat untuk Petugas',
        'Pelatihan penggunaan sistem E-Samsat bagi petugas pelayanan',
        '2025-02-05 08:00:00',
        '2025-02-07 16:00:00',
        'Hotel Grand Padangsidimpuan',
        'Bidang Data dan Informasi',
        'pelatihan',
        'upcoming',
        NOW(),
        'admin'
    ),
    (
        'Workshop Penilaian Aset Daerah',
        'Workshop tentang teknis penilaian dan pengelolaan aset milik daerah',
        '2025-02-12 08:30:00',
        '2025-02-13 16:00:00',
        'Aula BPKPAD',
        'Bidang Aset',
        'pelatihan',
        'upcoming',
        NOW(),
        'admin'
    ),
    (
        'Rapat Evaluasi LAKIP 2024',
        'Rapat evaluasi Laporan Akuntabilitas Kinerja Instansi Pemerintah tahun 2024',
        '2024-12-10 09:00:00',
        '2024-12-10 14:00:00',
        'Ruang Rapat Utama',
        'Sekretaris BPKPAD',
        'rapat',
        'completed',
        NOW(),
        'admin'
    );

-- ===================================================
-- TABEL KONTAK
-- ===================================================
CREATE TABLE IF NOT EXISTS kontak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kategori VARCHAR(100) NOT NULL COMMENT 'kantor, bidang, layanan',
    nama VARCHAR(200) NOT NULL,
    jabatan VARCHAR(200),
    telepon VARCHAR(50),
    email VARCHAR(100),
    alamat TEXT,
    jam_operasional VARCHAR(200),
    map_url TEXT,
    urutan INT DEFAULT 0,
    status INT DEFAULT 1,
    tgl_update DATETIME,
    user VARCHAR(100)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Sample data Kontak
INSERT INTO
    kontak (
        kategori,
        nama,
        jabatan,
        telepon,
        email,
        alamat,
        jam_operasional,
        urutan,
        status,
        tgl_update,
        user
    )
VALUES (
        'kantor',
        'BPKPAD Tapanuli Selatan',
        'Kantor Pusat',
        '0633-21234',
        'bpkpad@tapselkab.go.id',
        'Jl. Sisingamangaraja No. 1 Padangsidimpuan',
        'Senin-Jumat: 08:00 - 16:00 WIB',
        1,
        1,
        NOW(),
        'admin'
    ),
    (
        'bidang',
        'Bidang Pendapatan',
        'Kepala Bidang Pendapatan',
        '0633-21234 ext. 101',
        'pendapatan@bpkpad.go.id',
        'BPKPAD Tapanuli Selatan',
        'Senin-Jumat: 08:00 - 16:00 WIB',
        2,
        1,
        NOW(),
        'admin'
    ),
    (
        'bidang',
        'Bidang Aset',
        'Kepala Bidang Aset',
        '0633-21234 ext. 102',
        'aset@bpkpad.go.id',
        'BPKPAD Tapanuli Selatan',
        'Senin-Jumat: 08:00 - 16:00 WIB',
        3,
        1,
        NOW(),
        'admin'
    ),
    (
        'bidang',
        'Bidang Data dan Informasi',
        'Kepala Bidang Data',
        '0633-21234 ext. 103',
        'data@bpkpad.go.id',
        'BPKPAD Tapanuli Selatan',
        'Senin-Jumat: 08:00 - 16:00 WIB',
        4,
        1,
        NOW(),
        'admin'
    ),
    (
        'layanan',
        'Hotline Pengaduan',
        'Pengaduan 24 Jam',
        '0811-6543-210',
        'pengaduan@bpkpad.go.id',
        'Online / Telepon',
        '24 Jam (Senin-Minggu)',
        5,
        1,
        NOW(),
        'admin'
    ),
    (
        'layanan',
        'WhatsApp Center',
        'Informasi & Layanan',
        '0812-6543-210',
        'cs@bpkpad.go.id',
        'Chat WhatsApp',
        'Senin-Jumat: 08:00 - 20:00 WIB',
        6,
        1,
        NOW(),
        'admin'
    );

-- ===================================================
-- TABEL DATA STATISTIK
-- ===================================================
CREATE TABLE IF NOT EXISTS data_statistik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kategori VARCHAR(100) NOT NULL COMMENT 'pajak, retribusi, aset, pendapatan',
    judul VARCHAR(225) NOT NULL,
    deskripsi TEXT,
    periode VARCHAR(100) COMMENT 'Bulan/Tahun',
    nilai DECIMAL(20, 2),
    satuan VARCHAR(50) COMMENT 'Rupiah, Unit, Persentase',
    file_data VARCHAR(255),
    tahun INT,
    bulan INT,
    tgl_update DATETIME,
    user VARCHAR(100)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Sample data Data Statistik
INSERT INTO
    data_statistik (
        kategori,
        judul,
        deskripsi,
        periode,
        nilai,
        satuan,
        tahun,
        bulan,
        tgl_update,
        user
    )
VALUES (
        'pajak',
        'Penerimaan Pajak Hotel',
        'Total penerimaan pajak hotel bulan November 2024',
        'November 2024',
        125000000.00,
        'Rupiah',
        2024,
        11,
        NOW(),
        'admin'
    ),
    (
        'pajak',
        'Penerimaan Pajak Restoran',
        'Total penerimaan pajak restoran bulan November 2024',
        'November 2024',
        85000000.00,
        'Rupiah',
        2024,
        11,
        NOW(),
        'admin'
    ),
    (
        'pajak',
        'Penerimaan PBB-P2',
        'Total penerimaan Pajak Bumi dan Bangunan November 2024',
        'November 2024',
        450000000.00,
        'Rupiah',
        2024,
        11,
        NOW(),
        'admin'
    ),
    (
        'retribusi',
        'Retribusi Pasar',
        'Penerimaan retribusi pasar November 2024',
        'November 2024',
        35000000.00,
        'Rupiah',
        2024,
        11,
        NOW(),
        'admin'
    ),
    (
        'retribusi',
        'Retribusi Parkir',
        'Penerimaan retribusi parkir November 2024',
        'November 2024',
        18000000.00,
        'Rupiah',
        2024,
        11,
        NOW(),
        'admin'
    ),
    (
        'aset',
        'Jumlah Aset Daerah',
        'Total aset milik Pemerintah Daerah yang terdaftar',
        'Tahun 2024',
        1250.00,
        'Unit',
        2024,
        NULL,
        NOW(),
        'admin'
    ),
    (
        'aset',
        'Nilai Aset Daerah',
        'Total nilai aset milik Pemerintah Daerah',
        'Tahun 2024',
        125000000000.00,
        'Rupiah',
        2024,
        NULL,
        NOW(),
        'admin'
    ),
    (
        'pendapatan',
        'Total Pendapatan Daerah',
        'Akumulasi total pendapatan daerah tahun 2024',
        'Tahun 2024',
        75000000000.00,
        'Rupiah',
        2024,
        NULL,
        NOW(),
        'admin'
    ),
    (
        'pendapatan',
        'Target vs Realisasi',
        'Persentase pencapaian target pendapatan',
        'Tahun 2024',
        87.5,
        'Persentase',
        2024,
        NULL,
        NOW(),
        'admin'
    );

-- Selesai!
-- Total: 4 tabel baru (layanan, agenda, kontak, data_statistik)
-- Sample data: 6 layanan + 5 agenda + 6 kontak + 9 data statistik