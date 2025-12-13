# Panduan Login Admin BPKPAD

## 🔐 Kredensial Login Default

Setelah menjalankan seed database, gunakan kredensial berikut untuk login:

```
URL Login: http://localhost:3004/admin/login

Username: admin
ATAU
Email: admin@bpkpad.local

Password: Admin123!
```

## 📋 Langkah-langkah Login

### 1. Pastikan Database Sudah Di-seed

Jalankan perintah berikut untuk membuat user admin (jika belum):

```powershell
npx prisma db seed
```

Output yang diharapkan:

- "Seed: admin user already exists" (jika sudah ada)
- "Seed: created Super Admin user" (jika baru dibuat)

### 2. Jalankan Development Server

```powershell
npm run dev
```

Server akan berjalan di: `http://localhost:3000`

### 3. Buka Halaman Login

Akses di browser: `http://localhost:3000/admin/login`

### 4. Masukkan Kredensial

- **Email atau Username**: `admin`
- **Password**: `Admin123!`

### 5. Klik Tombol "Masuk"

Setelah berhasil login, Anda akan diarahkan ke dashboard admin di `/admin`

## 🎯 Halaman Admin yang Tersedia

Setelah login, Anda dapat mengakses:

- `/admin` - Dashboard admin
- `/admin/berita` - Manajemen berita
- `/admin/berita/new` - Tambah berita baru
- `/admin/kategori` - Manajemen kategori
- `/admin/audit-log` - Log aktivitas admin

## 🔍 Troubleshooting

### Login Gagal?

1. **Cek database connection**

   ```powershell
   npx prisma db push
   ```

2. **Reset password admin** (jika lupa)

   Jalankan script berikut di terminal:

   ```powershell
   node -e "const bcrypt = require('bcrypt'); bcrypt.hash('Admin123!', 12).then(h => console.log(h));"
   ```

   Kemudian update manual di database atau hapus user admin dan jalankan seed ulang:

   ```sql
   DELETE FROM User WHERE username = 'admin';
   ```

   Lalu:

   ```powershell
   npx prisma db seed
   ```

3. **Cek environment variables**

   Pastikan file `.env` memiliki:

   ```
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="webs!teBpkp4d"
   ```

4. **Clear browser cookies**

   Hapus cookies untuk `localhost:3000` dan coba login ulang.

### Session Idle Timeout

Sistem memiliki idle timeout 30 menit. Jika Anda tidak aktif selama 30 menit, akan diminta login kembali dengan pesan:

> "Sesi Anda berakhir karena idle. Silakan login kembali."

## 🛡️ Keamanan

- Password disimpan dengan bcrypt hash (12 rounds)
- Session menggunakan JWT via NextAuth v5
- Middleware melindungi semua route `/admin/*`
- Rate limiting pada operasi tulis admin

## 📝 Menambah User Admin Baru

Untuk menambah admin baru, gunakan form di admin panel (fitur akan datang) atau jalankan script Prisma manual:

```javascript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  const passwordHash = await bcrypt.hash('PasswordBaru123!', 12);
  await prisma.user.create({
    data: {
      username: 'admin2',
      email: 'admin2@bpkpad.local',
      name: 'Admin Dua',
      passwordHash,
      role: 'Admin',
      status: 'Active',
    },
  });
  console.log('Admin baru berhasil dibuat');
}

createAdmin().finally(() => prisma.$disconnect());
```

## 🚀 Quick Start

Rangkuman perintah cepat:

```powershell
# 1. Seed database
npx prisma db seed

# 2. Jalankan dev server
npm run dev

# 3. Buka browser
# http://localhost:3000/admin/login

# 4. Login dengan:
# Username: admin
# Password: Admin123!
```

---

**Catatan Penting**:

- Kredensial default ini hanya untuk development
- Di production, **WAJIB** ganti password admin dan secret keys di `.env`
- Jangan commit file `.env` ke version control
