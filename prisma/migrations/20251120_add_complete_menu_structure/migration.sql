-- Tabel untuk Quick Menu/Shortcut
CREATE TABLE `QuickMenu` (
    `id` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `link` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL DEFAULT 'blue',
    `order` INT NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Statistik PAD
CREATE TABLE `StatistikPAD` (
    `id` VARCHAR(191) NOT NULL,
    `tahun` INT NOT NULL,
    `bulan` INT NOT NULL,
    `target` DECIMAL(20, 2) NOT NULL,
    `realisasi` DECIMAL(20, 2) NOT NULL,
    `persentase` DECIMAL(5, 2) NOT NULL,
    `jenisSektor` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `StatistikPAD_tahun_bulan_idx` (`tahun`, `bulan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk SOP & Maklumat
CREATE TABLE `SOP` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `kategori` ENUM(
        'SOP',
        'MAKLUMAT',
        'PETUNJUK_TEKNIS'
    ) NOT NULL,
    `deskripsi` TEXT NULL,
    `fileUrl` VARCHAR(191) NULL,
    `nomorDokumen` VARCHAR(191) NULL,
    `tanggalTerbit` DATETIME(3) NULL,
    `status` ENUM('Draft', 'Active', 'Archived') NOT NULL DEFAULT 'Active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `SOP_kategori_status_idx` (`kategori`, `status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Prestasi/Penghargaan
CREATE TABLE `Prestasi` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `pemberi` VARCHAR(191) NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `kategori` VARCHAR(191) NULL,
    `fotoUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `Prestasi_tanggal_idx` (`tanggal` DESC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Informasi Publik
CREATE TABLE `InformasiPublik` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `kategori` ENUM(
        'BERKALA',
        'SERTA_MERTA',
        'SETIAP_SAAT',
        'DIKECUALIKAN'
    ) NOT NULL,
    `ringkasan` TEXT NULL,
    `fileUrl` VARCHAR(191) NULL,
    `tanggalPublikasi` DATETIME(3) NOT NULL,
    `pejabatPengelola` VARCHAR(191) NULL,
    `status` ENUM(
        'Draft',
        'Published',
        'Archived'
    ) NOT NULL DEFAULT 'Published',
    `jumlahUnduh` INT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `InformasiPublik_kategori_status_idx` (`kategori`, `status`),
    INDEX `InformasiPublik_tanggalPublikasi_idx` (`tanggalPublikasi` DESC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Pajak Daerah
CREATE TABLE `JenisPajak` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kode` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NULL,
    `dasar_hukum` TEXT NULL,
    `tarif` VARCHAR(191) NULL,
    `caraBayar` TEXT NULL,
    `kontakPetugas` VARCHAR(191) NULL,
    `formulirUrl` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `JenisPajak_kode_key` (`kode`),
    INDEX `JenisPajak_isActive_idx` (`isActive`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Retribusi
CREATE TABLE `Retribusi` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `jenis` ENUM(
        'JASA_UMUM',
        'JASA_USAHA',
        'PERIZINAN_TERTENTU'
    ) NOT NULL,
    `deskripsi` TEXT NULL,
    `tarif` TEXT NULL,
    `prosedur` TEXT NULL,
    `dasarHukum` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `Retribusi_jenis_isActive_idx` (`jenis`, `isActive`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Aset Daerah
CREATE TABLE `AsetDaerah` (
    `id` VARCHAR(191) NOT NULL,
    `kodeAset` VARCHAR(191) NOT NULL,
    `namaAset` VARCHAR(191) NOT NULL,
    `kategori` ENUM(
        'TANAH',
        'BANGUNAN',
        'KENDARAAN',
        'PERALATAN',
        'LAINNYA'
    ) NOT NULL,
    `lokasi` VARCHAR(191) NULL,
    `kondisi` ENUM(
        'BAIK',
        'RUSAK_RINGAN',
        'RUSAK_BERAT'
    ) NOT NULL,
    `nilaiPerolehan` DECIMAL(20, 2) NULL,
    `tahunPerolehan` INT NULL,
    `keterangan` TEXT NULL,
    `status` ENUM(
        'AKTIF',
        'DALAM_PERBAIKAN',
        'TIDAK_DIGUNAKAN',
        'DIHAPUS'
    ) NOT NULL DEFAULT 'AKTIF',
    `fotoUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `AsetDaerah_kodeAset_key` (`kodeAset`),
    INDEX `AsetDaerah_kategori_status_idx` (`kategori`, `status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Pengaduan
CREATE TABLE `Pengaduan` (
    `id` VARCHAR(191) NOT NULL,
    `nomorTicket` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `telepon` VARCHAR(191) NULL,
    `kategori` ENUM(
        'PAJAK',
        'RETRIBUSI',
        'ASET',
        'PELAYANAN',
        'LAINNYA'
    ) NOT NULL,
    `subjek` VARCHAR(191) NOT NULL,
    `isiPengaduan` TEXT NOT NULL,
    `lampiran` VARCHAR(191) NULL,
    `status` ENUM(
        'BARU',
        'DIPROSES',
        'SELESAI',
        'DITOLAK'
    ) NOT NULL DEFAULT 'BARU',
    `tanggapan` TEXT NULL,
    `petugas` VARCHAR(191) NULL,
    `isWhistleblowing` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `Pengaduan_nomorTicket_key` (`nomorTicket`),
    INDEX `Pengaduan_status_createdAt_idx` (`status`, `createdAt` DESC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Regulasi
CREATE TABLE `Regulasi` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `jenis` ENUM(
        'PERDA',
        'PERBUP',
        'SK_KEPALA',
        'JUKNIS',
        'RENSTRA',
        'RKPD',
        'DOKUMEN_STRATEGIS'
    ) NOT NULL,
    `nomor` VARCHAR(191) NOT NULL,
    `tahun` INT NOT NULL,
    `tentang` TEXT NOT NULL,
    `tanggalTerbit` DATETIME(3) NOT NULL,
    `fileUrl` VARCHAR(191) NULL,
    `status` ENUM('Draft', 'Active', 'Dicabut') NOT NULL DEFAULT 'Active',
    `jumlahUnduh` INT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `Regulasi_jenis_status_idx` (`jenis`, `status`),
    INDEX `Regulasi_tahun_idx` (`tahun` DESC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Agenda Kegiatan
CREATE TABLE `Agenda` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NULL,
    `lokasi` VARCHAR(191) NULL,
    `tanggalMulai` DATETIME(3) NOT NULL,
    `tanggalSelesai` DATETIME(3) NULL,
    `jamMulai` VARCHAR(191) NULL,
    `jamSelesai` VARCHAR(191) NULL,
    `penyelenggara` VARCHAR(191) NULL,
    `status` ENUM(
        'TERJADWAL',
        'BERLANGSUNG',
        'SELESAI',
        'DIBATALKAN'
    ) NOT NULL DEFAULT 'TERJADWAL',
    `fotoUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `Agenda_tanggalMulai_status_idx` (`tanggalMulai` DESC, `status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Video
CREATE TABLE `Video` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NULL,
    `videoUrl` VARCHAR(191) NOT NULL,
    `thumbnailUrl` VARCHAR(191) NULL,
    `durasi` VARCHAR(191) NULL,
    `kategori` VARCHAR(191) NULL,
    `jumlahView` INT NOT NULL DEFAULT 0,
    `tanggalPublikasi` DATETIME(3) NOT NULL,
    `status` ENUM(
        'Draft',
        'Published',
        'Archived'
    ) NOT NULL DEFAULT 'Published',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `Video_tanggalPublikasi_status_idx` (
        `tanggalPublikasi` DESC,
        `status`
    )
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Aplikasi External Links
CREATE TABLE `AplikasiLink` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NULL,
    `url` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `kategori` ENUM(
        'INTERNAL',
        'EXTERNAL',
        'PEMERINTAH'
    ) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `order` INT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `AplikasiLink_kategori_isActive_idx` (`kategori`, `isActive`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Kontak/Info Kantor
CREATE TABLE `KontakInfo` (
    `id` VARCHAR(191) NOT NULL,
    `jenis` ENUM(
        'ALAMAT',
        'TELEPON',
        'FAX',
        'EMAIL',
        'WHATSAPP',
        'JAM_LAYANAN'
    ) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,
    `icon` VARCHAR(191) NULL,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,
    `order` INT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `KontakInfo_jenis_idx` (`jenis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel untuk Banner/Slider Beranda
CREATE TABLE `Banner` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `subjudul` TEXT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,
    `order` INT NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `Banner_isActive_order_idx` (`isActive`, `order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;