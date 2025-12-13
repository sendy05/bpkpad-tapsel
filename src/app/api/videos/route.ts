import { NextResponse } from 'next/server';
import { videos } from '@/data/videos';

export function GET() {
    return NextResponse.json(videos);
}

