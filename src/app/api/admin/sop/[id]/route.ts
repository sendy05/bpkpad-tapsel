import { NextResponse } from 'next/server';
// Auth handled by middleware
import { prisma } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { judul, kategori, nomor, tgl_terbit, deskripsi, file, status } = body;

        if (!judul || !kategori) {
            return NextResponse.json({ error: 'Judul dan kategori wajib diisi' }, { status: 400 });
        }

        const sop = await prisma.sop_dokumen.update({
            where: { id: parseInt(params.id) },
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
        console.error('Error updating sop:', error);
        return NextResponse.json({ error: 'Failed to update sop' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.sop_dokumen.delete({
            where: { id: parseInt(params.id) }
        });

        return NextResponse.json({ message: 'SOP berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting sop:', error);
        return NextResponse.json({ error: 'Failed to delete sop' }, { status: 500 });
    }
}
