# 🎯 TEMPLATE CRUD - COPY & CUSTOMIZE

## 📚 CARA MENGGUNAKAN TEMPLATE INI

Template ini bisa digunakan untuk membuat modul CRUD baru dengan cepat.
Cukup copy-paste dan replace `[NAMA_MODUL]` dengan modul Anda.

---

## 📁 STRUKTUR FILE (Per Modul)

```
src/app/(admin)/admin/[modul]/
├── page.tsx                    → List + Stats
├── new/page.tsx               → Form Tambah
├── [id]/edit/page.tsx         → Form Edit
└── [Modul]Form.tsx            → Form Component

src/app/api/admin/[modul]/
├── route.ts                    → GET (list), POST (create)
└── [id]/route.ts              → GET (single), PUT (update), DELETE

src/app/(site)/[modul]/
├── page.tsx                    → Public list
└── [id]/page.tsx              → Public detail (optional)
```

---

## 🔧 TEMPLATE 1: Admin List Page

**File:** `src/app/(admin)/admin/[modul]/page.tsx`

```tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function [Modul]Page() {
    const items = await prisma.[tabel].findMany({
        orderBy: { tgl_update: 'desc' }
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">📋 [Nama Modul]</h1>
                    <p className="text-gray-600 mt-1">Kelola data [modul]</p>
                </div>
                <Link
                    href="/admin/[modul]/new"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                    ➕ Tambah [Modul]
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="text-2xl font-bold text-blue-600">{items.length}</div>
                </div>
                {/* Add more stats as needed */}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    [Field 1]
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    [Field 2]
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {item.[field1]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.[field2]}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                                        <Link
                                            href={`/admin/[modul]/${item.id}/edit`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {items.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <div className="text-5xl mb-4">📋</div>
                        <p>Belum ada data [modul]</p>
                    </div>
                )}
            </div>
        </div>
    );
}
```

---

## 🔧 TEMPLATE 2: Form Component

**File:** `src/app/(admin)/admin/[modul]/[Modul]Form.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    item?: {
        id: number;
        [key: string]: any;
    };
};

export default function [Modul]Form({ item }: Props) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        field1: item?.field1 || '',
        field2: item?.field2 || '',
        // Add more fields
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = item 
                ? `/api/admin/[modul]/${item.id}`
                : '/api/admin/[modul]';
            
            const method = item ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Gagal menyimpan data');
            }

            alert(item ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!');
            router.push('/admin/[modul]');
            router.refresh();
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!item || !confirm('Yakin ingin menghapus?')) return;

        try {
            const response = await fetch(`/api/admin/[modul]/${item.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Gagal menghapus');

            alert('Data berhasil dihapus!');
            router.push('/admin/[modul]');
            router.refresh();
        } catch (error) {
            console.error('Error:', error);
            alert('Gagal menghapus data');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Field 1 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field 1 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.field1}
                    onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>

            {/* Field 2 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field 2
                </label>
                <textarea
                    value={formData.field2}
                    onChange={(e) => setFormData({ ...formData, field2: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50"
                >
                    {isSubmitting ? 'Menyimpan...' : (item ? '💾 Update' : '➕ Tambah')}
                </button>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
                >
                    ← Kembali
                </button>

                {item && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="ml-auto px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold"
                    >
                        🗑️ Hapus
                    </button>
                )}
            </div>
        </form>
    );
}
```

---

## 🔧 TEMPLATE 3: API Route

**File:** `src/app/api/admin/[modul]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all items
export async function GET() {
    try {
        const items = await prisma.[tabel].findMany({
            orderBy: { tgl_update: 'desc' }
        });
        return NextResponse.json(items);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data' },
            { status: 500 }
        );
    }
}

// POST create new item
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { field1, field2 } = body;

        // Validation
        if (!field1) {
            return NextResponse.json(
                { error: 'Field1 wajib diisi' },
                { status: 400 }
            );
        }

        const item = await prisma.[tabel].create({
            data: {
                field1,
                field2,
                tgl_update: new Date(),
                user: 'admin', // TODO: get from session
            },
        });

        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Gagal menambahkan data' },
            { status: 500 }
        );
    }
}
```

**File:** `src/app/api/admin/[modul]/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single item
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const item = await prisma.[tabel].findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!item) {
            return NextResponse.json(
                { error: 'Data tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json(item);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data' },
            { status: 500 }
        );
    }
}

// PUT update item
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { field1, field2 } = body;

        const item = await prisma.[tabel].update({
            where: { id: parseInt(params.id) },
            data: {
                field1,
                field2,
                tgl_update: new Date(),
                user: 'admin',
            },
        });

        return NextResponse.json(item);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Gagal memperbarui data' },
            { status: 500 }
        );
    }
}

// DELETE item
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.[tabel].delete({
            where: { id: parseInt(params.id) }
        });

        return NextResponse.json({ message: 'Data berhasil dihapus' });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Gagal menghapus data' },
            { status: 500 }
        );
    }
}
```

---

## 📝 CARA MENGGUNAKAN TEMPLATE

### Step 1: Copy Template
Copy semua template di atas

### Step 2: Replace Placeholders
- `[modul]` → nama modul (lowercase): `berita`, `agenda`, `video`, dll
- `[Modul]` → nama modul (PascalCase): `Berita`, `Agenda`, `Video`, dll
- `[MODUL]` → nama modul (UPPERCASE): `BERITA`, `AGENDA`, `VIDEO`, dll
- `[tabel]` → nama tabel Prisma: `tbl_berita`, `agenda`, `tbl_video`, dll
- `field1`, `field2` → sesuaikan dengan kolom tabel Anda

### Step 3: Customize
- Tambah/kurangi fields sesuai kebutuhan
- Adjust validation rules
- Customize UI/styling

### Step 4: Test
- Test create, read, update, delete
- Test validation
- Test error handling

---

## 🎯 CONTOH PENGGUNAAN

### Membuat Modul AGENDA:

1. **Replace:**
   - `[modul]` → `agenda`
   - `[Modul]` → `Agenda`
   - `[tabel]` → `agenda`

2. **Fields:**
   - `field1` → `judul`
   - `field2` → `deskripsi`
   - Add: `tanggal_mulai`, `tanggal_selesai`, `lokasi`, `kategori`

3. **Buat 6 files:**
   - `src/app/(admin)/admin/agenda/page.tsx`
   - `src/app/(admin)/admin/agenda/new/page.tsx`
   - `src/app/(admin)/admin/agenda/[id]/edit/page.tsx`
   - `src/app/(admin)/admin/agenda/AgendaForm.tsx`
   - `src/app/api/admin/agenda/route.ts`
   - `src/app/api/admin/agenda/[id]/route.ts`

4. **Test:**
   - http://localhost:3004/admin/agenda

---

## 📚 FIELD MAPPING REFERENCE

### BERITA (tbl_berita):
- id_berita (VARCHAR - primary key)
- judul (VARCHAR)
- isi (TEXT)
- foto (VARCHAR)
- kategori (VARCHAR)
- baca (INT)
- suka (INT)
- tgl_update, user

### REGULASI (dokumen):
- no_dokumen (VARCHAR - primary key)
- judul (VARCHAR)
- nomor (VARCHAR)
- tahun (CHAR)
- jns_dokumen (CHAR)
- file (VARCHAR)
- deskripsi (TEXT)
- status (CHAR)
- tgl_upload, user

### AGENDA (agenda):
- id (INT - auto increment)
- judul (VARCHAR)
- deskripsi (TEXT)
- tanggal_mulai (DATETIME)
- tanggal_selesai (DATETIME)
- lokasi (VARCHAR)
- penyelenggara (VARCHAR)
- kategori (VARCHAR)
- foto (VARCHAR)
- status (VARCHAR)
- tgl_update, user

### VIDEO (tbl_video):
- id (CHAR - primary key)
- video (VARCHAR)
- keterangan (VARCHAR)
- tgl_update, user

### GALERI (tbl_galery):
- id (INT - auto increment)
- foto (VARCHAR)
- keterangan (TEXT)
- tgl_update, user

### KONTAK (kontak):
- id (INT - auto increment)
- kategori (VARCHAR)
- nama (VARCHAR)
- jabatan (VARCHAR)
- telepon (VARCHAR)
- email (VARCHAR)
- alamat (TEXT)
- jam_operasional (VARCHAR)
- urutan (INT)
- status (INT)
- tgl_update, user

---

## 🚀 QUICK START

Untuk membuat modul baru dengan cepat:

```bash
# 1. Buat struktur folder
mkdir -p src/app/(admin)/admin/[modul]
mkdir -p src/app/(admin)/admin/[modul]/new
mkdir -p src/app/(admin)/admin/[modul]/[id]
mkdir -p src/app/api/admin/[modul]
mkdir -p src/app/api/admin/[modul]/[id]

# 2. Copy template ke setiap file
# 3. Find & Replace [modul], [Modul], [tabel], fields
# 4. Test di browser
```

---

**Template ini bisa membuat 1 modul CRUD lengkap dalam 15-30 menit!** 🎉
