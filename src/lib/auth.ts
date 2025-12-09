import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');
const accessTtlMin = Number(process.env.JWT_ACCESS_TTL_MIN || 15);
const refreshTtlDays = Number(process.env.JWT_REFRESH_TTL_DAYS || 7);
const rememberExtraDays = Number(process.env.JWT_REMEMBER_EXTRA_DAYS || 23);

export type JwtPayload = {
    sub: string;
    role: 'SuperAdmin' | 'Editor' | 'Author';
    type: 'access' | 'refresh';
};

export async function hashPassword(plain: string) {
    return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
}

export async function signAccessToken(sub: string, role: JwtPayload['role']) {
    const expSec = Math.floor(Date.now() / 1000) + accessTtlMin * 60;
    return new SignJWT({ sub, role, type: 'access' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expSec)
        .sign(secret);
}

export async function signRefreshToken(sub: string, role: JwtPayload['role'], remember = false) {
    const days = refreshTtlDays + (remember ? rememberExtraDays : 0);
    const expSec = Math.floor(Date.now() / 1000) + days * 24 * 60 * 60;
    return new SignJWT({ sub, role, type: 'refresh' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expSec)
        .sign(secret);
}

export async function verifyToken<T extends JwtPayload>(token: string) {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as T;
}
