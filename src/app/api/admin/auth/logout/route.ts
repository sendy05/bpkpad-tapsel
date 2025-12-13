import { NextResponse } from 'next/server';
import { assertCsrf } from '@/lib/csrf';

export async function POST() {
    try {
        await assertCsrf();
    } catch (e) {
        return NextResponse.json({ error: 'CSRF invalid' }, { status: 403 });
    }

    const res = NextResponse.json({ ok: true });
    // Clear cookies by setting empty value and maxAge 0
    res.cookies.set('access', '', { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 0 });
    res.cookies.set('refresh', '', { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 0 });
    res.cookies.set('la', '', { httpOnly: false, sameSite: 'lax', secure: true, path: '/', maxAge: 0 });
    return res;
}

