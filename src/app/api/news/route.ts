import { NextResponse } from 'next/server';
import { news } from '@/data/news';

export function GET(request: Request) {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '12');
    const kategori = url.searchParams.get('kategori') ?? undefined;
    const bulan = url.searchParams.get('bulan') ? Number(url.searchParams.get('bulan')) : undefined;
    const tahun = url.searchParams.get('tahun') ? Number(url.searchParams.get('tahun')) : undefined;
    const q = url.searchParams.get('q') ?? undefined;

    const filtered = news.filter(n => {
        const matchKategori = kategori ? n.kategori === (kategori as any) : true;
        const d = new Date(n.published_at);
        const matchBulan = bulan ? d.getMonth() + 1 === bulan : true;
        const matchTahun = tahun ? d.getFullYear() === tahun : true;
        const matchQ = q ? (n.judul + ' ' + n.konten).toLowerCase().includes(q.toLowerCase()) : true;
        return matchKategori && matchBulan && matchTahun && matchQ;
    });

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return NextResponse.json({ items, total });
}

