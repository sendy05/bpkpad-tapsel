-- ===================================================
-- SQL Script untuk Tabel PPID (Informasi Publik)
-- Database: db_web_bpkpad
-- ===================================================

USE db_web_bpkpad;

-- Drop table jika sudah ada (uncomment jika ingin reset)
-- DROP TABLE IF EXISTS informasi_publik;

-- Tabel Informasi Publik (PPID)
CREATE TABLE IF NOT EXISTS informasi_publik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kategori VARCHAR(50) NOT NULL COMMENT 'BERKALA, SERTA_MERTA, SETIAP_SAAT',
    judul VARCHAR(225) NOT NULL,
    ringkasan TEXT,
    pejabatPengelola VARCHAR(200) NOT NULL,
    tanggalPublikasi DATE NOT NULL,
    fileUrl VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Draft' COMMENT 'Draft, Published, Archived',
    tgl_update DATETIME,
    user VARCHAR(100)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Insert sample data untuk testing
-- Kategori: BERKALA (disediakan secara berkala minimal setiap 6 bulan)
INSERT INTO
    informasi_publik (
        kategori,
        judul,
        ringkasan,
        pejabatPengelola,
        tanggalPublikasi,
        fileUrl,
        status,
        tgl_update,
        user
    )
VALUES (
        'BERKALA',
        'Laporan Keuangan Semester I Tahun 2024',
        'Laporan keuangan BPKPAD Tapanuli Selatan periode Januari-Juni 2024 termasuk realisasi anggaran dan neraca keuangan',
        'Kasubag Keuangan',
        '2024-07-15',
        '/uploads/ppid/lap-keuangan-s1-2024.pdf',
        'Published',
        NOW(),
        'admin'
    ),
    (
        'BERKALA',
        'Daftar Informasi Publik (DIP) 2024',
        'Daftar lengkap informasi publik yang wajib disediakan oleh BPKPAD sesuai UU No. 14 Tahun 2008',
        'PPID BPKPAD',
        '2024-01-10',
        '/uploads/ppid/dip-2024.pdf',
        'Published',
        NOW(),
        'admin'
    ),
    (
        'BERKALA',
        'LAKIP (Laporan Akuntabilitas Kinerja Instansi Pemerintah) 2023',
        'Laporan pertanggungjawaban kinerja BPKPAD Tapanuli Selatan tahun 2023',
        'Sekretaris BPKPAD',
        '2024-03-20',
        '/uploads/ppid/lakip-2023.pdf',
        'Published',
        NOW(),
        'admin'
    ),
    (
        'BERKALA',
        'Rencana Kerja dan Anggaran (RKA) Tahun 2025',
        'Dokumen perencanaan anggaran BPKPAD untuk tahun anggaran 2025',
        'Kasubag Perencanaan',
        '2024-11-05',
        '/uploads/ppid/rka-2025.pdf',
        'Published',
        NOW(),
        'admin'
    ),
    (
        'BERKALA',
        'Profil Singkat BPKPAD Tapanuli Selatan',
        'Informasi umum tentang tugas, fungsi, struktur organisasi, dan program kerja BPKPAD',
        'Sekretaris BPKPAD',
        '2024-02-01',
        '/uploads/ppid/profil-bpkpad.pdf',
        'Published',
        NOW(),
        'admin'
    );

-- Kategori: SERTA_MERTA (wajib diumumkan segera)
INSERT INTO
    informasi_publik (
        kategori,
        judul,
        ringkasan,
        pejabatPengelola,
        tanggalPublikasi,
        fileUrl,
        status,
        tgl_update,
        user
    )
VALUES (
        'SERTA_MERTA',
        'Perubahan Jadwal Pembayaran PBB 2024',
        'Pengumuman perubahan jadwal dan tata cara pembayaran Pajak Bumi dan Bangunan tahun 2024 karena sistem maintenance',
        'Kepala Bidang Pendapatan',
        '2024-11-20',
        '/uploads/ppid/perubahan-jadwal-pbb.pdf',
        'Published',
        NOW(),
        'admin'
    ),
    (
        'SERTA_MERTA',
        'Pengumuman Pemadaman Sistem e-BPKPAD',
        'Pemberitahuan pemadaman sistem e-BPKPAD untuk maintenance server tanggal 25-26 November 2024',
        'Kepala Bidang Data dan Informasi',
        '2024-11-18',
        '/uploads/ppid/pemadaman-sistem.pdf',
        'Published',
        NOW(),
        'admin'
    ),
    (
        'SERTA_MERTA',
        'Himbauan Kepatuhan Pajak Hotel & Restoran',
        'Imbauan kepada wajib pajak hotel dan restoran untuk segera melaporkan dan membayar pajak tepat waktu',
        'Kepala Bidang Penagihan',
        '2024-10-15',
        '/uploads/ppid/himbauan-pajak-hr.pdf',
        'Published',
        NOW(),
        'admin'
    );

-- Kategori: SETIAP_SAAT (dapat diakses kapan saja)
INSERT INTO
    informasi_publik (
        kategori,
        judul,
        ringkasan,
        pejabatPengelola,
        tanggalPublikasi,
        fileUrl,
        status,
        tgl_update,
        user
    )
VALUES (
        'SETIAP_SAAT',
        'Standar Operasional Prosedur (SOP) Pelayanan Pajak',
        'SOP lengkap untuk berbagai jenis pelayanan perpajakan daerah di BPKPAD Tapanuli Selatan',
        'Sekretaris BPKPAD',
        '2024-01-15',
        '/uploads/ppid/sop-pelayanan.pdf',
        'Published',
        NOW(),
        'admin'
    ),
    (
        'SETIAP_SAAT',
        'Formulir Permohonan Informasi Publik',
        'Formulir yang dapat diunduh untuk mengajukan permohonan informasi publik kepada PPID BPKPAD',
        'PPID BPKPAD',
        '2024-01-05',
        '/uploads/ppid/form-permohonan-info.pdf',
        'Published',
        NOW(),
        'admin'
    ),
    (
        'SETIAP_SAAT',
        'Daftar Peraturan Daerah tentang Pajak',
        'Kumpulan peraturan daerah yang mengatur pajak dan retribusi di Tapanuli Selatan',
        'Kepala Bidang Hukum',
        '2024-02-10',
        '/uploads/ppid/perda-pajak.pdf',
        'Published',
        NOW(),
        'admin'
    ),
    (
        'SETIAP_SAAT',
        'Panduan Layanan BPKPAD',
        'Panduan lengkap tentang cara mengakses layanan BPKPAD baik online maupun offline',
        'Kasubag Umum',
        '2024-01-20',
        '/uploads/ppid/panduan-layanan.pdf',
        'Published',
        NOW(),
        'admin'
    ),
    (
        'SETIAP_SAAT',
        'Data Statistik Penerimaan Pajak Daerah',
        'Data statistik penerimaan pajak daerah per bulan dan per jenis pajak',
        'Kepala Bidang Data dan Informasi',
        '2024-11-01',
        '/uploads/ppid/statistik-pajak.pdf',
        'Published',
        NOW(),
        'admin'
    );

-- Selesai! Total 13 sample data (5 BERKALA + 3 SERTA_MERTA + 5 SETIAP_SAAT)