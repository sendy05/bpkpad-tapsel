'use client';

import BeritaForm from '@/components/admin/BeritaForm';

export default function NewBeritaPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">📝 Tambah Berita Baru</h1>
                <p className="text-gray-600 mt-1">Buat artikel atau berita baru untuk dipublikasikan</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <BeritaForm />
            </div>
        </div>
    );
}

