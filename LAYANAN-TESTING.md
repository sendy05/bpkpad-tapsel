# 🧪 Testing Checklist - Modul Layanan BPKPAD

## ✅ PRE-REQUISITES
- [ ] Prisma client generated: `npx prisma generate`
- [ ] Database connected
- [ ] Development server running: `npm run dev`
- [ ] (Optional) Seed data executed: `node prisma/seed-layanan.mjs`

---

## 🌐 PUBLIC PAGES TESTING

### 1. Halaman Utama Layanan
**URL:** http://localhost:3000/layanan

**Test Cases:**
- [ ] Halaman load dengan baik
- [ ] Hero section dengan judul "Layanan BPKPAD" terlihat
- [ ] 3 kategori cards (Retribusi, Aset, Pengaduan) terlihat
- [ ] Jumlah layanan per kategori terlihat
- [ ] Klik card navigasi ke halaman kategori
- [ ] Breadcrumbs terlihat
- [ ] Grid layanan tampil (jika ada data)
- [ ] Empty state tampil (jika belum ada data)
- [ ] Responsive di mobile, tablet, desktop

---

### 2. Halaman Kategori Retribusi
**URL:** http://localhost:3000/layanan/retribusi

**Test Cases:**
- [ ] Halaman load dengan baik
- [ ] Hero section berwarna blue/cyan
- [ ] Icon DollarSign terlihat
- [ ] Hanya menampilkan layanan kategori retribusi
- [ ] Grid cards terlihat rapi
- [ ] Klik card navigasi ke detail layanan
- [ ] Responsive layout

---

### 3. Halaman Kategori Aset
**URL:** http://localhost:3000/layanan/aset

**Test Cases:**
- [ ] Halaman load dengan baik
- [ ] Hero section berwarna purple
- [ ] Icon Building2 terlihat
- [ ] Hanya menampilkan layanan kategori aset
- [ ] Grid cards terlihat rapi
- [ ] Responsive layout

---

### 4. Halaman Kategori Pengaduan
**URL:** http://localhost:3000/layanan/pengaduan

**Test Cases:**
- [ ] Halaman load dengan baik
- [ ] Hero section berwarna orange
- [ ] Icon MessageSquare terlihat
- [ ] Hanya menampilkan layanan kategori pengaduan
- [ ] Grid cards terlihat rapi
- [ ] Responsive layout

---

### 5. Halaman Detail Layanan
**URL:** http://localhost:3000/layanan/[id]

**Test Cases:**
- [ ] Halaman load dengan baik
- [ ] Hero section dengan gradient matching kategori
- [ ] Breadcrumbs lengkap (Beranda > Layanan > Judul)
- [ ] Judul layanan terlihat besar
- [ ] Badge kategori terlihat
- [ ] Deskripsi terlihat (jika ada)
- [ ] Section "Prosedur Layanan" dengan numbered list
- [ ] Section "Persyaratan" dengan bullet points
- [ ] Sidebar info: Biaya, Waktu Penyelesaian, Link (jika ada)
- [ ] CTA "Butuh Bantuan?" terlihat
- [ ] Related services links terlihat
- [ ] Responsive 2-column layout
- [ ] 404 page jika ID tidak ditemukan

---

## 🔐 ADMIN PAGES TESTING

### 6. Halaman List Layanan Admin
**URL:** http://localhost:3000/admin/layanan

**Test Cases:**
- [ ] Redirect ke login jika belum authenticate
- [ ] Halaman load setelah login
- [ ] Judul "Manajemen Layanan BPKPAD" terlihat
- [ ] Button "Tambah Layanan" terlihat di kanan atas
- [ ] 6 Stats cards terlihat:
  - [ ] Total
  - [ ] Aktif
  - [ ] Nonaktif
  - [ ] Retribusi
  - [ ] Aset
  - [ ] Pengaduan
- [ ] Search box berfungsi
- [ ] Filter kategori dropdown berfungsi
- [ ] Filter status dropdown berfungsi
- [ ] Table menampilkan data layanan
- [ ] Column: Layanan, Kategori, Biaya, Waktu, Status, Aksi
- [ ] Badge kategori dengan warna berbeda
- [ ] Badge status (Aktif/Nonaktif)
- [ ] Button actions: View, Edit, Delete
- [ ] Empty state dengan button "Tambah Layanan Pertama" (jika kosong)
- [ ] Loading state saat fetch data

---

### 7. Halaman Form Tambah Layanan
**URL:** http://localhost:3000/admin/layanan/new

**Test Cases:**
- [ ] Halaman load dengan baik
- [ ] Link "Kembali ke Daftar Layanan" berfungsi
- [ ] 3 Cards sections terlihat:
  1. **Informasi Dasar:**
     - [ ] Dropdown Kategori (retribusi/aset/pengaduan)
     - [ ] Input Judul (required)
     - [ ] Textarea Deskripsi
  2. **Detail Layanan:**
     - [ ] Textarea Prosedur dengan hint numbered list
     - [ ] Textarea Persyaratan dengan hint bullet points
  3. **Informasi Tambahan:**
     - [ ] Input Biaya
     - [ ] Input Waktu Penyelesaian
     - [ ] Input Link URL
     - [ ] Input Icon Name
- [ ] Checkbox Status "Aktifkan Layanan"
- [ ] Button "Simpan Layanan" berfungsi
- [ ] Button "Batal" navigasi kembali
- [ ] Validation: Kategori & Judul required
- [ ] Loading state saat submit
- [ ] Alert sukses setelah berhasil
- [ ] Redirect ke list setelah sukses

---

### 8. Halaman Form Edit Layanan
**URL:** http://localhost:3000/admin/layanan/[id]/edit

**Test Cases:**
- [ ] Halaman load dengan baik
- [ ] Loading state saat fetch data
- [ ] Form ter-isi dengan data existing
- [ ] Semua field sama seperti form tambah
- [ ] Button "Simpan Perubahan" berfungsi
- [ ] Update data berhasil
- [ ] Alert sukses
- [ ] Redirect ke list setelah sukses
- [ ] 404 jika ID tidak ditemukan

---

## 🔌 API TESTING

### 9. Public API - List Layanan
**Endpoint:** `GET /api/layanan`

**Test Cases:**
- [ ] Response 200 OK
- [ ] Return array of layanan
- [ ] Hanya layanan dengan status = 1
- [ ] Query param `?kategori=retribusi` filter by kategori
- [ ] Query param `?kategori=aset` filter by kategori
- [ ] Query param `?kategori=pengaduan` filter by kategori

**Test Manual:**
```bash
# Semua layanan
curl http://localhost:3000/api/layanan

# Filter retribusi
curl http://localhost:3000/api/layanan?kategori=retribusi

# Filter aset
curl http://localhost:3000/api/layanan?kategori=aset

# Filter pengaduan
curl http://localhost:3000/api/layanan?kategori=pengaduan
```

---

### 10. Public API - Detail Layanan
**Endpoint:** `GET /api/layanan/[id]`

**Test Cases:**
- [ ] Response 200 OK untuk ID valid
- [ ] Response 404 untuk ID tidak ada
- [ ] Hanya return layanan dengan status = 1
- [ ] Response 404 untuk layanan status = 0

**Test Manual:**
```bash
# Valid ID
curl http://localhost:3000/api/layanan/1

# Invalid ID
curl http://localhost:3000/api/layanan/9999
```

---

### 11. Admin API - List Layanan
**Endpoint:** `GET /api/admin/layanan`

**Test Cases:**
- [ ] Response 401 Unauthorized jika tidak login
- [ ] Response 200 OK jika sudah login
- [ ] Return object: { layanan: [], stats: {} }
- [ ] Stats include: total, active, inactive, retribusi, aset, pengaduan
- [ ] Query param `?kategori=` filter by kategori
- [ ] Query param `?status=1` filter status active
- [ ] Query param `?status=0` filter status inactive
- [ ] Query param `?search=` search by judul/deskripsi

---

### 12. Admin API - Create Layanan
**Endpoint:** `POST /api/admin/layanan`

**Test Cases:**
- [ ] Response 401 jika tidak login
- [ ] Response 400 jika kategori/judul kosong
- [ ] Response 400 jika kategori tidak valid
- [ ] Response 201 Created jika valid
- [ ] Data tersimpan di database
- [ ] Field tgl_update otomatis terisi
- [ ] Field user terisi dari session

**Test Manual (Postman/Thunder Client):**
```json
POST /api/admin/layanan
{
  "kategori": "retribusi",
  "judul": "Test Layanan",
  "deskripsi": "Deskripsi test",
  "prosedur": "1. Langkah 1\n2. Langkah 2",
  "persyaratan": "• Syarat 1\n• Syarat 2",
  "biaya": "Gratis",
  "waktu_penyelesaian": "1 hari",
  "link_url": "https://example.com",
  "icon": "FileText",
  "status": true
}
```

---

### 13. Admin API - Update Layanan
**Endpoint:** `PUT /api/admin/layanan/[id]`

**Test Cases:**
- [ ] Response 401 jika tidak login
- [ ] Response 400 jika validation gagal
- [ ] Response 200 OK jika valid
- [ ] Data ter-update di database
- [ ] Field tgl_update ter-update
- [ ] Response 404 jika ID tidak ada

---

### 14. Admin API - Delete Layanan
**Endpoint:** `DELETE /api/admin/layanan/[id]`

**Test Cases:**
- [ ] Response 401 jika tidak login
- [ ] Response 200 OK jika berhasil
- [ ] Data terhapus dari database
- [ ] Response 500 jika ID tidak ada

---

## 🗄️ DATABASE TESTING

### 15. Prisma Schema
- [ ] Model `layanan` ada di schema.prisma
- [ ] All fields match requirements
- [ ] Primary key `id` auto increment
- [ ] Default values correct

### 16. Seed Data
- [ ] Seed file `seed-layanan.mjs` executable
- [ ] 9 layanan ter-insert (3 per kategori)
- [ ] Data sesuai format (numbered list, bullet points)
- [ ] All required fields terisi

**Run Seed:**
```bash
node prisma/seed-layanan.mjs
```

---

## 📱 RESPONSIVE TESTING

### 17. Mobile (< 768px)
- [ ] Navigation berfungsi
- [ ] Grid menjadi 1 column
- [ ] Cards readable
- [ ] Forms usable
- [ ] Buttons tapable

### 18. Tablet (768px - 1024px)
- [ ] Grid 2 columns
- [ ] Layout balanced
- [ ] Sidebar stacked

### 19. Desktop (> 1024px)
- [ ] Grid 3 columns
- [ ] 2-column detail layout
- [ ] Optimal spacing

---

## 🎨 UI/UX TESTING

### 20. Design Consistency
- [ ] Color coding per kategori konsisten
- [ ] Gradients smooth
- [ ] Shadows consistent
- [ ] Border radius uniform
- [ ] Typography hierarchy clear
- [ ] Icons size consistent
- [ ] Spacing balanced

### 21. Interactions
- [ ] Hover effects smooth
- [ ] Loading spinners visible
- [ ] Empty states helpful
- [ ] Error messages clear
- [ ] Success alerts visible
- [ ] Transitions smooth

---

## 🔍 EDGE CASES

### 22. Empty States
- [ ] No layanan di public page
- [ ] No layanan di admin page
- [ ] No layanan per kategori
- [ ] No search results

### 23. Long Content
- [ ] Long judul handle dengan ellipsis
- [ ] Long deskripsi truncate di card
- [ ] Long prosedur scrollable
- [ ] Long persyaratan scrollable

### 24. Special Characters
- [ ] HTML entities escaped
- [ ] URLs clickable
- [ ] Line breaks preserved

---

## ✅ FINAL CHECKLIST

- [ ] All 13 files created
- [ ] Prisma client generated
- [ ] Seed data executed (optional)
- [ ] Dev server running
- [ ] All public pages accessible
- [ ] All admin pages protected
- [ ] All API endpoints working
- [ ] CRUD operations functional
- [ ] Search & filters working
- [ ] Responsive design verified
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Performance acceptable

---

## 🎉 TESTING COMPLETE!

**Date:** ___________  
**Tester:** ___________  
**Result:** ⭐⭐⭐⭐⭐ (5/5)

**Notes:**
_________________________________
_________________________________
_________________________________
