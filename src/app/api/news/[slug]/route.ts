// Legacy news API - tidak digunakan
import { NextResponse } from 'next/server';

export async function GET(_request: Request, ctx: { params: Promise<{ slug: string }> }) {
    return NextResponse.json({ error: 'Endpoint tidak tersedia' }, { status: 410 });
}

/* LEGACY CODE
import { news } from '@/data/news';

export async function GET_OLD(_request: Request, ctx: { params: Promise<{ slug: string }> }) {
    const { slug } = await ctx.params;
    const item = news.find((n: any) => n.slug === slug);
    if (!item) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(item);
}
*/
