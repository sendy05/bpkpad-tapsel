"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PrestasiForm({ prestasi }: { prestasi?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [judul, setJudul] = useState(prestasi?.judul || '');
    const [deskripsi, setDeskripsi] = useState(prestasi?.deskripsi || '');
    const [pemberi, setPemberi] = useState(prestasi?.pemberi || '');
    const [tanggal, setTanggal] = useState(
        prestasi?.tanggal ? new Date(prestasi.tanggal).toISOString().split('T')[0] : ''
    );
    const [kategori, setKategori] = useState(prestasi?.kategori || 'Penghargaan');
    const [foto, setFoto] = useState(prestasi?.foto || '');
    const [previewUrl, setPreviewUrl] = useState(prestasi?.foto || '');

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
                alert(err.error || 'Gagal upload foto');
                return;
            }

            const data = await res.json();
            setFoto(data.url);
            setPreviewUrl(data.url);
        } catch (error) {
            alert('Terjadi kesalahan saat upload');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!judul || !tanggal) {
            alert('Judul dan tanggal wajib diisi');
            return;
        }

        setLoading(true);

        try {
            const url = prestasi ? `/api/admin/prestasi/${prestasi.id}` : '/api/admin/prestasi';
            const method = prestasi ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    judul,
                    deskripsi,
                    pemberi,
                    tanggal,
                    kategori,
                    foto,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.error || 'Gagal menyimpan');
                return;
            }

            alert('✅ Prestasi berhasil disimpan!');
            router.push('/admin/prestasi');
            router.refresh();
        } catch (error) {
            alert('❌ Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {/* Foto Upload */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📸 Foto Prestasi
                </label>
                <div className="flex items-start gap-6">
                    {/* Preview */}
                    <div className="relative w-48 h-48 rounded-xl overflow-hidden ring-4 ring-yellow-100 bg-gray-100">
                        {previewUrl ? (
                            <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Upload Button */}
                    <div className="flex-1">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={uploading}
                            className="hidden"
                            id="foto-upload"
                        />
                        <label
                            htmlFor="foto-upload"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
                        >
                            {uploading ? (
                                <>⏳ Uploading...</>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Pilih Foto
                                </>
                            )}
                        </label>
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG max 5MB (opsional)</p>
                    </div>
                </div>
            </div>

            {/* Judul */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🏆 Judul Prestasi <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    required
                    placeholder="Contoh: Juara 1 Pengelolaan Keuangan Daerah Terbaik"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                />
            </div>

            {/* Deskripsi */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📝 Deskripsi
                </label>
                <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    rows={3}
                    placeholder="Deskripsi detail tentang prestasi ini..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none resize-none"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Pemberi */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🏢 Pemberi Penghargaan
                    </label>
                    <input
                        type="text"
                        value={pemberi}
                        onChange={(e) => setPemberi(e.target.value)}
                        placeholder="Contoh: Kementerian Dalam Negeri RI"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                    />
                </div>

                {/* Tanggal */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📅 Tanggal <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Kategori */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🏷️ Kategori
                </label>
                <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                >
                    <option value="Penghargaan">Penghargaan</option>
                    <option value="Keuangan">Keuangan</option>
                    <option value="Audit">Audit</option>
                    <option value="Inovasi">Inovasi</option>
                    <option value="Pelayanan">Pelayanan</option>
                    <option value="Dedikasi">Dedikasi</option>
                    <option value="Lainnya">Lainnya</option>
                </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '⏳ Menyimpan...' : '💾 Simpan Prestasi'}
                </button>
                <a
                    href="/admin/prestasi"
                    className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-all"
                >
                    ❌ Batal
                </a>
            </div>
        </form>
    );
}

