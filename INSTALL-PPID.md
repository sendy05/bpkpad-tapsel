# 🚀 CARA INSTALL - SISTEM PPID

## ⚠️ PENTING

Halaman PPID tidak bisa dibuka karena:
1. ❌ Tabel `informasi_publik` belum ada di database
2. ❌ Prisma Client belum di-generate ulang

## ✅ SOLUSI (3 Langkah)

### 📋 Langkah 1: Buat Tabel di Database

#### Via phpMyAdmin (MUDAH)

1. **Buka phpMyAdmin**
   ```
   http://36.66.156.116/phpmyadmin
   ```

2. **Login** dengan kredensial database

3. **Pilih Database**
   - Klik `db_web_bpkpad` di sidebar kiri

4. **Buka Tab SQL**
   - Klik tab "SQL" di menu atas

5. **Copy-Paste Script**
   - Buka file: `database-ppid.sql`
   - Copy SEMUA isinya (Ctrl+A, Ctrl+C)
   - Paste ke text area SQL (Ctrl+V)

6. **Execute**
   - Klik tombol **"Go"** atau **"Jalankan"**
   - Tunggu sampai muncul pesan sukses

7. **Verify**
   - Refresh sidebar database
   - Pastikan muncul tabel: `informasi_publik`
   - Klik tabel → tab Browse → pastikan ada 13 data sample

#### Via MySQL Command Line (Alternative)

```bash
mysql -h 36.66.156.116 -u "%23s3rv3r%23prodash" -p db_web_bpkpad < database-ppid.sql
```

---

### 🔧 Langkah 2: Generate Prisma Client

Setelah tabel dibuat, generate ulang Prisma Client:

```powershell
# Stop server dulu (tekan Ctrl+C di terminal yang running)

# Generate Prisma Client
npx prisma generate
```

Output yang diharapkan:
```
✔ Generated Prisma Client to ./node_modules/@prisma/client
```

---

### ▶️ Langkah 3: Restart Server

```powershell
pnpm dev
```

Server akan start di: http://localhost:3004

---

## 🧪 Testing

### Test Halaman Public

Buka browser dan akses:

1. **Halaman Utama PPID**
   ```
   http://localhost:3004/ppid
   ```
   ✅ Harus muncul hero + 3 kategori informasi

2. **Navigasi Anchor Link**
   ```
   http://localhost:3004/ppid#berkala
   http://localhost:3004/ppid#serta-merta
   http://localhost:3004/ppid#setiap-saat
   ```
   ✅ Harus scroll smooth ke section yang sesuai

3. **Verifikasi Data**
   - Kategori Berkala: 5 informasi
   - Kategori Serta Merta: 3 informasi
   - Kategori Setiap Saat: 5 informasi
   - Total: 13 informasi

### Test Admin Panel

1. **List Informasi**
   ```
   http://localhost:3004/admin/ppid
   ```
   ✅ Harus tampil tabel dengan 13 data
   ✅ Stats cards: Berkala(5), Serta Merta(3), Setiap Saat(5), Published(13)

2. **Tambah Informasi**
   ```
   http://localhost:3004/admin/ppid/new
   ```
   ✅ Form muncul dengan semua field

3. **Edit Informasi**
   ```
   http://localhost:3004/admin/ppid/1/edit
   ```
   ✅ Form terisi dengan data existing

---

## 🐛 Troubleshooting

### Error: "Table informasi_publik does not exist"

**Penyebab:** SQL script belum dijalankan

**Solusi:**
1. Pastikan sudah menjalankan `database-ppid.sql` di phpMyAdmin
2. Cek di phpMyAdmin → database `db_web_bpkpad` → tabel `informasi_publik` ada?
3. Jika belum ada, ulangi Langkah 1

---

### Error: "Cannot read properties of undefined (reading 'findMany')"

**Penyebab:** Prisma Client belum tahu tentang model `informasiPublik`

**Solusi:**
```powershell
# Generate ulang Prisma Client
npx prisma generate

# Restart server
pnpm dev
```

---

### Halaman PPID tampil tapi kosong (no data)

**Penyebab 1:** Sample data belum di-insert

**Solusi:** Cek di phpMyAdmin:
```sql
SELECT COUNT(*) FROM informasi_publik;
```
Jika 0, berarti script INSERT tidak jalan. Jalankan ulang `database-ppid.sql`

**Penyebab 2:** Semua data status "Draft"

**Solusi:** 
1. Buka `/admin/ppid`
2. Edit data satu per satu
3. Ubah status ke "Published"

---

### Anchor link (#berkala, #serta-merta) tidak work

**Penyebab:** Browser cache

**Solusi:**
1. Hard refresh: Ctrl+F5
2. Atau clear cache browser

---

### Menu PPID tidak muncul di Navbar

**Penyebab:** Menu sudah ada di Navbar.tsx

**Solusi:** Menu PPID sudah ada di dropdown "Layanan" → "PPID"

---

## ✅ Success Indicators

Setelah berhasil install, Anda akan:

✅ Bisa akses `/ppid` tanpa error  
✅ Lihat 13 sample data di 3 kategori  
✅ Anchor link berfungsi smooth scroll  
✅ Admin panel bisa CRUD informasi  
✅ Stats cards tampil angka yang benar  

---

## 📞 Need Help?

Jika masih ada error:

1. **Cek terminal** untuk error message
2. **Cek browser console** (F12) untuk error frontend
3. **Cek phpMyAdmin** apakah tabel ada dan terisi data
4. **Restart server** setelah setiap perubahan

---

## 📦 Apa yang Dibuat?

### Database
- ✅ Tabel `informasi_publik` (dengan 13 sample data)

### Code Files (10 files)
- ✅ `prisma/schema.prisma` - Model informasiPublik
- ✅ `src/app/(site)/ppid/page.tsx` - Public page (updated)
- ✅ `src/app/(admin)/admin/ppid/page.tsx` - Admin list
- ✅ `src/app/(admin)/admin/ppid/new/page.tsx` - Add form
- ✅ `src/app/(admin)/admin/ppid/[id]/edit/page.tsx` - Edit form
- ✅ `src/app/(admin)/admin/ppid/InformasiPublikForm.tsx` - Form component
- ✅ `src/app/api/admin/ppid/route.ts` - API GET, POST
- ✅ `src/app/api/admin/ppid/[id]/route.ts` - API GET, PUT, DELETE
- ✅ `src/components/admin/Sidebar.tsx` - Added PPID menu
- ✅ `database-ppid.sql` - SQL script

### Documentation
- ✅ `PANDUAN-PPID.md` - Panduan lengkap
- ✅ `INSTALL-PPID.md` - Panduan install (file ini)

---

**NEXT:** Ikuti 3 langkah di atas, lalu test hasilnya!

**Estimated Time:** 5-10 menit
