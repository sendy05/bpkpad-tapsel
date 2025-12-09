# Panduan Lengkap CRUD Admin BPKPAD

## Yang Sudah Dibuat:

### 1. Komponen Reusable
- ✅ `DeleteButtonGeneric.tsx` - Button delete universal
- ✅ `SliderForm.tsx` - Form untuk Slider

### 2. API Routes Slider
- ✅ `/api/admin/slider/route.ts` - GET all & POST
- ✅ `/api/admin/slider/[id]/route.ts` - GET, PUT, DELETE

### 3. Pages Slider
- ✅ `/admin/slider/page.tsx` - List (perlu update tombol)
- ✅ `/admin/slider/new/page.tsx` - Create
- ✅ `/admin/slider/[id]/edit/page.tsx` - Edit

## Yang Perlu Dilakukan Selanjutnya:

### Update page.tsx Slider
Tambahkan tombol Edit dan Delete ke slider/page.tsx menggunakan komponen yang sudah dibuat.

### Aplikasi CRUD (tbl_aplikasi)
1. API Routes:
   - POST `/api/admin/aplikasi/route.ts`
   - PUT/DELETE `/api/admin/aplikasi/[id]/route.ts`

2. Form Component: `AplikasiForm.tsx`
3. Pages:
   - `/admin/aplikasi/new/page.tsx`
   - `/admin/aplikasi/[id]/edit/page.tsx`
4. Update `/admin/aplikasi/page.tsx` dengan tombol CRUD

### Galeri CRUD (tbl_galery)
1. API Routes sudah ada (lihat galeri/page.tsx sudah ada delete button)
2. Lengkapi dengan:
   - Form Component: `GaleriForm.tsx`
   - Pages new & edit
   - Update list page

### Video CRUD (tbl_video)
Struktur sama dengan di atas

### Regulasi CRUD (dokumen)
Struktur sama dengan di atas

### Agenda CRUD (perlu cek tabel)
Struktur sama dengan di atas

### Kontak CRUD (perlu cek tabel)
Struktur sama dengan di atas

## Template Code untuk Copy-Paste:

### API Route Template
```typescript
// route.ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const items = await prisma.TABLE_NAME.findMany({
        orderBy: { SORT_FIELD: "desc" },
    });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newItem = await prisma.TABLE_NAME.create({
        data: { ...body, tgl_update: new Date() },
    });
    return NextResponse.json(newItem, { status: 201 });
}

// [id]/route.ts
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    const updated = await prisma.TABLE_NAME.update({
        where: { ID_FIELD: PRIMARY_KEY_TYPE(id) },
        data: { ...body, tgl_update: new Date() },
    });
    return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await prisma.TABLE_NAME.delete({
        where: { ID_FIELD: PRIMARY_KEY_TYPE(id) },
    });
    return NextResponse.json({ success: true });
}
```

### Form Component Template
Lihat `SliderForm.tsx` sebagai template.

### List Page Pattern
```tsx
<div className="flex gap-2">
    <Link
        href={`/admin/MENU/${item.id}/edit`}
        className="flex-1 btn-primary"
    >
        Edit
    </Link>
    <DeleteButtonGeneric
        id={item.id}
        endpoint="/api/admin/MENU"
        itemName="ITEM_NAME"
        className="flex-1"
    />
</div>
```

## Mapping Tabel Database:

- **Slider**: `tbl_slider` (id: int, foto: string, keterangan: string)
- **Aplikasi**: `tbl_aplikasi` (id_aplikasi: string, nm_aplikasi: string, link: string, icon: string)
- **Galeri**: `tbl_galery` (id: int, foto: string, keterangan: string)
- **Video**: `tbl_video` (id: int, url_video: string, judul: string, keterangan: string)
- **Dokumen/Regulasi**: `dokumen` (no_dokumen: string, judul: string, jns_dokumen: string, file: string)

## Priority Order:
1. ✅ Slider - DONE (tinggal update tombol di page.tsx)
2. Aplikasi - HIGH (tampil di homepage)
3. Galeri - HIGH (tampil di homepage)
4. Video - MEDIUM
5. Regulasi - MEDIUM
6. Agenda - LOW
7. Kontak - LOW
