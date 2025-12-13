import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const agenda = await prisma.agenda.findMany({
            orderBy: { tanggal_mulai: 'desc' },
        });
        return NextResponse.json(agenda);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch agenda' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const agenda = await prisma.agenda.create({
            data: {
                judul: body.judul,
                deskripsi: body.deskripsi || null,
                tanggal_mulai: new Date(body.tanggal_mulai),
                tanggal_selesai: body.tanggal_selesai ? new Date(body.tanggal_selesai) : null,
                lokasi: body.lokasi || null,
                penyelenggara: body.penyelenggara || null,
                kategori: body.kategori || null,
                foto: body.foto || null,
                status: body.status || 'upcoming',
                tgl_update: new Date(),
                user: 'admin',
            },
        });
        return NextResponse.json(agenda, { status: 201 });
    } catch (error) {
        console.error('Error creating agenda:', error);
        return NextResponse.json({ error: 'Failed to create agenda' }, { status: 500 });
    }
}

