'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';

export default function SliderForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [keterangan, setKeterangan] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!imageUrl) {
            alert('❌ Mohon upload gambar slider terlebih dahulu');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/admin/slider', {
                method: 'POST',
                body: JSON.stringify({
                    foto: imageUrl,
                    keterangan: keterangan,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('✅ Slider berhasil ditambahkan!');
                router.push('/admin/slider');
                router.refresh();
            } else {
                const error = await response.text();
                alert('❌ Gagal menambahkan slider: ' + error);
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
            {/* Image Uploader */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gambar Slider <span className="text-red-500">*</span>
                </label>
                <ImageUploader 
                    value={imageUrl}
                    onChange={setImageUrl}
                    uploadEndpoint="/api/upload-slider"
                />
                <p className="text-xs text-gray-500 mt-2">
                    📸 Upload gambar atau gunakan kamera. Gambar akan otomatis dikompres (max 1MB)
                </p>
            </div>

            {/* Keterangan */}
            <div>
                <label htmlFor="keterangan" className="block text-sm font-semibold text-gray-700 mb-2">
                    Keterangan/Caption
                </label>
                <textarea
                    id="keterangan"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base resize-none"
                    placeholder="Tambahkan keterangan untuk slider ini (opsional)..."
                />
                <p className="text-xs text-gray-500 mt-1">
                    Keterangan akan ditampilkan di bawah gambar slider (opsional)
                </p>
            </div>

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
                    disabled={isSubmitting || !imageUrl}
                    className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
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
                        '💾 Simpan Slider'
                    )}
                </button>
            </div>
        </form>
    );
}
