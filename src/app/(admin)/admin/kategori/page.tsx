import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';
import { LinkButton } from '@/components/ui/link-button';

export const dynamic = 'force-dynamic';

export default async function KategoriListPage({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
    const sp = await searchParams;
    const q = (sp?.q as string) || '';
    const page = Math.max(1, parseInt((sp?.page as string) || '1', 10));
    const pageSize = Math.min(100, Math.max(5, parseInt((sp?.pageSize as string) || '10', 10) || 10));
    const skip = (page - 1) * pageSize;
    const where: any = q ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { slug: { contains: q, mode: 'insensitive' } }] } : undefined;
    // Note: category table doesn't exist in current schema
    const items: any[] = [];
    const total = 0;
    // const [items, total] = await Promise.all([
    //     prisma.category.findMany({ where, orderBy: { name: 'asc' }, skip, take: pageSize }),
    //     prisma.category.count({ where }),
    // ]);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const makeQS = (p: number) => {
        const usp = new URLSearchParams();
        if (q) usp.set('q', q);
        usp.set('page', String(p));
        usp.set('pageSize', String(pageSize));
        return usp.toString();
    };
    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manajemen Kategori</h1>
                    <p className="text-gray-600 mt-1">Kelola kategori berita dan artikel</p>
                </div>
                <Link
                    href="/admin/kategori/new"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Kategori
                </Link>
            </div>
            <form method="GET" className="mb-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                    <input
                        name="q"
                        placeholder="🔍 Cari nama/slug"
                        defaultValue={q}
                        className="flex-1 rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    />
                    <select
                        name="pageSize"
                        defaultValue={String(pageSize)}
                        className="rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    >
                        {[10, 20, 50, 100].map(ps => <option key={ps} value={ps}>{ps}/hal</option>)}
                    </select>
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                        Filter
                    </button>
                    <Link
                        href="/admin/kategori"
                        className="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all"
                    >
                        Reset
                    </Link>
                </div>
            </form>
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full text-sm">
                    <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-700">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold">Nama</th>
                            <th className="text-left px-4 py-3 font-semibold">Slug</th>
                            <th className="text-left px-4 py-3 font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {items.map((item: any) => (
                            <tr key={item.id} className="border-t border-gray-100 hover:bg-emerald-50/50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                                <td className="px-4 py-3 text-gray-600">{item.slug}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <LinkButton href={`/admin/kategori/${item.id}/edit`} variant="outline" size="sm">Edit</LinkButton>
                                        <DeleteButton resource="categories" id={item.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td className="px-4 py-8 text-center text-gray-500" colSpan={3}>
                                    <div className="text-4xl mb-2">📁</div>
                                    Tidak ada kategori
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
                <div>Halaman {page} dari {totalPages}</div>
                <div className="flex flex-wrap gap-2 items-center">
                    <LinkButton href={`/admin/kategori?${makeQS(Math.max(1, page - 1))}`} variant="outline" aria-disabled={page <= 1} onClick={(e) => { if (page <= 1) e.preventDefault(); }}>Sebelumnya</LinkButton>
                    {Array.from({ length: totalPages }).slice(0, 100).map((_, i) => {
                        const p = i + 1;
                        if (totalPages > 10) {
                            const inWindow = p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2);
                            if (!inWindow) return null;
                        }
                        return (
                            <LinkButton key={p} href={`/admin/kategori?${makeQS(p)}`} variant={p === page ? 'default' : 'outline'} size="sm">{p}</LinkButton>
                        );
                    })}
                    <LinkButton href={`/admin/kategori?${makeQS(Math.min(totalPages, page + 1))}`} variant="outline" aria-disabled={page >= totalPages} onClick={(e) => { if (page >= totalPages) e.preventDefault(); }}>Berikutnya</LinkButton>
                </div>
            </div>
        </div>
    );
}
