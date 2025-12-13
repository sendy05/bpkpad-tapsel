import { NextRequest, NextResponse } from 'next/server';
// Auth handled by middleware
import { prisma } from '@/lib/db';

// GET - List all layanan with optional filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const kategori = searchParams.get('kategori');
        const search = searchParams.get('search');
        const status = searchParams.get('status');

        const where: any = {};

        if (kategori) {
            where.kategori = kategori;
        }

        if (status) {
            where.status = parseInt(status);
        }

        if (search) {
            where.OR = [
                { judul: { contains: search } },
                { deskripsi: { contains: search } },
            ];
        }

        const layanan = await prisma.layanan.findMany({
            where,
            orderBy: { tgl_update: 'desc' },
        });

        // Get stats
        const stats = {
            total: await prisma.layanan.count(),
            active: await prisma.layanan.count({ where: { status: 1 } }),
            inactive: await prisma.layanan.count({ where: { status: 0 } }),
            retribusi: await prisma.layanan.count({ where: { kategori: 'retribusi' } }),
            aset: await prisma.layanan.count({ where: { kategori: 'aset' } }),
            pengaduan: await prisma.layanan.count({ where: { kategori: 'pengaduan' } }),
        };

        return NextResponse.json({ layanan, stats });
    } catch (error) {
        console.error('Error fetching layanan:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST - Create new layanan
export async function POST(request: NextRequest) {
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

        const layanan = await prisma.layanan.create({
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

        return NextResponse.json(layanan, { status: 201 });
    } catch (error) {
        console.error('Error creating layanan:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

