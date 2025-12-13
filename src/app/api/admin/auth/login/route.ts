// Legacy auth route - not used anymore
// Authentication now handled by admin layout
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    return NextResponse.json({ error: 'This endpoint is deprecated' }, { status: 410 });
}

/* LEGACY CODE - COMMENTED OUT
import { prisma } from '@/lib/db';
import { verifyPassword, signAccessToken, signRefreshToken } from '@/lib/auth';
import { rateLimit } from '@/lib/rateLimit';
import { assertCsrf } from '@/lib/csrf';
import { z } from 'zod';

const bodySchema = z.object({
    username_or_email: z.string().min(1),
    password: z.string().min(8),
    remember_me: z.boolean().optional(),
});

export async function POST_OLD(request: Request) {
    try {
        await assertCsrf();
    } catch (e: any) {
        return NextResponse.json({ error: 'CSRF invalid' }, { status: 403 });
    }

    const ip = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    const userKey = `${ip}:${Date.now().toString().slice(0, 9)}`; // include time-bucket to reduce hot key

    const json = await request.json().catch(() => null);
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
        return NextResponse.json({ error: 'Input tidak valid' }, { status: 400 });
    }

    const { username_or_email, password, remember_me } = parsed.data;

    const rl = rateLimit(`login:${ip}:${username_or_email}`, 5, 15 * 60 * 1000);
    if (!rl.allowed) {
        return NextResponse.json({ error: 'Terlalu banyak percobaan. Coba lagi nanti.' }, { status: 429 });
    }

    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email: username_or_email }, { username: username_or_email }],
            status: 'Active',
        },
    });

    if (!user) {
        return NextResponse.json({ error: 'Kredensial salah' }, { status: 401 });
    }
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
        return NextResponse.json({ error: 'Kredensial salah' }, { status: 401 });
    }

    const access = await signAccessToken(user.id, user.role as any);
    const refresh = await signRefreshToken(user.id, user.role as any, !!remember_me);

    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    const res = NextResponse.json({ user: { id: user.id, name: user.name, role: user.role } });
    res.cookies.set('access', access, { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 15 });
    res.cookies.set('refresh', refresh, { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 * 24 * (7 + (remember_me ? 23 : 0)) });
    // last activity stamp (epoch ms)
    res.cookies.set('la', String(Date.now()), { httpOnly: false, sameSite: 'lax', secure: true, path: '/' });
    return res;
}
*/

