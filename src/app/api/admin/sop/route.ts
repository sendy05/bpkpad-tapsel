import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const sop = await prisma.sop_dokumen.findMany({
            orderBy: { tgl_terbit: 'desc' }
        });

        return NextResponse.json(sop);
    } catch (error) {
        console.error('Error fetching sop:', error);
        return NextResponse.json({ error: 'Failed to fetch sop' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { judul, kategori, nomor, tgl_terbit, deskripsi, file, status } = body;

        if (!judul || !kategori) {
            return NextResponse.json({ error: 'Judul dan kategori wajib diisi' }, { status: 400 });
        }

        const sop = await prisma.sop_dokumen.create({
            data: {
                judul,
                kategori,
                nomor: nomor || null,
                tgl_terbit: tgl_terbit ? new Date(tgl_terbit) : null,
                deskripsi: deskripsi || null,
                file: file || null,
                status: status ?? 1,
                tgl_update: new Date(),
                user: 'admin',
            },
        });

        return NextResponse.json(sop);
    } catch (error) {
        console.error('Error creating sop:', error);
        return NextResponse.json({ error: 'Failed to create sop' }, { status: 500 });
    }
}
