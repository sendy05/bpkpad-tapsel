# 📂 PANDUAN SISTEM PPID (Informasi Publik)

## 🎯 Apa itu PPID?

**PPID** = **Pejabat Pengelola Informasi dan Dokumentasi**

Sistem untuk mengelola informasi publik sesuai **UU No. 14 Tahun 2008** tentang Keterbukaan Informasi Publik.

---

## 📋 Kategori Informasi Publik

### 1. 📅 Informasi Berkala
- Wajib disediakan dan diperbarui minimal setiap 6 bulan
- Contoh: Laporan keuangan, LAKIP, RKA, DIP

### 2. ⚡ Informasi Serta Merta
- Wajib diumumkan segera karena mengancam hajat hidup orang banyak
- Contoh: Perubahan jadwal pajak, pengumuman penting, himbauan

### 3. 📊 Informasi Setiap Saat
- Dapat diakses publik kapan saja tanpa pembatasan
- Contoh: SOP, formulir, peraturan, panduan layanan

---

## 🚀 LANGKAH INSTALASI

### ✅ Langkah 1: Install Database

1. **Buka phpMyAdmin**
   ```
   http://36.66.156.116/phpmyadmin
   ```

2. **Login dan pilih database**
   - Pilih: `db_web_bpkpad`

3. **Jalankan SQL Script**
   - Klik tab **SQL**
   - Copy-paste seluruh isi file `database-ppid.sql`
   - Klik **Go** / **Jalankan**

4. **Verifikasi**
   - Refresh sidebar database
   - Pastikan tabel `informasi_publik` muncul
   - Cek ada 13 sample data (5 Berkala + 3 Serta Merta + 5 Setiap Saat)

### ✅ Langkah 2: Generate Prisma Client

```bash
# Stop server dulu (Ctrl+C)
npx prisma generate

# Restart server
pnpm dev
```

### ✅ Langkah 3: Test Halaman

Buka browser:

- **Halaman Publik:**
  - http://localhost:3004/ppid
  - http://localhost:3004/ppid#berkala
  - http://localhost:3004/ppid#serta-merta
  - http://localhost:3004/ppid#setiap-saat

- **Halaman Admin:**
  - http://localhost:3004/admin/ppid (List)
  - http://localhost:3004/admin/ppid/new (Tambah)
  - http://localhost:3004/admin/ppid/1/edit (Edit)

---

## 📁 File yang Dibuat

### Backend (Database & Schema)
```
database-ppid.sql                     - SQL script tabel + sample data
prisma/schema.prisma                  - Tambah model informasiPublik
```

### Frontend Public (User)
```
src/app/(site)/ppid/page.tsx         - Halaman publik PPID (sudah ada, ditambah anchor)
```

### Frontend Admin (CRUD)
```
src/app/(admin)/admin/ppid/
├── page.tsx                         - List informasi (dengan stats)
├── new/page.tsx                     - Form tambah
├── [id]/edit/page.tsx              - Form edit
└── InformasiPublikForm.tsx         - Client form component
```

### API Routes
```
src/app/api/admin/ppid/
├── route.ts                         - GET (list), POST (create)
└── [id]/route.ts                   - GET (single), PUT (update), DELETE
```

### Components
```
src/components/admin/Sidebar.tsx     - Ditambah menu PPID
```

---

## 🎨 Fitur Halaman Public

### Layout
- ✅ Hero section dengan gradient purple-pink
- ✅ 3 kategori dengan icon berbeda (📅⚡📊)
- ✅ Card grid untuk setiap kategori
- ✅ Anchor links untuk navigasi (#berkala, #serta-merta, #setiap-saat)
- ✅ Download button untuk file dokumen
- ✅ Tanggal publikasi format Indonesia
- ✅ Nama pejabat pengelola
- ✅ Section "Cara Permohonan Informasi"

### Filter
- ✅ Otomatis filter berdasarkan kategori
- ✅ Hanya tampilkan status "Published"
- ✅ Urut dari terbaru (tanggal publikasi desc)

---

## 🎨 Fitur Admin Panel

### List Page (`/admin/ppid`)
- ✅ Stats cards (jumlah per kategori + published)
- ✅ Table dengan kolom: Judul & Kategori, Pejabat, Tanggal, Status
- ✅ Badge warna berbeda per kategori
- ✅ Badge status (Published/Draft/Archived)
- ✅ Ringkasan dengan line-clamp
- ✅ Button Edit per row
- ✅ Empty state dengan ilustrasi

### Form (`/admin/ppid/new` & `/admin/ppid/[id]/edit`)
- ✅ Dropdown kategori dengan deskripsi
- ✅ Input judul (required)
- ✅ Textarea ringkasan (optional)
- ✅ Input pejabat pengelola (required)
- ✅ Date picker tanggal publikasi (required)
- ✅ Input URL file dokumen (optional)
- ✅ Dropdown status (Draft/Published/Archived)
- ✅ Button Save
- ✅ Button Kembali
- ✅ Button Hapus (hanya edit mode)

### API Validation
- ✅ Cek required fields
- ✅ Validate kategori (hanya BERKALA/SERTA_MERTA/SETIAP_SAAT)
- ✅ Validate status
- ✅ Auto set tgl_update dan user
- ✅ Error handling dengan message

---

## 📊 Sample Data

Script SQL membuat 13 sample data:

### Berkala (5 data)
1. Laporan Keuangan Semester I 2024
2. Daftar Informasi Publik (DIP) 2024
3. LAKIP 2023
4. RKA 2025
5. Profil Singkat BPKPAD

### Serta Merta (3 data)
1. Perubahan Jadwal Pembayaran PBB 2024
2. Pengumuman Pemadaman Sistem e-BPKPAD
3. Himbauan Kepatuhan Pajak Hotel & Restoran

### Setiap Saat (5 data)
1. SOP Pelayanan Pajak
2. Formulir Permohonan Informasi Publik
3. Daftar Peraturan Daerah tentang Pajak
4. Panduan Layanan BPKPAD
5. Data Statistik Penerimaan Pajak Daerah

---

## 🧪 Testing Checklist

### Halaman Public
- [ ] Buka `/ppid` → Lihat hero + 3 kategori
- [ ] Klik menu "Info Berkala" → Scroll ke section berkala
- [ ] Klik menu "Info Serta Merta" → Scroll ke section serta merta
- [ ] Klik menu "Info Setiap Saat" → Scroll ke section setiap saat
- [ ] Lihat sample data muncul di setiap kategori
- [ ] Button Download muncul (meski link dummy)
- [ ] Tanggal tampil format Indonesia

### Admin Panel
- [ ] Buka `/admin/ppid` → Lihat list + stats
- [ ] Stats berkala = 5, serta merta = 3, setiap saat = 5, published = 13
- [ ] Klik "Tambah Informasi" → Form muncul
- [ ] Isi form lengkap → Save → Redirect ke list
- [ ] Lihat data baru muncul di list
- [ ] Klik Edit → Form terisi → Update → Save
- [ ] Klik Hapus → Confirm → Data hilang
- [ ] Coba buat dengan status "Draft" → Tidak muncul di public
- [ ] Ubah status ke "Published" → Muncul di public

---

## 🛠️ Troubleshooting

### Error: Table informasi_publik does not exist
**Penyebab:** Tabel belum dibuat di database
**Solusi:** Jalankan file `database-ppid.sql` di phpMyAdmin

### Error: Cannot read properties of undefined (reading 'findMany')
**Penyebab:** Prisma Client belum di-generate ulang
**Solusi:** 
```bash
npx prisma generate
# Restart server
```

### Halaman PPID kosong (no data)
**Penyebab:** Semua data masih status "Draft"
**Solusi:** 
1. Buka `/admin/ppid`
2. Edit data
3. Ubah status ke "Published"
4. Refresh halaman public

### Anchor link tidak smooth scroll
**Penyebab:** CSS scroll behavior belum diatur
**Solusi:** Sudah ditambahkan `scroll-mt-20` di setiap section

---

## 🚀 Next Steps (Optional)

### Upload File
- [ ] Integr asi file upload untuk dokumen
- [ ] Simpan di folder `/public/uploads/ppid/`
- [ ] Validasi tipe file (PDF, DOC, XLS)
- [ ] Batasi ukuran max 10MB

### Advanced Features
- [ ] Pagination untuk list panjang
- [ ] Search & filter di admin
- [ ] Preview PDF inline
- [ ] Download counter
- [ ] Email notifikasi saat publish
- [ ] Export data to Excel
- [ ] Dashboard statistik download

### Compliance
- [ ] Form permohonan informasi online
- [ ] Tracking status permohonan
- [ ] SLA response time (10 hari kerja)
- [ ] Notifikasi deadline

---

## 📖 Referensi

- UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik
- Peraturan Komisi Informasi tentang Standar Layanan Informasi Publik
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/docs)

---

**Created:** November 22, 2024  
**System:** BPKPAD Website - PPID Module  
**Total Files:** 10 files (1 SQL + 9 code files)
