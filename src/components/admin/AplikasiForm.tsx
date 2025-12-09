'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AplikasiFormData {
    id_aplikasi: string;
    nm_aplikasi: string;
    link: string;
    icon: string;
}

interface AplikasiFormProps {
    initialData?: AplikasiFormData;
    mode: 'create' | 'edit';
}

export default function AplikasiForm({ initialData, mode }: AplikasiFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<AplikasiFormData>({
        id_aplikasi: initialData?.id_aplikasi || '',
        nm_aplikasi: initialData?.nm_aplikasi || '',
        link: initialData?.link || '',
        icon: initialData?.icon || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Validate ID format (no spaces, alphanumeric + underscore only)
            if (mode === 'create' && !/^[a-zA-Z0-9_-]+$/.test(formData.id_aplikasi)) {
                throw new Error('ID Aplikasi hanya boleh mengandung huruf, angka, underscore (_), dan dash (-)');
            }

            // Validate URL
            if (formData.link && !formData.link.startsWith('http')) {
                throw new Error('Link harus diawali dengan http:// atau https://');
            }

            const url = mode === 'create'
                ? '/api/admin/aplikasi'
                : `/api/admin/aplikasi/${initialData?.id_aplikasi}`;

            const method = mode === 'create' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save aplikasi');
            }

            router.push('/admin/aplikasi');
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
                    {/* ID Aplikasi */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            ID Aplikasi *
                        </label>
                        <input
                            type="text"
                            value={formData.id_aplikasi}
                            onChange={(e) => setFormData({ ...formData, id_aplikasi: e.target.value })}
                            placeholder="e.g., sipd, simpeg, simda"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-800 placeholder-gray-400 font-mono"
                            required
                            disabled={mode === 'edit'}
                            title="Format: huruf kecil, angka, underscore, dash. Contoh: sipd, simpeg-v2"
                        />
                        <p className="text-xs text-gray-500 mt-1.5">
                            {mode === 'create' ? 'Format: huruf, angka, underscore (_), dash (-). Tidak bisa diubah setelah dibuat.' : 'ID tidak dapat diubah setelah dibuat.'}
                        </p>
                    </div>

                    {/* Nama Aplikasi */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nama Aplikasi *
                        </label>
                        <input
                            type="text"
                            value={formData.nm_aplikasi}
                            onChange={(e) => setFormData({ ...formData, nm_aplikasi: e.target.value })}
                            placeholder="e.g., SIPD, SIMPEG, SIMDA"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Link URL *
                        </label>
                        <input
                            type="url"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            placeholder="https://example.com/aplikasi"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Icon URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Icon URL *
                        </label>
                        <input
                            type="url"
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            placeholder="https://example.com/icon.png"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1.5">
                            Masukkan URL gambar icon aplikasi (PNG, JPG, atau SVG)
                        </p>
                    </div>

                    {/* Icon Preview */}
                    {formData.icon && (
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
                            <p className="text-sm font-semibold text-gray-700 mb-3">Preview Icon:</p>
                            <div className="relative w-24 h-24 bg-white rounded-xl shadow-md mx-auto">
                                <Image
                                    src={formData.icon}
                                    alt="Icon Preview"
                                    fill
                                    className="object-contain p-2"
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
                    className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                            <span>{mode === 'create' ? 'Simpan Aplikasi' : 'Update Aplikasi'}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
