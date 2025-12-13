import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import BeritaEditForm from './BeritaEditForm';

export const dynamic = 'force-dynamic';

async function getBerita(id: string) {
    try {
        const berita = await prisma.tbl_berita.findUnique({
            where: { id_berita: id },
        });
        return berita;
    } catch (error) {
        return null;
    }
}

export default async function EditBeritaPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const berita = await getBerita(id);

    if (!berita) {
        notFound();
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">✏️ Edit Berita</h1>
                <p className="text-gray-600 mt-1">Ubah informasi berita: <span className="font-semibold text-emerald-600">{berita.judul}</span></p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <BeritaEditForm berita={berita} />
            </div>
        </div>
    );
}
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
