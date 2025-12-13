type Key = string;

type RecordItem = { count: number; resetAt: number };

const store = new Map<Key, RecordItem>();

export function rateLimit(key: Key, max: number, windowMs: number) {
    const now = Date.now();
    const item = store.get(key);
    if (!item || item.resetAt < now) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
    }
    if (item.count >= max) {
        return { allowed: false, remaining: 0, resetAt: item.resetAt };
    }
    item.count += 1;
    store.set(key, item);
    return { allowed: true, remaining: max - item.count, resetAt: item.resetAt };
}

