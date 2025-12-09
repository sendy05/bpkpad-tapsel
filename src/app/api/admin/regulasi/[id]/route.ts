import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const regulasi = await prisma.dokumen.findUnique({
            where: { no_dokumen: id },
        });

        if (!regulasi) {
            return NextResponse.json({ error: 'Regulasi not found' }, { status: 404 });
        }

        return NextResponse.json(regulasi);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch regulasi' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const regulasi = await prisma.dokumen.update({
            where: { no_dokumen: id },
            data: {
                no_dokumen: body.no_dokumen,
                judul: body.judul,
                nomor: body.nomor || null,
                tahun: body.tahun || null,
                jns_dokumen: body.jns_dokumen,
                file: body.file || null,
            },
        });
        return NextResponse.json(regulasi);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update regulasi' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.dokumen.delete({
            where: { no_dokumen: id },
        });
        return NextResponse.json({ message: 'Regulasi deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete regulasi' }, { status: 500 });
    }
}
