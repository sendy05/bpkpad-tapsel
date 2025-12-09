import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditCategoryForm from '../../EditCategoryForm';

type Ctx = { params: Promise<{ id: string }> };

export const metadata = { title: 'Edit Kategori' };
export const dynamic = 'force-dynamic';

export default async function Page(ctx: Ctx) {
    const { id } = await ctx.params;
    // Note: category table doesn't exist in current schema
    const item: any = null;
    // const item = await prisma.category.findUnique({ where: { id } });
    if (!item) notFound();
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Edit Kategori</h1>
                <p className="text-gray-600 mt-1">Perbarui informasi kategori yang sudah ada</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <EditCategoryForm id={id} item={{ name: item.name, slug: item.slug }} />
            </div>
        </div>
    );
}
