import { NextResponse } from 'next/server';
// Auth handled by middleware
import { prisma } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await request.json();
        const { gambar, keterangan } = body;

        if (!gambar) {
            return NextResponse.json({ error: 'Gambar wajib diisi' }, { status: 400 });
        }

        const struktur = await prisma.struktur_organisasi.update({
            where: { id: parseInt(id) },
            data: {
                gambar,
                keterangan: keterangan || null,
                tgl_update: new Date(),
                user: 'admin',
            },
        });

        return NextResponse.json(struktur);
    } catch (error) {
        console.error('Error updating struktur:', error);
        return NextResponse.json({ error: 'Failed to update struktur' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        await prisma.struktur_organisasi.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Struktur berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting struktur:', error);
        return NextResponse.json({ error: 'Failed to delete struktur' }, { status: 500 });
    }
}
