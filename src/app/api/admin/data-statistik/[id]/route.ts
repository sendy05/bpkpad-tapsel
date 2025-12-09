import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const statistik = await prisma.data_statistik.findUnique({
            where: { id: parseInt(id) },
        });

        if (!statistik) {
            return NextResponse.json({ error: 'Statistik not found' }, { status: 404 });
        }

        return NextResponse.json(statistik);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch statistik' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const statistik = await prisma.data_statistik.update({
            where: { id: parseInt(id) },
            data: {
                kategori: body.kategori,
                judul: body.judul,
                deskripsi: body.deskripsi || null,
                periode: body.periode || null,
                nilai: body.nilai ? parseFloat(body.nilai) : null,
                satuan: body.satuan || null,
                file_data: body.file_data || null,
                tahun: body.tahun || null,
                bulan: body.bulan || null,
                tgl_update: new Date(),
                user: 'admin',
            },
        });
        return NextResponse.json(statistik);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update statistik' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.data_statistik.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: 'Statistik deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete statistik' }, { status: 500 });
    }
}
