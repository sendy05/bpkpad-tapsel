import crypto from 'crypto';
import { cookies, headers } from 'next/headers';

const CSRF_COOKIE = 'csrf';
const CSRF_HEADER = 'x-csrf-token';

// Returns existing CSRF token from cookies, or generates a new one (caller should set it on a response cookie)
export async function getOrCreateCsrfToken(): Promise<string> {
    const store = await cookies();
    const existing = store.get(CSRF_COOKIE)?.value;
    return existing ?? crypto.randomBytes(16).toString('hex');
}

export async function assertCsrf(): Promise<void> {
    const store = await cookies();
    const token = store.get(CSRF_COOKIE)?.value;
    const hdrs = await headers();
    const sent = hdrs.get(CSRF_HEADER);
    if (!token || !sent || token !== sent) {
        const err = new Error('CSRF token invalid');
        // @ts-expect-error add status
        err.status = 403;
        throw err;
    }
}

export const csrf = {
    cookieName: CSRF_COOKIE,
    headerName: CSRF_HEADER,
};

