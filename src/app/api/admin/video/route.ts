import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const videos = await prisma.tbl_video.findMany({
            orderBy: { id: 'desc' },
        });
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const video = await prisma.tbl_video.create({
            data: {
                id: String(Date.now()),
                video: body.video,
                keterangan: body.keterangan || '',
                tgl_update: new Date(),
                user: 'admin',
            },
        });
        return NextResponse.json(video, { status: 201 });
    } catch (error) {
        console.error('Error creating video:', error);
        return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
    }
}

