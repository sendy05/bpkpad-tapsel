-- Script SQL untuk membuat tabel profil
-- Jalankan di database MySQL Anda
-- Database: db_web_bpkpad

USE db_web_bpkpad;

-- Drop tables jika sudah ada (opsional, comment jika ingin preserve data)
-- DROP TABLE IF EXISTS prestasi_organisasi;
-- DROP TABLE IF EXISTS sop_dokumen;
-- DROP TABLE IF EXISTS pejabat;
-- DROP TABLE IF EXISTS struktur_organisasi;
-- DROP TABLE IF EXISTS profil_organisasi;

-- Tabel Profil Organisasi (Visi, Misi, Tupoksi)
CREATE TABLE IF NOT EXISTS profil_organisasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    visi TEXT,
    misi TEXT,
    sejarah TEXT,
    tugas_pokok TEXT,
    tgl_update DATETIME,
    user VARCHAR(100),
    INDEX idx_id (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Tabel Struktur Organisasi
CREATE TABLE IF NOT EXISTS struktur_organisasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gambar VARCHAR(200),
    keterangan TEXT,
    tgl_update DATETIME,
    user VARCHAR(100),
    INDEX idx_id (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Tabel Pejabat
CREATE TABLE IF NOT EXISTS pejabat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(200) NOT NULL,
    jabatan VARCHAR(200) NOT NULL,
    foto VARCHAR(200),
    nip VARCHAR(50),
    email VARCHAR(100),
    telepon VARCHAR(50),
    urutan INT DEFAULT 0,
    status INT DEFAULT 1,
    tgl_update DATETIME,
    user VARCHAR(100),
    INDEX idx_urutan (urutan),
    INDEX idx_status (status)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Tabel SOP Dokumen
CREATE TABLE IF NOT EXISTS sop_dokumen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(225) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    file VARCHAR(200),
    deskripsi TEXT,
    nomor VARCHAR(50),
    tgl_terbit DATE,
    status INT DEFAULT 1,
    tgl_update DATETIME,
    user VARCHAR(100),
    INDEX idx_status (status),
    INDEX idx_kategori (kategori)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Tabel Prestasi Organisasi
CREATE TABLE IF NOT EXISTS prestasi_organisasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(225) NOT NULL,
    deskripsi TEXT,
    pemberi VARCHAR(200),
    tanggal DATE NOT NULL,
    kategori VARCHAR(100),
    foto VARCHAR(200),
    tgl_update DATETIME,
    user VARCHAR(100),
    INDEX idx_tanggal (tanggal DESC)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Insert sample data untuk testing

-- Sample Profil Organisasi
INSERT INTO
    profil_organisasi (
        visi,
        misi,
        sejarah,
        tugas_pokok,
        tgl_update,
        user
    )
VALUES (
        '<h2>Visi BPKPAD</h2><p>Menjadi organisasi pengelola keuangan dan aset daerah yang profesional, akuntabel, dan transparan untuk kesejahteraan masyarakat Tapanuli Selatan</p>',
        '<h2>Misi BPKPAD</h2><ul><li>Meningkatkan Pendapatan Asli Daerah (PAD) secara optimal dan berkelanjutan</li><li>Mengelola keuangan daerah secara transparan dan akuntabel</li><li>Mengoptimalkan pengelolaan aset daerah</li><li>Meningkatkan kualitas pelayanan publik</li><li>Membangun sistem informasi keuangan yang terintegrasi</li></ul>',
        '<p>BPKPAD Kabupaten Tapanuli Selatan dibentuk berdasarkan Peraturan Daerah untuk mengelola keuangan dan aset daerah secara profesional dan akuntabel.</p>',
        '<h3>Tugas Pokok:</h3><ul><li>Mengelola pendapatan daerah</li><li>Mengelola belanja daerah</li><li>Mengelola pembiayaan daerah</li><li>Mengelola aset daerah</li></ul>',
        NOW(),
        'admin'
    );

-- Sample Pejabat
INSERT INTO
    pejabat (
        nama,
        jabatan,
        nip,
        email,
        telepon,
        urutan,
        status,
        tgl_update,
        user
    )
VALUES (
        'Dr. H. Ahmad Supardi, S.E., M.M.',
        'Kepala Badan',
        '196505101990031008',
        'kepala@bpkpad-tapse.go.id',
        '081234567890',
        1,
        1,
        NOW(),
        'admin'
    ),
    (
        'Ir. Siti Aminah, M.Si.',
        'Sekretaris',
        '197012121995032004',
        'sekretaris@bpkpad-tapse.go.id',
        '081234567891',
        2,
        1,
        NOW(),
        'admin'
    ),
    (
        'Drs. Budi Santoso, M.M.',
        'Kepala Bidang Pendapatan',
        '196808151993031006',
        'bidang1@bpkpad-tapse.go.id',
        '081234567892',
        3,
        1,
        NOW(),
        'admin'
    ),
    (
        'Ir. Lestari Wulandari, S.E.',
        'Kepala Bidang Anggaran',
        '197505051998032003',
        'bidang2@bpkpad-tapse.go.id',
        '081234567893',
        4,
        1,
        NOW(),
        'admin'
    ),
    (
        'H. Muhammad Yusuf, S.H., M.H.',
        'Kepala Bidang Aset',
        '196909091994031005',
        'bidang3@bpkpad-tapse.go.id',
        '081234567894',
        5,
        1,
        NOW(),
        'admin'
    );

-- Sample SOP
INSERT INTO
    sop_dokumen (
        judul,
        kategori,
        deskripsi,
        nomor,
        tgl_terbit,
        status,
        tgl_update,
        user
    )
VALUES (
        'SOP Pelayanan Pajak Daerah',
        'Pajak',
        'Standar operasional prosedur untuk pelayanan pajak daerah',
        '001/SOP/BPKPAD/2025',
        '2025-01-01',
        1,
        NOW(),
        'admin'
    ),
    (
        'SOP Pengelolaan Aset Daerah',
        'Aset',
        'Prosedur pengelolaan dan inventarisasi aset daerah',
        '002/SOP/BPKPAD/2025',
        '2025-01-01',
        1,
        NOW(),
        'admin'
    ),
    (
        'Maklumat Pelayanan',
        'Maklumat',
        'Komitmen BPKPAD dalam memberikan pelayanan terbaik',
        '001/MAK/BPKPAD/2025',
        '2025-01-01',
        1,
        NOW(),
        'admin'
    ),
    (
        'SOP Pengelolaan Retribusi',
        'Retribusi',
        'Prosedur pengelolaan retribusi daerah',
        '003/SOP/BPKPAD/2025',
        '2025-01-01',
        1,
        NOW(),
        'admin'
    );

-- Sample Prestasi
INSERT INTO
    prestasi_organisasi (
        judul,
        deskripsi,
        pemberi,
        tanggal,
        kategori,
        tgl_update,
        user
    )
VALUES (
        'Juara 1 Pengelolaan Keuangan Daerah Terbaik',
        'Penghargaan diberikan atas keberhasilan mengelola keuangan daerah secara transparan dan akuntabel dengan WTP 5 tahun berturut-turut',
        'Kementerian Dalam Negeri RI',
        '2024-12-10',
        'Keuangan',
        NOW(),
        'admin'
    ),
    (
        'Penghargaan Opini WTP dari BPK',
        'Memperoleh opini Wajar Tanpa Pengecualian untuk laporan keuangan tahun 2024',
        'Badan Pemeriksa Keuangan RI',
        '2024-06-15',
        'Audit',
        NOW(),
        'admin'
    ),
    (
        'Juara 2 Inovasi Pelayanan Publik',
        'Penghargaan untuk aplikasi e-Pajak Online yang memudahkan wajib pajak',
        'Gubernur Sumatera Utara',
        '2024-08-17',
        'Inovasi',
        NOW(),
        'admin'
    ),
    (
        'Satya Lencana Karya Satya XX Tahun',
        'Penghargaan kesetiaan dan pengabdian kepada negara',
        'Presiden RI',
        '2024-10-05',
        'Dedikasi',
        NOW(),
        'admin'
    );

-- Sample Struktur Organisasi
INSERT INTO
    struktur_organisasi (keterangan, tgl_update, user)
VALUES (
        'Struktur Organisasi BPKPAD Kabupaten Tapanuli Selatan berdasarkan Perda No. X Tahun 2024',
        NOW(),
        'admin'
    );