import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const statistik = await prisma.data_statistik.findMany({
            orderBy: [
                { tahun: 'desc' },
                { bulan: 'desc' },
            ],
        });
        return NextResponse.json(statistik);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch statistik' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const statistik = await prisma.data_statistik.create({
            data: {
                kategori: body.kategori,
                judul: body.judul,
                deskripsi: body.deskripsi || null,
                periode: body.periode || null,
                nilai: body.nilai ? parseFloat(body.nilai) : null,
                satuan: body.satuan || null,
                file_data: body.file_data || null,
                tahun: body.tahun || null,
                bulan: body.bulan || null,
                tgl_update: new Date(),
                user: 'admin',
            },
        });
        return NextResponse.json(statistik, { status: 201 });
    } catch (error) {
        console.error('Error creating statistik:', error);
        return NextResponse.json({ error: 'Failed to create statistik' }, { status: 500 });
    }
}

