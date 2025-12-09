import { NextRequest, NextResponse } from 'next/server';
// Auth handled by middleware
import { prisma } from '@/lib/prisma';

// GET - Get single layanan by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const layanan = await prisma.layanan.findUnique({
            where: { id: parseInt(id) },
        });

        if (!layanan) {
            return NextResponse.json({ error: 'Layanan tidak ditemukan' }, { status: 404 });
        }

        return NextResponse.json(layanan);
    } catch (error) {
        console.error('Error fetching layanan:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update layanan
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const {
            kategori,
            judul,
            deskripsi,
            prosedur,
            persyaratan,
            biaya,
            waktu_penyelesaian,
            link_url,
            icon,
            status,
        } = body;

        // Validation
        if (!kategori || !judul) {
            return NextResponse.json(
                { error: 'Kategori dan judul wajib diisi' },
                { status: 400 }
            );
        }

        if (!['retribusi', 'aset', 'pengaduan'].includes(kategori)) {
            return NextResponse.json(
                { error: 'Kategori tidak valid' },
                { status: 400 }
            );
        }

        const layanan = await prisma.layanan.update({
            where: { id: parseInt(id) },
            data: {
                kategori,
                judul,
                deskripsi: deskripsi || null,
                prosedur: prosedur || null,
                persyaratan: persyaratan || null,
                biaya: biaya || null,
                waktu_penyelesaian: waktu_penyelesaian || null,
                link_url: link_url || null,
                icon: icon || null,
                status: status ? 1 : 0,
                tgl_update: new Date(),
                user: 'admin',
            },
        });

        return NextResponse.json(layanan);
    } catch (error) {
        console.error('Error updating layanan:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE - Delete layanan
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.layanan.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Layanan berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting layanan:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
