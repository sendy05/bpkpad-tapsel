import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Public API to fetch single layanan
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const layanan = await prisma.layanan.findUnique({
            where: {
                id: parseInt(id),
                status: 1, // Only active layanan
            },
        });

        if (!layanan) {
            return NextResponse.json(
                { error: 'Layanan tidak ditemukan' },
                { status: 404 }
            );
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
