import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const struktur = await prisma.struktur_organisasi.findMany({
            orderBy: { tgl_update: 'desc' }
        });

        return NextResponse.json(struktur);
    } catch (error) {
        console.error('Error fetching struktur:', error);
        return NextResponse.json({ error: 'Failed to fetch struktur' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { gambar, keterangan } = body;

        if (!gambar) {
            return NextResponse.json({ error: 'Gambar wajib diisi' }, { status: 400 });
        }

        const struktur = await prisma.struktur_organisasi.create({
            data: {
                gambar,
                keterangan: keterangan || null,
                tgl_update: new Date(),
                user: 'admin',
            },
        });

        return NextResponse.json(struktur);
    } catch (error) {
        console.error('Error creating struktur:', error);
        return NextResponse.json({ error: 'Failed to create struktur' }, { status: 500 });
    }
}

