'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';

interface BeritaData {
    id_berita: string;
    judul: string | null;
    isi: string | null;
    kategori: string | null;
    foto: string | null;
}

export default function BeritaEditForm({ berita }: { berita: BeritaData }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        judul: berita.judul || '',
        isi: berita.isi || '',
        kategori: berita.kategori || 'Umum',
        foto: berita.foto || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`/api/admin/berita/${berita.id_berita}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Gagal update berita');
            }

            alert('✅ Berita berhasil diupdate!');
            router.push('/admin/berita');
            router.refresh();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const kategoriOptions = [
        'Umum',
        'Pengumuman',
        'Berita',
        'Artikel',
        'Pajak',
        'Retribusi',
        'Kegiatan',
        'Layanan',
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul Berita <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="Masukkan judul berita..."
                    disabled={isLoading}
                />
            </div>

            {/* Kategori */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                </label>
                <select
                    required
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    disabled={isLoading}
                >
                    {kategoriOptions.map(kat => (
                        <option key={kat} value={kat}>{kat}</option>
                    ))}
                </select>
            </div>

            {/* Foto/Gambar */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Foto Berita
                </label>
                <ImageUploader
                    value={formData.foto}
                    onChange={(url) => setFormData({ ...formData, foto: url })}
                    disabled={isLoading}
                />
            </div>

            {/* Isi Berita */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Isi Berita <span className="text-red-500">*</span>
                </label>
                <textarea
                    required
                    value={formData.isi}
                    onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="Tulis isi berita di sini..."
                    disabled={isLoading}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-6 border-t">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Menyimpan...' : '💾 Update Berita'}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all disabled:opacity-50"
                >
                    Batal
                </button>
            </div>
        </form>
    );
}
