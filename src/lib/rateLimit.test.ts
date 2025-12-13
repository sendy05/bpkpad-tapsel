import { rateLimit } from './rateLimit';

describe('rateLimit', () => {
    it('allows up to max calls within window and then blocks', () => {
        const key = `test:${Math.random()}`;
        const max = 3;
        const windowMs = 5000;

        const r1 = rateLimit(key, max, windowMs);
        expect(r1.allowed).toBe(true);
        const r2 = rateLimit(key, max, windowMs);
        expect(r2.allowed).toBe(true);
        const r3 = rateLimit(key, max, windowMs);
        expect(r3.allowed).toBe(true);
        const r4 = rateLimit(key, max, windowMs);
        expect(r4.allowed).toBe(false);
        expect(r4.remaining).toBe(0);
    });
});

