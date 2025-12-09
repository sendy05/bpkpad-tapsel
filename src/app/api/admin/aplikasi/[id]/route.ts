import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET - Fetch single aplikasi
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const aplikasi = await prisma.tbl_aplikasi.findUnique({
            where: { id_aplikasi: parseInt(id) },
        });

        if (!aplikasi) {
            return NextResponse.json(
                { error: 'Aplikasi not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(aplikasi);
    } catch (error) {
        console.error('Error fetching aplikasi:', error);
        return NextResponse.json(
            { error: 'Failed to fetch aplikasi' },
            { status: 500 }
        );
    }
}

// PUT - Update aplikasi
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { nm_aplikasi, link, icon, user } = body;

        const updatedAplikasi = await prisma.tbl_aplikasi.update({
            where: { id_aplikasi: parseInt(id) },
            data: {
                nm_aplikasi,
                link,
                icon,
                user: user || 'Admin',
                tgl_update: new Date(),
            },
        });

        return NextResponse.json(updatedAplikasi);
    } catch (error) {
        console.error('Error updating aplikasi:', error);
        return NextResponse.json(
            { error: 'Failed to update aplikasi' },
            { status: 500 }
        );
    }
}

// DELETE - Delete aplikasi
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.tbl_aplikasi.delete({
            where: { id_aplikasi: parseInt(id) },
        });

        return NextResponse.json(
            { message: 'Aplikasi deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting aplikasi:', error);
        return NextResponse.json(
            { error: 'Failed to delete aplikasi' },
            { status: 500 }
        );
    }
}
