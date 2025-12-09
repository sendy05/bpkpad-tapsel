import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const galeri = await prisma.tbl_galery.findUnique({
            where: { id: parseInt(params.id) },
        });

        if (!galeri) {
            return NextResponse.json({ error: 'Galeri not found' }, { status: 404 });
        }

        return NextResponse.json(galeri);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch galeri' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const galeri = await prisma.tbl_galery.update({
            where: { id: parseInt(params.id) },
            data: {
                foto: body.foto,
                keterangan: body.keterangan || null,
            },
        });
        return NextResponse.json(galeri);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update galeri' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.tbl_galery.delete({
            where: { id: parseInt(params.id) },
        });
        return NextResponse.json({ message: 'Galeri deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete galeri' }, { status: 500 });
    }
}
