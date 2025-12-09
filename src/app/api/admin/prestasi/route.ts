import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const prestasi = await prisma.prestasi_organisasi.findMany({
            orderBy: { tanggal: 'desc' }
        });

        return NextResponse.json(prestasi);
    } catch (error) {
        console.error('Error fetching prestasi:', error);
        return NextResponse.json({ error: 'Failed to fetch prestasi' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { judul, deskripsi, pemberi, tanggal, kategori, foto } = body;

        if (!judul || !tanggal) {
            return NextResponse.json({ error: 'Judul dan tanggal wajib diisi' }, { status: 400 });
        }

        const prestasi = await prisma.prestasi_organisasi.create({
            data: {
                judul,
                deskripsi: deskripsi || null,
                pemberi: pemberi || null,
                tanggal: new Date(tanggal),
                kategori: kategori || null,
                foto: foto || null,
                tgl_update: new Date(),
                user: 'admin',
            },
        });

        return NextResponse.json(prestasi);
    } catch (error) {
        console.error('Error creating prestasi:', error);
        return NextResponse.json({ error: 'Failed to create prestasi' }, { status: 500 });
    }
}
