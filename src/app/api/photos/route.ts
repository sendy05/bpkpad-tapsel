import { NextResponse } from 'next/server';
import { photos } from '@/data/photos';

export function GET(request: Request) {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;
    const tahun = url.searchParams.get('tahun') ? Number(url.searchParams.get('tahun')) : undefined;
    const event = url.searchParams.get('event') ?? undefined;
    let result = photos.filter(p => (tahun ? p.tahun === tahun : true) && (event ? p.event === event : true));
    if (limit) result = result.slice(0, limit);
    return NextResponse.json(result);
}

