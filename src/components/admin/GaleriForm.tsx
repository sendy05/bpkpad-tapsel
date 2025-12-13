'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface GaleriFormData {
    id?: string;
    foto: string;
    keterangan: string;
}

interface GaleriFormProps {
    initialData?: GaleriFormData;
    mode: 'create' | 'edit';
}

export default function GaleriForm({ initialData, mode }: GaleriFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<GaleriFormData>({
        foto: initialData?.foto || '',
        keterangan: initialData?.keterangan || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Validate URL
            if (formData.foto && !formData.foto.startsWith('http')) {
                throw new Error('URL foto harus diawali dengan http:// atau https://');
            }

            const url = mode === 'create'
                ? '/api/admin/galeri'
                : `/api/admin/galeri/${initialData?.id}`;

            const method = mode === 'create' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save galeri');
            }

            router.push('/admin/galeri');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="space-y-6">
                    {/* Foto URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            URL Foto *
                        </label>
                        <input
                            type="url"
                            value={formData.foto}
                            onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                            placeholder="https://example.com/foto.jpg"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Keterangan */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Keterangan *
                        </label>
                        <textarea
                            value={formData.keterangan}
                            onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                            placeholder="Deskripsi foto..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-gray-800 placeholder-gray-400 resize-none"
                            required
                        />
                    </div>

                    {/* Photo Preview */}
                    {formData.foto && (
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                            <p className="text-sm font-semibold text-gray-700 mb-3">Preview Foto:</p>
                            <div className="relative w-full aspect-video bg-white rounded-xl shadow-md overflow-hidden">
                                <Image
                                    src={formData.foto}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3.5 rounded-xl border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold transition-all hover:bg-gray-50"
                    disabled={isLoading}
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Menyimpan...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{mode === 'create' ? 'Simpan Foto' : 'Update Foto'}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

