import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const galeri = await prisma.tbl_galery.findMany({
            orderBy: { id: 'desc' },
        });
        return NextResponse.json(galeri);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch galeri' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const galeri = await prisma.tbl_galery.create({
            data: {
                foto: body.foto,
                keterangan: body.keterangan || null,
            },
        });
        return NextResponse.json(galeri, { status: 201 });
    } catch (error) {
        console.error('Error creating galeri:', error);
        return NextResponse.json({ error: 'Failed to create galeri' }, { status: 500 });
    }
}

