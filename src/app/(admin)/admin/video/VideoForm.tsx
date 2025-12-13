'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VideoFormProps {
    data?: any;
}

export default function VideoForm({ data }: VideoFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        video: data?.video || '',
        keterangan: data?.keterangan || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = data ? `/api/admin/video/${data.id}` : '/api/admin/video';
            const method = data ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert(data ? 'Video berhasil diupdate!' : 'Video berhasil ditambahkan!');
                router.push('/admin/video');
                router.refresh();
            } else {
                alert('Gagal menyimpan video');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Video (YouTube Embed) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.video}
                        onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="https://www.youtube.com/embed/VIDEO_ID"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Gunakan URL embed YouTube. Contoh: https://www.youtube.com/embed/dQw4w9WgXcQ
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Keterangan
                    </label>
                    <textarea
                        rows={4}
                        value={formData.keterangan}
                        onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Deskripsi video..."
                    />
                </div>

                {formData.video && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                        <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                            <iframe
                                src={formData.video}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 pt-6 border-t">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? 'Menyimpan...' : data ? 'Update Video' : 'Simpan Video'}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200"
                >
                    Batal
                </button>
            </div>
        </form>
    );
}

