'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface GaleriFormProps {
    data?: any;
}

export default function GaleriForm({ data }: GaleriFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        foto: data?.foto || '',
        keterangan: data?.keterangan || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = data ? `/api/admin/galeri/${data.id}` : '/api/admin/galeri';
            const method = data ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert(data ? 'Foto berhasil diupdate!' : 'Foto berhasil ditambahkan!');
                router.push('/admin/galeri');
                router.refresh();
            } else {
                alert('Gagal menyimpan foto');
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
                        URL Foto <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.foto}
                        onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="/uploads/galeri/foto.jpg"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Path atau URL ke file foto
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
                        placeholder="Deskripsi foto..."
                    />
                </div>

                {formData.foto && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                        <div className="relative w-full max-w-md aspect-video bg-gray-200 rounded-xl overflow-hidden">
                            <Image
                                src={formData.foto}
                                alt="Preview"
                                fill
                                className="object-cover"
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
                    {loading ? 'Menyimpan...' : data ? 'Update Foto' : 'Simpan Foto'}
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

