import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyToken, signAccessToken } from '@/lib/auth';

export async function POST() {
    const jar = await cookies();
    const refresh = jar.get('refresh')?.value;
    if (!refresh) return NextResponse.json({ error: 'Tidak ada refresh token' }, { status: 401 });

    try {
        const payload = await verifyToken(refresh);
        if (payload.type !== 'refresh') throw new Error('Invalid token');
        const access = await signAccessToken(payload.sub, payload.role);
        const res = NextResponse.json({ ok: true });
        res.cookies.set('access', access, { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 15 });
        // Update last activity
        res.cookies.set('la', String(Date.now()), { httpOnly: false, sameSite: 'lax', secure: true, path: '/' });
        return res;
    } catch (e) {
        return NextResponse.json({ error: 'Refresh gagal' }, { status: 401 });
    }
}
