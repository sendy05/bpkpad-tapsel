import { NextResponse } from 'next/server';
// Auth handled by middleware
import { prisma } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { judul, deskripsi, pemberi, tanggal, kategori, foto } = body;

        if (!judul || !tanggal) {
            return NextResponse.json({ error: 'Judul dan tanggal wajib diisi' }, { status: 400 });
        }

        const prestasi = await prisma.prestasi_organisasi.update({
            where: { id: parseInt(params.id) },
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
        console.error('Error updating prestasi:', error);
        return NextResponse.json({ error: 'Failed to update prestasi' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.prestasi_organisasi.delete({
            where: { id: parseInt(params.id) }
        });

        return NextResponse.json({ message: 'Prestasi berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting prestasi:', error);
        return NextResponse.json({ error: 'Failed to delete prestasi' }, { status: 500 });
    }
}
