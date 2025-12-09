'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type InformasiPublikFormProps = {
    informasi?: {
        id: number;
        kategori: string;
        judul: string;
        ringkasan: string | null;
        pejabatPengelola: string;
        tanggalPublikasi: Date;
        fileUrl: string | null;
        status: string;
    };
};

export default function InformasiPublikForm({ informasi }: InformasiPublikFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        kategori: informasi?.kategori || 'BERKALA',
        judul: informasi?.judul || '',
        ringkasan: informasi?.ringkasan || '',
        pejabatPengelola: informasi?.pejabatPengelola || '',
        tanggalPublikasi: informasi?.tanggalPublikasi
            ? new Date(informasi.tanggalPublikasi).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
        fileUrl: informasi?.fileUrl || '',
        status: informasi?.status || 'Draft',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = informasi
                ? `/api/admin/ppid/${informasi.id}`
                : '/api/admin/ppid';

            const method = informasi ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Gagal menyimpan data');
            }

            alert(informasi ? 'Informasi berhasil diperbarui!' : 'Informasi berhasil ditambahkan!');
            router.push('/admin/ppid');
            router.refresh();
        } catch (error) {
            console.error('Error:', error);
            alert(error instanceof Error ? error.message : 'Terjadi kesalahan');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!informasi) return;

        if (!confirm('Yakin ingin menghapus informasi ini?')) return;

        try {
            const response = await fetch(`/api/admin/ppid/${informasi.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Gagal menghapus data');
            }

            alert('Informasi berhasil dihapus!');
            router.push('/admin/ppid');
            router.refresh();
        } catch (error) {
            console.error('Error:', error);
            alert('Gagal menghapus data');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Kategori */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori Informasi <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                >
                    <option value="BERKALA">📅 Berkala (minimal setiap 6 bulan)</option>
                    <option value="SERTA_MERTA">⚡ Serta Merta (segera diumumkan)</option>
                    <option value="SETIAP_SAAT">📊 Setiap Saat (dapat diakses kapan saja)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                    {formData.kategori === 'BERKALA' && 'Informasi yang wajib disediakan dan diperbarui secara berkala'}
                    {formData.kategori === 'SERTA_MERTA' && 'Informasi yang dapat mengancam hajat hidup orang banyak'}
                    {formData.kategori === 'SETIAP_SAAT' && 'Informasi yang dapat diakses publik tanpa pembatasan'}
                </p>
            </div>

            {/* Judul */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Informasi <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contoh: Laporan Keuangan Semester I Tahun 2024"
                    required
                />
            </div>

            {/* Ringkasan */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ringkasan/Deskripsi
                </label>
                <textarea
                    value={formData.ringkasan}
                    onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ringkasan singkat tentang informasi ini..."
                />
            </div>

            {/* Pejabat Pengelola */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pejabat Pengelola <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.pejabatPengelola}
                    onChange={(e) => setFormData({ ...formData, pejabatPengelola: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contoh: Kepala Bidang Keuangan"
                    required
                />
            </div>

            {/* Tanggal Publikasi */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Publikasi <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    value={formData.tanggalPublikasi}
                    onChange={(e) => setFormData({ ...formData, tanggalPublikasi: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>

            {/* File URL */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL File Dokumen
                </label>
                <input
                    type="text"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/uploads/ppid/nama-file.pdf"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Kosongkan jika tidak ada file. Format: /uploads/ppid/nama-file.pdf
                </p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                >
                    <option value="Draft">Draft (belum dipublikasi)</option>
                    <option value="Published">Published (dapat diakses publik)</option>
                    <option value="Archived">Archived (diarsipkan)</option>
                </select>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50"
                >
                    {isSubmitting ? 'Menyimpan...' : (informasi ? '💾 Update Informasi' : '➕ Tambah Informasi')}
                </button>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
                >
                    ← Kembali
                </button>

                {informasi && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="ml-auto px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold"
                    >
                        🗑️ Hapus
                    </button>
                )}
            </div>
        </form>
    );
}
