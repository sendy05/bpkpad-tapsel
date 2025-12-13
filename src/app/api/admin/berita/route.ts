import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

// GET - List all berita
export async function GET() {
    try {
        const beritaList = await prisma.tbl_berita.findMany({
            orderBy: { tgl_update: 'desc' },
        });

        return NextResponse.json(beritaList);
    } catch (error: any) {
        console.error('Error fetching berita:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data berita' },
            { status: 500 }
        );
    }
}

// POST - Create new berita
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { judul, isi, kategori, foto } = body;

        console.log('Creating berita:', { judul, kategori, hasFoto: !!foto });

        // Validation
        if (!judul || !isi) {
            return NextResponse.json(
                { error: 'Judul dan isi berita wajib diisi' },
                { status: 400 }
            );
        }

        // Generate ID (timestamp + random)
        const id_berita = `BERITA_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Calculate file size for base64 images
        let ukuran = '0';
        let type = 'image/jpeg';
        
        if (foto && foto.startsWith('data:image')) {
            // Extract image type from base64
            const matches = foto.match(/^data:image\/(\w+);base64,/);
            if (matches) {
                type = `image/${matches[1]}`;
            }
            // Calculate approximate size (base64 is ~33% larger than original)
            const base64Length = foto.split(',')[1]?.length || 0;
            const sizeInBytes = (base64Length * 3) / 4;
            ukuran = Math.round(sizeInBytes / 1024).toString(); // KB
        }

        const newBerita = await prisma.tbl_berita.create({
            data: {
                id_berita,
                judul,
                isi,
                kategori: kategori || 'Umum',
                foto: foto || '',
                ukuran: ukuran || '0',
                type: type || 'image/jpeg',
                baca: 0,
                suka: 0,
                tgl_update: new Date(),
                user: session.user.name || session.user.email || 'admin',
            },
        });

        return NextResponse.json(newBerita, { status: 201 });
    } catch (error: any) {
        console.error('Error creating berita:', error);
        return NextResponse.json(
            { 
                error: 'Gagal menyimpan berita',
                message: error.message,
                details: error.toString()
            },
            { status: 500 }
        );
    }
}

