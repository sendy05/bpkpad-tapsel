import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Add security headers to all responses
    const res = NextResponse.next();
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.headers.set(
        'Content-Security-Policy',
        [
            "default-src 'self'",
            "img-src 'self' data: https://res.cloudinary.com",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "frame-src https://www.google.com",
            "connect-src 'self'",
        ].join('; ')
    );
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

    return res;
}

export const config = {
    matcher: [
        // apply to all except Next internal assets
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
