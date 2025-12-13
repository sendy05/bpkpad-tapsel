import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const kontak = await prisma.kontak.findMany({
            orderBy: { urutan: 'asc' },
        });
        return NextResponse.json(kontak);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch kontak' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const kontak = await prisma.kontak.create({
            data: {
                kategori: body.kategori,
                nama: body.nama,
                jabatan: body.jabatan || null,
                telepon: body.telepon || null,
                email: body.email || null,
                alamat: body.alamat || null,
                jam_operasional: body.jam_operasional || null,
                map_url: body.map_url || null,
                urutan: body.urutan || 0,
                status: body.status || 1,
                tgl_update: new Date(),
                user: 'admin',
            },
        });
        return NextResponse.json(kontak, { status: 201 });
    } catch (error) {
        console.error('Error creating kontak:', error);
        return NextResponse.json({ error: 'Failed to create kontak' }, { status: 500 });
    }
}

