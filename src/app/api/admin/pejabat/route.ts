import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - List all pejabat
export async function GET() {
    try {
        const pejabat = await prisma.pejabat.findMany({
            orderBy: { urutan: 'asc' }
        });

        return NextResponse.json(pejabat);
    } catch (error) {
        console.error('Error fetching pejabat:', error);
        return NextResponse.json({ error: 'Failed to fetch pejabat' }, { status: 500 });
    }
}

// POST - Create new pejabat
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nama, jabatan, nip, email, telepon, urutan, status, foto } = body;

        if (!nama || !jabatan) {
            return NextResponse.json({ error: 'Nama dan jabatan wajib diisi' }, { status: 400 });
        }

        const pejabat = await prisma.pejabat.create({
            data: {
                nama,
                jabatan,
                nip: nip || null,
                email: email || null,
                telepon: telepon || null,
                urutan: urutan || 0,
                status: status ?? 1,
                foto: foto || null,
                tgl_update: new Date(),
                user: 'admin',
            },
        });

        return NextResponse.json(pejabat);
    } catch (error) {
        console.error('Error creating pejabat:', error);
        return NextResponse.json({ error: 'Failed to create pejabat' }, { status: 500 });
    }
}

