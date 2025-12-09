import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single informasi publik
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const informasi = await prisma.informasiPublik.findUnique({
            where: { id: parseInt(id) }
        });

        if (!informasi) {
            return NextResponse.json(
                { error: 'Informasi publik tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json(informasi);
    } catch (error) {
        console.error('Error fetching informasi publik:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data informasi publik' },
            { status: 500 }
        );
    }
}

// PUT update informasi publik
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const { kategori, judul, ringkasan, pejabatPengelola, tanggalPublikasi, fileUrl, status } = body;

        // Validation
        if (!kategori || !judul || !pejabatPengelola || !tanggalPublikasi) {
            return NextResponse.json(
                { error: 'Field kategori, judul, pejabatPengelola, dan tanggalPublikasi wajib diisi' },
                { status: 400 }
            );
        }

        if (!['BERKALA', 'SERTA_MERTA', 'SETIAP_SAAT'].includes(kategori)) {
            return NextResponse.json(
                { error: 'Kategori tidak valid' },
                { status: 400 }
            );
        }

        const informasi = await prisma.informasiPublik.update({
            where: { id: parseInt(id) },
            data: {
                kategori,
                judul,
                ringkasan: ringkasan || null,
                pejabatPengelola,
                tanggalPublikasi: new Date(tanggalPublikasi),
                fileUrl: fileUrl || null,
                status: status || 'Draft',
                tgl_update: new Date(),
                user: 'admin', // TODO: get from session
            },
        });

        return NextResponse.json(informasi);
    } catch (error) {
        console.error('Error updating informasi publik:', error);
        return NextResponse.json(
            { error: 'Gagal memperbarui informasi publik' },
            { status: 500 }
        );
    }
}

// DELETE informasi publik
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.informasiPublik.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Informasi publik berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting informasi publik:', error);
        return NextResponse.json(
            { error: 'Gagal menghapus informasi publik' },
            { status: 500 }
        );
    }
}
