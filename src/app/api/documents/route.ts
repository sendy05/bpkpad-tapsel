import { NextResponse } from 'next/server';
import { documents } from '@/data/documents';

export function GET(request: Request) {
    const url = new URL(request.url);
    const tipe = url.searchParams.get('tipe') as 'regulasi' | 'formulir' | 'laporan_keuangan' | null;
    const result = tipe ? documents.filter(d => d.tipe === tipe) : documents;
    return NextResponse.json(result);
}

