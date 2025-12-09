import { prisma } from '@/lib/prisma';
import EditForm from '../../EditForm';
import { notFound } from 'next/navigation';

type Ctx = { params: Promise<{ id: string }> };

export const metadata = { title: 'Edit Berita' };
export const dynamic = 'force-dynamic';

export default async function Page(ctx: Ctx) {
    const { id } = await ctx.params;
    // Note: news and category tables don't exist in current schema
    const item: any = null;
    const categories: any[] = [];
    // const [item, categories] = await Promise.all([
    //     prisma.news.findUnique({ where: { id } }),
    //     prisma.category.findMany({ orderBy: { name: 'asc' } }),
    // ]);
    if (!item) notFound();
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Edit Berita</h1>
                <p className="text-gray-600 mt-1">Perbarui informasi berita yang sudah ada</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <EditForm
                    id={id}
                    item={{
                        title: item.title,
                        slug: item.slug,
                        categoryId: item.categoryId,
                        content: item.content || '',
                        excerpt: item.excerpt || undefined,
                        featuredImage: item.featuredImage || undefined,
                        status: item.status as any,
                    }}
                    categories={categories.map((c: any) => ({ id: c.id, name: c.name }))}
                />
            </div>
        </div>
    );
}
