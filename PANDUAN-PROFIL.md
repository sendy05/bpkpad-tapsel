# 📋 PANDUAN LENGKAP - Halaman Profil BPKPAD

## ✅ Yang Sudah Dibuat

### 1. Database Schema
File: `prisma/schema.prisma`
- ✅ Model `profil_organisasi` - Visi, Misi, Tugas Pokok
- ✅ Model `struktur_organisasi` - Gambar struktur
- ✅ Model `pejabat` - Data pejabat struktural
- ✅ Model `sop_dokumen` - Dokumen SOP
- ✅ Model `prestasi_organisasi` - Prestasi & penghargaan

### 2. Halaman Admin
- ✅ `/admin/profil-organisasi` - Form edit visi, misi, tupoksi (dengan ReactQuill)
- ✅ `/admin/pejabat` - List pejabat dengan foto dan kontak
- ⚠️ `/admin/pejabat/new` - Tambah pejabat (PERLU DIBUAT)
- ⚠️ `/admin/pejabat/[id]/edit` - Edit pejabat (PERLU DIBUAT)

### 3. API Routes
- ✅ `/api/admin/profil-organisasi` - Save/update profil
- ⚠️ `/api/admin/pejabat` - CRUD pejabat (PERLU DIBUAT)

### 4. SQL Script
- ✅ `database-profil.sql` - Script CREATE TABLE dan INSERT sample data

---

## 🚀 LANGKAH INSTALASI

### Step 1: Jalankan SQL Script

Buka phpMyAdmin atau MySQL client, pilih database `db_web_bpkpad`, lalu jalankan:

```bash
# Jika menggunakan MySQL client
mysql -h 36.66.156.116 -u "%23s3rv3r%23prodash" -p db_web_bpkpad < database-profil.sql

# Atau copy-paste isi file database-profil.sql ke phpMyAdmin
```

### Step 2: Generate Prisma Client

```bash
cd f:\bpkpad-website
pnpm prisma generate
```

### Step 3: Restart Development Server

```bash
pnpm dev
```

---

## 📝 FILE YANG MASIH PERLU DIBUAT

### 1. Form Tambah Pejabat
**File:** `src/app/(admin)/admin/pejabat/new/page.tsx`

Konten:
- Form input: Nama, Jabatan, NIP, Email, Telepon, Urutan
- Upload foto (menggunakan Cloudinary)
- Status aktif/nonaktif
- Submit ke `/api/admin/pejabat` method POST

### 2. Form Edit Pejabat  
**File:** `src/app/(admin)/admin/pejabat/[id]/edit/page.tsx`

Konten:
- Load data pejabat by ID
- Form yang sama dengan New
- Submit ke `/api/admin/pejabat/[id]` method PUT

### 3. API CRUD Pejabat
**File:** `src/app/api/admin/pejabat/route.ts`

Methods:
- GET - List all
- POST - Create new
- PUT - Update (pakai [id])
- DELETE - Delete (pakai [id])

### 4. Halaman SOP (sama seperti Pejabat)
**Files:**
- `src/app/(admin)/admin/sop/page.tsx` - List
- `src/app/(admin)/admin/sop/new/page.tsx` - Form add
- `src/app/(admin)/admin/sop/[id]/edit/page.tsx` - Form edit
- `src/app/api/admin/sop/route.ts` - API CRUD

### 5. Halaman Prestasi (sama seperti Pejabat)
**Files:**
- `src/app/(admin)/admin/prestasi/page.tsx` - List
- `src/app/(admin)/admin/prestasi/new/page.tsx` - Form add
- `src/app/(admin)/admin/prestasi/[id]/edit/page.tsx` - Form edit
- `src/app/api/admin/prestasi/route.ts` - API CRUD

### 6. Halaman Struktur Organisasi
**Files:**
- `src/app/(admin)/admin/struktur/page.tsx` - List
- `src/app/(admin)/admin/struktur/new/page.tsx` - Upload gambar
- `src/app/(admin)/admin/struktur/[id]/edit/page.tsx` - Edit
- `src/app/api/admin/struktur/route.ts` - API CRUD

### 7. Halaman Public Profil
**File:** `src/app/(site)/profil/page.tsx` 

⚠️ **CATATAN:** File ini sudah ada tapi perlu diganti seluruh isinya dengan code yang membaca dari database!

Code lengkap sudah saya persiapkan di conversation sebelumnya (file sangat panjang dengan 5 sections).

---

## 🎨 DESIGN PATTERN

### Warna Setiap Section:
```tsx
// Profil Organisasi: Emerald-Teal
className="from-emerald-500 to-teal-600"

// Struktur: Blue-Indigo  
className="from-blue-500 to-indigo-600"

// Pejabat: Purple-Pink
className="from-purple-500 to-pink-600"

// SOP: Orange-Red
className="from-orange-500 to-red-600"

// Prestasi: Yellow-Amber
className="from-yellow-500 to-amber-600"
```

### Component Pattern:
```tsx
// List Page
- Table with gradient header
- Action buttons (Edit, Delete)
- Add button di header
- Empty state dengan icon

// Form Page  
- ReactQuill untuk rich text
- Upload image dengan preview
- Validation dengan Zod
- Loading states

// API Route
- Auth check dengan NextAuth
- Prisma CRUD operations
- Error handling
- Return JSON response
```

---

## 🔗 URL STRUCTURE

### Public URLs:
```
http://localhost:3004/profil#visi-misi
http://localhost:3004/profil#struktur
http://localhost:3004/profil#pejabat
http://localhost:3004/profil#sop
http://localhost:3004/profil#prestasi
```

### Admin URLs:
```
http://localhost:3004/admin/profil-organisasi
http://localhost:3004/admin/pejabat
http://localhost:3004/admin/pejabat/new
http://localhost:3004/admin/pejabat/[id]/edit
http://localhost:3004/admin/struktur
http://localhost:3004/admin/sop
http://localhost:3004/admin/prestasi
```

---

## 🧪 TESTING

### 1. Test Database
```sql
-- Cek apakah tabel sudah dibuat
SHOW TABLES LIKE '%profil%';
SHOW TABLES LIKE 'pejabat';
SHOW TABLES LIKE 'sop%';
SHOW TABLES LIKE 'prestasi%';

-- Cek data sample
SELECT * FROM profil_organisasi;
SELECT * FROM pejabat ORDER BY urutan;
SELECT * FROM sop_dokumen;
SELECT * FROM prestasi_organisasi ORDER BY tanggal DESC;
```

### 2. Test Admin Pages
1. Login ke admin: http://localhost:3004/admin/login
2. Buka Profil Organisasi: http://localhost:3004/admin/profil-organisasi
3. Edit visi/misi, klik Simpan
4. Buka Pejabat: http://localhost:3004/admin/pejabat
5. Lihat list pejabat

### 3. Test Public Page
1. Buka: http://localhost:3004/profil
2. Klik navigation tabs
3. Scroll ke setiap section
4. Pastikan data muncul dari database

---

## 📦 DEPENDENCIES

Semua sudah terinstall:
- ✅ `@prisma/client` - Database ORM
- ✅ `react-quill-new` - Rich text editor
- ✅ `react-hook-form` - Form management
- ✅ `zod` - Validation
- ✅ `next-auth` - Authentication

---

## ⚡ QUICK ACTIONS

### Untuk melanjutkan pekerjaan:

1. **Jalankan SQL Script:**
   ```bash
   # Copy isi database-profil.sql ke phpMyAdmin
   ```

2. **Generate Prisma:**
   ```bash
   pnpm prisma generate
   ```

3. **Test Admin yang Sudah Jadi:**
   ```
   http://localhost:3004/admin/profil-organisasi
   http://localhost:3004/admin/pejabat
   ```

4. **Buat File yang Masih Kurang** (lihat section "FILE YANG MASIH PERLU DIBUAT")

5. **Update Halaman Public Profil** - Ganti isi `src/app/(site)/profil/page.tsx`

---

## 💡 TIPS

1. **Upload Foto:** Gunakan Cloudinary API yang sudah ada di `/api/upload`
2. **Rich Text:** ReactQuill butuh dynamic import dengan `{ ssr: false }`
3. **Validation:** Pakai Zod schema di setiap form
4. **Auth:** Semua API admin harus cek `await auth()` dulu
5. **Loading:** Pakai `useState` dan disable button saat loading

---

## 📞 SUPPORT

Jika ada error:
1. Cek apakah tabel sudah dibuat di database
2. Cek `pnpm prisma generate` sudah dijalankan
3. Cek console browser untuk error JavaScript
4. Cek terminal untuk error server

---

**Status Progres:**
- ✅ Database Schema: 100%
- ✅ SQL Script: 100%
- ✅ Profil Organisasi Admin: 100%
- ✅ Pejabat List Admin: 100%
- ⚠️ Form CRUD Lainnya: 0%
- ⚠️ Public Profil Page: 50% (perlu update)

**Next Action:** Jalankan SQL script dan test halaman yang sudah dibuat!
