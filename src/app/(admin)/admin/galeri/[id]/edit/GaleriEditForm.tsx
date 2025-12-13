'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type GaleriData = {
    id: number;
    foto: string | null;
    keterangan: string | null;
    tgl_update: Date | null;
    user: string | null;
};

export default function GaleriEditForm({ galeri }: { galeri: GaleriData }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(galeri.foto);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        
        try {
            const response = await fetch(`/api/admin/galeri/${galeri.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    foto: formData.get('foto'),
                    keterangan: formData.get('keterangan'),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('✅ Foto berhasil diperbarui!');
                router.push('/admin/galeri');
                router.refresh();
            } else {
                const error = await response.text();
                alert('❌ Gagal memperbarui foto: ' + error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Terjadi kesalahan saat menyimpan data');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Foto */}
            <div>
                <label htmlFor="foto" className="block text-sm font-semibold text-gray-700 mb-2">
                    URL Foto <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="foto"
                    name="foto"
                    required
                    defaultValue={galeri.foto || ''}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
                    placeholder="https://example.com/foto-galeri.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                    💡 Masukkan URL foto yang sudah diupload (format: JPG, PNG, WebP)
                </p>
            </div>

            {/* Preview Foto */}
            {previewImage && (
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preview Foto
                    </label>
                    <div className="relative w-full aspect-video max-w-md mx-auto rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <img 
                            src={previewImage} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-size="16"%3EGambar tidak dapat dimuat%3C/text%3E%3C/svg%3E';
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Keterangan */}
            <div>
                <label htmlFor="keterangan" className="block text-sm font-semibold text-gray-700 mb-2">
                    Keterangan/Caption
                </label>
                <textarea
                    id="keterangan"
                    name="keterangan"
                    rows={3}
                    defaultValue={galeri.keterangan || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base resize-none"
                    placeholder="Tambahkan keterangan untuk foto ini (opsional)..."
                />
                <p className="text-xs text-gray-500 mt-1">
                    Keterangan akan ditampilkan di bawah foto (opsional)
                </p>
            </div>

            {/* Info Update */}
            {galeri.tgl_update && (
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600">
                        Terakhir diupdate: {new Date(galeri.tgl_update).toLocaleString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium active:scale-95"
                >
                    ← Batal
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Menyimpan...
                        </span>
                    ) : (
                        '💾 Simpan Perubahan'
                    )}
                </button>
            </div>
        </form>
    );
}
