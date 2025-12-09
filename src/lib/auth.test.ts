// Mock ESM-only 'jose' to avoid Jest ESM parsing issues; this test doesn't use JWT paths
jest.mock('jose', () => ({
    SignJWT: class {
        setProtectedHeader() { return this; }
        setIssuedAt() { return this; }
        setExpirationTime() { return this; }
        sign() { return Promise.resolve('mock.jwt.token'); }
    },
    jwtVerify: () => Promise.resolve({ payload: {} }),
}), { virtual: true });

// Polyfill TextEncoder for Node/Jest
import { TextEncoder as _TextEncoder } from 'util';
// @ts-ignore
if (!globalThis.TextEncoder) globalThis.TextEncoder = _TextEncoder as any;

import { hashPassword, verifyPassword } from './auth';

describe('auth utils (non-JWT)', () => {
    beforeAll(() => {
        process.env.JWT_SECRET = 'test-secret';
        process.env.JWT_ACCESS_TTL_MIN = '5';
        process.env.JWT_REFRESH_TTL_DAYS = '7';
        process.env.JWT_REMEMBER_EXTRA_DAYS = '23';
    });

    it('hashPassword and verifyPassword work', async () => {
        const plain = 'S3cureP@ss!';
        const hash = await hashPassword(plain);
        expect(typeof hash).toBe('string');
        expect(hash).not.toEqual(plain);
        await expect(verifyPassword(plain, hash)).resolves.toBe(true);
        await expect(verifyPassword('wrong', hash)).resolves.toBe(false);
    });

    // JWT-related tests are skipped in Jest due to ESM-only dependency (jose).
    // They are validated at runtime during build and can be covered with e2e tests.
});
