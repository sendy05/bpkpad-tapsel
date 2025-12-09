import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const agenda = await prisma.agenda.findUnique({
            where: { id: parseInt(id) },
        });

        if (!agenda) {
            return NextResponse.json({ error: 'Agenda not found' }, { status: 404 });
        }

        return NextResponse.json(agenda);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch agenda' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const agenda = await prisma.agenda.update({
            where: { id: parseInt(id) },
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
        return NextResponse.json(agenda);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update agenda' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.agenda.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: 'Agenda deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete agenda' }, { status: 500 });
    }
}
