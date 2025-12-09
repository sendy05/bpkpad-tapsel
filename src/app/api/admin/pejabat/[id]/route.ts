import { NextResponse } from 'next/server';
// Auth handled by middleware
import { prisma } from '@/lib/db';

// PUT - Update pejabat
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await request.json();
        const { nama, jabatan, nip, email, telepon, urutan, status, foto } = body;

        if (!nama || !jabatan) {
            return NextResponse.json({ error: 'Nama dan jabatan wajib diisi' }, { status: 400 });
        }

        const pejabat = await prisma.pejabat.update({
            where: { id: parseInt(id) },
            data: {
                nama,
                jabatan,
                nip: nip || null,
                email: email || null,
                telepon: telepon || null,
                urutan: urutan || 0,
                status: status ?? 1,
                foto: foto || null,
                tgl_update: new Date(),
                user: 'admin',
            },
        });

        return NextResponse.json(pejabat);
    } catch (error) {
        console.error('Error updating pejabat:', error);
        return NextResponse.json({ error: 'Failed to update pejabat' }, { status: 500 });
    }
}

// DELETE - Delete pejabat
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        await prisma.pejabat.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Pejabat berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting pejabat:', error);
        return NextResponse.json({ error: 'Failed to delete pejabat' }, { status: 500 });
    }
}
