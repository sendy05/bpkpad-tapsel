import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';

// GET - List all sliders
export async function GET() {
    try {
        const sliders = await prisma.tbl_slider.findMany({
            orderBy: { tgl_update: 'desc' }
        });
        return NextResponse.json(sliders);
    } catch (error) {
        console.error('Error fetching sliders:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data slider' },
            { status: 500 }
        );
    }
}

// POST - Create new slider
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { foto, keterangan } = body;

        if (!foto) {
            return NextResponse.json(
                { error: 'URL foto harus diisi' },
                { status: 400 }
            );
        }

        const slider = await prisma.tbl_slider.create({
            data: {
                foto,
                keterangan,
                tgl_update: new Date(),
                user: session.user.name || session.user.email || 'admin',
            },
        });

        return NextResponse.json(slider, { status: 201 });
    } catch (error) {
        console.error('Error creating slider:', error);
        return NextResponse.json(
            { error: 'Gagal membuat slider baru' },
            { status: 500 }
        );
    }
}

