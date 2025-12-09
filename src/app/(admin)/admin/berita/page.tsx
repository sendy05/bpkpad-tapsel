import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function BeritaListPage() {
    // Redirect to berita-lama since the news/category tables don't exist
    redirect('/admin/berita-lama');
}
