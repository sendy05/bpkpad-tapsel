import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Public API to fetch layanan
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const kategori = searchParams.get('kategori');

        const where: any = { status: 1 }; // Only active layanan

        if (kategori && ['retribusi', 'aset', 'pengaduan'].includes(kategori)) {
            where.kategori = kategori;
        }

        const layanan = await prisma.layanan.findMany({
            where,
            orderBy: { tgl_update: 'desc' },
        });

        return NextResponse.json(layanan);
    } catch (error) {
        console.error('Error fetching layanan:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

