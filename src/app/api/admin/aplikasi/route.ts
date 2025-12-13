import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET - Fetch all aplikasi
export async function GET() {
    try {
        const aplikasiList = await prisma.tbl_aplikasi.findMany({
            orderBy: { tgl_update: 'desc' },
        });

        return NextResponse.json(aplikasiList);
    } catch (error) {
        console.error('Error fetching aplikasi:', error);
        return NextResponse.json(
            { error: 'Failed to fetch aplikasi' },
            { status: 500 }
        );
    }
}

// POST - Create new aplikasi
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { id_aplikasi, nm_aplikasi, link, icon, user } = body;

        const newAplikasi = await prisma.tbl_aplikasi.create({
            data: {
                id_aplikasi,
                nm_aplikasi,
                link,
                icon,
                user: user || 'Admin',
                tgl_update: new Date(),
            },
        });

        return NextResponse.json(newAplikasi, { status: 201 });
    } catch (error) {
        console.error('Error creating aplikasi:', error);
        return NextResponse.json(
            { error: 'Failed to create aplikasi' },
            { status: 500 }
        );
    }
}

