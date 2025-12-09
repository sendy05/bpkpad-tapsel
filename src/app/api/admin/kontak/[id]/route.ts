import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const kontak = await prisma.kontak.findUnique({
            where: { id: parseInt(params.id) },
        });

        if (!kontak) {
            return NextResponse.json({ error: 'Kontak not found' }, { status: 404 });
        }

        return NextResponse.json(kontak);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch kontak' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const kontak = await prisma.kontak.update({
            where: { id: parseInt(params.id) },
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
        return NextResponse.json(kontak);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update kontak' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.kontak.delete({
            where: { id: parseInt(params.id) },
        });
        return NextResponse.json({ message: 'Kontak deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete kontak' }, { status: 500 });
    }
}
