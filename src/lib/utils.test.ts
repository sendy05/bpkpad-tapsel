import { formatCurrency, formatDate } from './utils';

describe('utils', () => {
    test('formatCurrency formats IDR without decimals', () => {
        expect(formatCurrency(1000000)).toMatch(/Rp\s?1\.000\.000/);
    });

    test('formatDate formats ISO to Indonesian date', () => {
        const s = formatDate('2025-10-01');
        expect(s).toMatch(/2025/);
    });
});

