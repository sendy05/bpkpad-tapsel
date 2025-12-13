import { prisma } from '@/lib/db';
import { LinkButton } from '@/components/ui/link-button';

export const dynamic = 'force-dynamic';

export default async function AuditLogPage({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
    const sp = await searchParams;
    const q = (sp?.q as string) || '';
    const action = (sp?.action as string) || '';
    const entity = (sp?.entity as string) || '';
    const userId = (sp?.userId as string) || '';
    const page = Math.max(1, parseInt((sp?.page as string) || '1', 10));
    const pageSize = Math.min(100, Math.max(10, parseInt((sp?.pageSize as string) || '20', 10) || 20));
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (q) {
        where.OR = [
            { details: { contains: q, mode: 'insensitive' } },
            { entityId: { contains: q, mode: 'insensitive' } },
        ];
    }
    if (action) where.action = action;
    if (entity) where.entity = entity;
    if (userId) where.userId = userId;

    // Note: auditLog table doesn't exist in current schema
    const logs: any[] = [];
    const total = 0;
    // const [logs, total] = await Promise.all([
    //     prisma.auditLog.findMany({
    //         where,
    //         orderBy: { createdAt: 'desc' },
    //         include: { user: true },
    //         skip,
    //         take: pageSize,
    //     }),
    //     prisma.auditLog.count({ where }),
    // ]);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const makeQS = (p: number, ps: number = pageSize) => {
        const usp = new URLSearchParams();
        if (q) usp.set('q', q);
        if (action) usp.set('action', action);
        if (entity) usp.set('entity', entity);
        if (userId) usp.set('userId', userId);
        usp.set('page', String(p));
        usp.set('pageSize', String(ps));
        return usp.toString();
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
                <p className="text-gray-600 mt-1">Riwayat aktivitas dan perubahan data</p>
            </div>
            <form method="GET" className="mb-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input
                        name="q"
                        placeholder="🔍 Cari detail/ID entitas"
                        defaultValue={q}
                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                    <select
                        name="action"
                        defaultValue={action}
                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    >
                        <option value="">🔄 Semua Aksi</option>
                        <option value="CREATE">✨ CREATE</option>
                        <option value="UPDATE">📝 UPDATE</option>
                        <option value="DELETE">🗑️ DELETE</option>
                    </select>
                    <select
                        name="entity"
                        defaultValue={entity}
                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    >
                        <option value="">📦 Semua Entitas</option>
                        <option value="News">📰 News</option>
                        <option value="Category">🏷️ Category</option>
                    </select>
                    <input
                        name="userId"
                        placeholder="👤 User ID"
                        defaultValue={userId}
                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                    <select
                        name="pageSize"
                        defaultValue={String(pageSize)}
                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    >
                        {[20, 50, 100].map(ps => <option key={ps} value={ps}>{ps}/hal</option>)}
                    </select>
                    <div className="flex gap-2 md:col-span-5">
                        <button
                            type="submit"
                            className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                            Terapkan Filter
                        </button>
                        <a
                            href="/admin/audit-log"
                            className="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all"
                        >
                            Reset
                        </a>
                    </div>
                </div>
            </form>
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full text-sm">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold">Waktu</th>
                            <th className="text-left px-4 py-3 font-semibold">Pengguna</th>
                            <th className="text-left px-4 py-3 font-semibold">Aksi</th>
                            <th className="text-left px-4 py-3 font-semibold">Entitas</th>
                            <th className="text-left px-4 py-3 font-semibold">ID</th>
                            <th className="text-left px-4 py-3 font-semibold">Detail</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {logs.map((log: any) => (
                            <tr key={log.id} className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors">
                                <td className="px-4 py-3 text-gray-600">{new Date(log.createdAt).toLocaleString('id-ID')}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{log.user?.name || log.userId}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                                        log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-700">{log.entity}</td>
                                <td className="px-4 py-3 text-gray-600 font-mono text-xs">{log.entityId}</td>
                                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{log.details || '-'}</td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td className="px-4 py-8 text-center text-gray-500" colSpan={6}>
                                    <div className="text-4xl mb-2">📋</div>
                                    Tidak ada log audit
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
                <div>Halaman {page} dari {totalPages}</div>
                <div className="flex flex-wrap gap-2 items-center">
                    <LinkButton href={`/admin/audit-log?${makeQS(Math.max(1, page - 1))}`} variant="outline" aria-disabled={page <= 1} onClick={(e) => { if (page <= 1) e.preventDefault(); }}>Sebelumnya</LinkButton>
                    {Array.from({ length: totalPages }).slice(0, 100).map((_, i) => {
                        const p = i + 1;
                        if (totalPages > 10) {
                            const inWindow = p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2);
                            if (!inWindow) return null;
                        }
                        return (
                            <LinkButton key={p} href={`/admin/audit-log?${makeQS(p)}`} variant={p === page ? 'default' : 'outline'} size="sm">{p}</LinkButton>
                        );
                    })}
                    <LinkButton href={`/admin/audit-log?${makeQS(Math.min(totalPages, page + 1))}`} variant="outline" aria-disabled={page >= totalPages} onClick={(e) => { if (page >= totalPages) e.preventDefault(); }}>Berikutnya</LinkButton>
                </div>
            </div>
        </div>
    );
}

