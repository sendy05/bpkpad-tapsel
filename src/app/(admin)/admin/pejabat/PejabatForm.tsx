"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PejabatForm({ pejabat }: { pejabat?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [nama, setNama] = useState(pejabat?.nama || '');
    const [jabatan, setJabatan] = useState(pejabat?.jabatan || '');
    const [nip, setNip] = useState(pejabat?.nip || '');
    const [email, setEmail] = useState(pejabat?.email || '');
    const [telepon, setTelepon] = useState(pejabat?.telepon || '');
    const [urutan, setUrutan] = useState(pejabat?.urutan || 0);
    const [status, setStatus] = useState(pejabat?.status || 1);
    const [foto, setFoto] = useState(pejabat?.foto || '');
    const [previewUrl, setPreviewUrl] = useState(pejabat?.foto || '');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('File harus berupa gambar');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran file maksimal 2MB');
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
        setLoading(true);

        try {
            const url = pejabat ? `/api/admin/pejabat/${pejabat.id}` : '/api/admin/pejabat';
            const method = pejabat ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nama,
                    jabatan,
                    nip,
                    email,
                    telepon,
                    urutan: parseInt(urutan.toString()),
                    status: parseInt(status.toString()),
                    foto,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.error || 'Gagal menyimpan');
                return;
            }

            alert('✅ Pejabat berhasil disimpan!');
            router.push('/admin/pejabat');
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
                    📸 Foto Pejabat
                </label>
                <div className="flex items-start gap-6">
                    {/* Preview */}
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden ring-4 ring-purple-100 bg-gray-100">
                        {previewUrl ? (
                            <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
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
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG max 2MB</p>
                    </div>
                </div>
            </div>

            {/* Nama */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👤 Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                    placeholder="Contoh: Dr. H. Ahmad Supardi, S.E., M.M."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                />
            </div>

            {/* Jabatan */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💼 Jabatan <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={jabatan}
                    onChange={(e) => setJabatan(e.target.value)}
                    required
                    placeholder="Contoh: Kepala Badan"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                />
            </div>

            {/* NIP */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🆔 NIP
                </label>
                <input
                    type="text"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    placeholder="Contoh: 196505101990031008"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📧 Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kepala@bpkpad-tapse.go.id"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    />
                </div>

                {/* Telepon */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📱 Telepon
                    </label>
                    <input
                        type="text"
                        value={telepon}
                        onChange={(e) => setTelepon(e.target.value)}
                        placeholder="081234567890"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Urutan */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🔢 Urutan Tampil
                    </label>
                    <input
                        type="number"
                        value={urutan}
                        onChange={(e) => setUrutan(e.target.value)}
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Urutan tampil di halaman profil (0 = paling atas)</p>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🔄 Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    >
                        <option value={1}>Aktif</option>
                        <option value={0}>Non-Aktif</option>
                    </select>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '⏳ Menyimpan...' : '💾 Simpan Pejabat'}
                </button>
                <a
                    href="/admin/pejabat"
                    className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-all"
                >
                    ❌ Batal
                </a>
            </div>
        </form>
    );
}

