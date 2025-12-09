import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const contentType = request.headers.get('content-type') || '';
    let data: Record<string, unknown> = {};

    if (contentType.includes('application/json')) {
        data = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
        const form = await request.formData();
        data = Object.fromEntries(form.entries());
    } else {
        return NextResponse.json({ ok: false, message: 'Unsupported content type' }, { status: 415 });
    }

    const { nama, email, subjek, pesan } = data as { nama?: string; email?: string; subjek?: string; pesan?: string };
    if (!nama || !email || !subjek || !pesan) {
        return NextResponse.json({ ok: false, message: 'Semua field wajib diisi.' }, { status: 400 });
    }

    // TODO: Tambahkan CSRF token validation & rate limiting di production
    // Simulasi sukses
    return NextResponse.json({ ok: true, message: 'Pesan Anda telah terkirim.' });
}
