import { prisma } from '@/lib/prisma';
import NewForm from '../NewForm';

export const metadata = { title: 'Tambah Berita' };
export const dynamic = 'force-dynamic';

export default async function Page() {
    // Note: category table doesn't exist in current schema
    const categories: any[] = [];
    // const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Tambah Berita Baru</h1>
                <p className="text-gray-600 mt-1">Buat artikel atau berita baru untuk dipublikasikan</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <NewForm categories={categories.map((c: any) => ({ id: c.id, name: c.name }))} />
            </div>
        </div>
    );
}
