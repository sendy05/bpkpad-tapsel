import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const regulasi = await prisma.dokumen.findMany({
            orderBy: { no_dokumen: 'desc' },
        });
        return NextResponse.json(regulasi);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch regulasi' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const regulasi = await prisma.dokumen.create({
            data: {
                no_dokumen: body.no_dokumen,
                judul: body.judul,
                nomor: body.nomor || null,
                tahun: body.tahun || null,
                jns_dokumen: body.jns_dokumen,
                file: body.file || null,
            },
        });
        return NextResponse.json(regulasi, { status: 201 });
    } catch (error) {
        console.error('Error creating regulasi:', error);
        return NextResponse.json({ error: 'Failed to create regulasi' }, { status: 500 });
    }
}

