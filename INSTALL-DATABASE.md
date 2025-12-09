# 🚀 CARA INSTALL DATABASE PROFIL

## ⚠️ PENTING: Tabel belum ada di database!

Error yang muncul:
```
The table `profil_organisasi` does not exist in the current database.
```

## ✅ SOLUSI: Jalankan SQL Script

### Metode 1: Via phpMyAdmin (MUDAH)

1. **Buka phpMyAdmin**
   ```
   http://36.66.156.116/phpmyadmin
   (atau http://localhost/phpmyadmin jika local)
   ```

2. **Login** dengan kredensial database Anda

3. **Pilih Database**
   - Klik `db_web_bpkpad` di sidebar kiri

4. **Buka Tab SQL**
   - Klik tab "SQL" di menu atas

5. **Copy-Paste Script**
   - Buka file `database-profil.sql`
   - Copy SEMUA isinya (Ctrl+A, Ctrl+C)
   - Paste ke text area di phpMyAdmin (Ctrl+V)

6. **Execute**
   - Klik tombol "Go" atau "Jalankan" di kanan bawah
   - Tunggu sampai muncul pesan sukses

7. **Verify**
   - Refresh sidebar database
   - Pastikan muncul 5 tabel baru:
     - `profil_organisasi`
     - `struktur_organisasi`
     - `pejabat`
     - `sop_dokumen`
     - `prestasi_organisasi`

### Metode 2: Via MySQL Command Line

Jika punya akses MySQL CLI:

```bash
mysql -h 36.66.156.116 -u "%23s3rv3r%23prodash" -p db_web_bpkpad < database-profil.sql
```

(Password akan ditanyakan)

### Metode 3: Via HeidiSQL / MySQL Workbench

1. Connect ke database
2. Select database `db_web_bpkpad`
3. File → Run SQL File → Pilih `database-profil.sql`
4. Execute

## ✅ Setelah SQL Script Berhasil

1. **Restart Development Server**
   ```bash
   # Stop server (Ctrl+C)
   pnpm dev
   ```

2. **Test Halaman**
   - Public: http://localhost:3004/profil
   - Admin: http://localhost:3004/admin/profil-organisasi

3. **Jika masih error**, jalankan:
   ```bash
   pnpm prisma generate
   ```

## 📝 Isi SQL Script

Script akan membuat:
- ✅ 5 tabel baru
- ✅ Sample data:
  - 1 profil organisasi (visi, misi, tupoksi)
  - 5 pejabat (Kepala, Sekretaris, 3 Kabid)
  - 4 dokumen SOP
  - 4 prestasi
  - 1 struktur organisasi

## 🐛 Troubleshooting

### Error: Table already exists
Jika muncul error "Table already exists", berarti tabel sudah dibuat sebelumnya.
- Cek apakah tabel benar-benar ada
- Atau uncomment baris DROP TABLE di awal script untuk hapus dan buat ulang

### Error: Access denied
- Pastikan user database punya privilege CREATE TABLE
- Atau hubungi admin database

### Error: Connection refused
- Pastikan MySQL service running
- Cek IP dan port database benar

## ✨ Success Indicator

Setelah sukses, Anda akan bisa:
- ✅ Akses `/profil` tanpa error
- ✅ Lihat sample data di admin panel
- ✅ CRUD pejabat, struktur, sop, prestasi

---

**Need Help?** Check:
- `PANDUAN-PROFIL.md` - Panduan lengkap
- `RINGKASAN-FINAL.md` - Overview sistem
