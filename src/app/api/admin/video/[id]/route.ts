import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const video = await prisma.tbl_video.findUnique({
            where: { id: id },
        });

        if (!video) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        return NextResponse.json(video);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const video = await prisma.tbl_video.update({
            where: { id: id },
            data: {
                video: body.video,
                keterangan: body.keterangan || null,
            },
        });
        return NextResponse.json(video);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.tbl_video.delete({
            where: { id: id },
        });
        return NextResponse.json({ message: 'Video deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
    }
}
