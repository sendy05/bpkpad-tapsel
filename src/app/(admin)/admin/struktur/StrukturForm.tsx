"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function StrukturForm({ struktur }: { struktur?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [gambar, setGambar] = useState(struktur?.gambar || '');
    const [keterangan, setKeterangan] = useState(struktur?.keterangan || '');
    const [previewUrl, setPreviewUrl] = useState(struktur?.gambar || '');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('File harus berupa gambar');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Ukuran file maksimal 5MB');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.error || 'Gagal upload gambar');
                return;
            }

            const data = await res.json();
            setGambar(data.url);
            setPreviewUrl(data.url);
        } catch (error) {
            alert('Terjadi kesalahan saat upload');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!gambar) {
            alert('Gambar struktur wajib diupload');
            return;
        }

        setLoading(true);

        try {
            const url = struktur ? `/api/admin/struktur/${struktur.id}` : '/api/admin/struktur';
            const method = struktur ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gambar, keterangan }),
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.error || 'Gagal menyimpan');
                return;
            }

            alert('✅ Struktur organisasi berhasil disimpan!');
            router.push('/admin/struktur');
            router.refresh();
        } catch (error) {
            alert('❌ Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {/* Gambar Upload */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🖼️ Gambar Struktur Organisasi <span className="text-red-500">*</span>
                </label>

                {/* Preview */}
                {previewUrl && (
                    <div className="relative w-full h-96 rounded-xl overflow-hidden ring-4 ring-blue-100 bg-white mb-4">
                        <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                    </div>
                )}

                {/* Upload Button */}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                        id="gambar-upload"
                    />
                    <label
                        htmlFor="gambar-upload"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
                    >
                        {uploading ? (
                            <>⏳ Uploading...</>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {previewUrl ? 'Ganti Gambar' : 'Pilih Gambar'}
                            </>
                        )}
                    </label>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG max 5MB. Rekomendasi: landscape 1920x1080px</p>
                </div>
            </div>

            {/* Keterangan */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📝 Keterangan
                </label>
                <textarea
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    rows={3}
                    placeholder="Contoh: Struktur Organisasi BPKPAD Kabupaten Tapanuli Selatan berdasarkan Perda No. X Tahun 2024"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '⏳ Menyimpan...' : '💾 Simpan Struktur'}
                </button>
                <a
                    href="/admin/struktur"
                    className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-all"
                >
                    ❌ Batal
                </a>
            </div>
        </form>
    );
}

