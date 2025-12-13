import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';

// GET - Get single slider
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const slider = await prisma.tbl_slider.findUnique({
            where: { id: parseInt(id) }
        });

        if (!slider) {
            return NextResponse.json(
                { error: 'Slider tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json(slider);
    } catch (error) {
        console.error('Error fetching slider:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data slider' },
            { status: 500 }
        );
    }
}

// PATCH - Update slider
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const { foto, keterangan } = body;

        if (!foto) {
            return NextResponse.json(
                { error: 'URL foto harus diisi' },
                { status: 400 }
            );
        }

        const slider = await prisma.tbl_slider.update({
            where: { id: parseInt(id) },
            data: {
                foto,
                keterangan,
                tgl_update: new Date(),
                user: session.user.name || session.user.email || 'admin',
            },
        });

        return NextResponse.json(slider);
    } catch (error) {
        console.error('Error updating slider:', error);
        return NextResponse.json(
            { error: 'Gagal memperbarui slider' },
            { status: 500 }
        );
    }
}

// DELETE - Delete slider
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        await prisma.tbl_slider.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Slider berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting slider:', error);
        return NextResponse.json(
            { error: 'Gagal menghapus slider' },
            { status: 500 }
        );
    }
}
