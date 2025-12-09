import { NextResponse } from 'next/server';
import { getOrCreateCsrfToken } from '@/lib/csrf';

export async function GET() {
    const token = await getOrCreateCsrfToken();
    const res = NextResponse.json({ token });
    // Set/update CSRF cookie on client (not httpOnly, double-submit pattern)
    res.cookies.set('csrf', token, { httpOnly: false, sameSite: 'lax', secure: true, path: '/' });
    return res;
}
