import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// Auth handled by middleware

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { visi, misi, sejarah, tugas_pokok } = data;

        // Check if profil already exists
        const existing = await prisma.profil_organisasi.findFirst();

        let result;
        if (existing) {
            // Update
            result = await prisma.profil_organisasi.update({
                where: { id: existing.id },
                data: {
                    visi,
                    misi,
                    sejarah,
                    tugas_pokok,
                    tgl_update: new Date(),
                    user: 'admin',
                },
            });
        } else {
            // Create
            result = await prisma.profil_organisasi.create({
                data: {
                    visi,
                    misi,
                    sejarah,
                    tugas_pokok,
                    tgl_update: new Date(),
                    user: 'admin',
                },
            });
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Error saving profil:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to save profil' },
            { status: 500 }
        );
    }
}
