import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

// GET - Get single berita by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        const berita = await prisma.tbl_berita.findUnique({
            where: { id_berita: id },
        });

        if (!berita) {
            return NextResponse.json(
                { error: 'Berita tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json(berita);
    } catch (error: any) {
        console.error('Error fetching berita:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data berita' },
            { status: 500 }
        );
    }
}

// PATCH - Update berita
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { judul, isi, kategori, foto } = body;

        // Check if berita exists
        const existing = await prisma.tbl_berita.findUnique({
            where: { id_berita: id },
        });

        if (!existing) {
            return NextResponse.json(
                { error: 'Berita tidak ditemukan' },
                { status: 404 }
            );
        }

        // Update berita
        const updatedBerita = await prisma.tbl_berita.update({
            where: { id_berita: id },
            data: {
                judul: judul || existing.judul,
                isi: isi || existing.isi,
                kategori: kategori || existing.kategori,
                foto: foto !== undefined ? foto : existing.foto,
                tgl_update: new Date(),
                user: session.user.name || session.user.email || 'admin',
            },
        });

        return NextResponse.json(updatedBerita);
    } catch (error: any) {
        console.error('Error updating berita:', error);
        return NextResponse.json(
            { error: 'Gagal mengupdate berita' },
            { status: 500 }
        );
    }
}

// DELETE - Delete berita
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Check if berita exists
        const existing = await prisma.tbl_berita.findUnique({
            where: { id_berita: id },
        });

        if (!existing) {
            return NextResponse.json(
                { error: 'Berita tidak ditemukan' },
                { status: 404 }
            );
        }

        // Delete berita
        await prisma.tbl_berita.delete({
            where: { id_berita: id },
        });

        return NextResponse.json({ message: 'Berita berhasil dihapus' });
    } catch (error: any) {
        console.error('Error deleting berita:', error);
        return NextResponse.json(
            { error: 'Gagal menghapus berita' },
            { status: 500 }
        );
    }
}
