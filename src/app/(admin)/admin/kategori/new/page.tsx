import NewCategoryForm from '../NewCategoryForm';

export const metadata = { title: 'Tambah Kategori' };
export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Tambah Kategori Baru</h1>
                <p className="text-gray-600 mt-1">Buat kategori baru untuk mengorganisir berita</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <NewCategoryForm />
            </div>
        </div>
    );
}
