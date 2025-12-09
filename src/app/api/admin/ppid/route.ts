import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all informasi publik
export async function GET() {
    try {
        const informasiList = await prisma.informasiPublik.findMany({
            orderBy: { tanggalPublikasi: 'desc' }
        });

        return NextResponse.json(informasiList);
    } catch (error) {
        console.error('Error fetching informasi publik:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data informasi publik' },
            { status: 500 }
        );
    }
}

// POST create new informasi publik
export async function POST(request: NextRequest) {
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

        const informasi = await prisma.informasiPublik.create({
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

        return NextResponse.json(informasi, { status: 201 });
    } catch (error) {
        console.error('Error creating informasi publik:', error);
        return NextResponse.json(
            { error: 'Gagal menambahkan informasi publik' },
            { status: 500 }
        );
    }
}
