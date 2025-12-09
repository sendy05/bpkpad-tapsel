"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SopForm({ sop }: { sop?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [judul, setJudul] = useState(sop?.judul || '');
    const [kategori, setKategori] = useState(sop?.kategori || 'SOP');
    const [nomor, setNomor] = useState(sop?.nomor || '');
    const [tglTerbit, setTglTerbit] = useState(
        sop?.tgl_terbit ? new Date(sop.tgl_terbit).toISOString().split('T')[0] : ''
    );
    const [deskripsi, setDeskripsi] = useState(sop?.deskripsi || '');
    const [file, setFile] = useState(sop?.file || '');
    const [status, setStatus] = useState(sop?.status ?? 1);
    const [fileName, setFileName] = useState('');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (!uploadedFile) return;

        if (uploadedFile.size > 10 * 1024 * 1024) {
            alert('Ukuran file maksimal 10MB');
            return;
        }

        setUploading(true);
        setFileName(uploadedFile.name);

        try {
            const formData = new FormData();
            formData.append('file', uploadedFile);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.error || 'Gagal upload file');
                return;
            }

            const data = await res.json();
            setFile(data.url);
        } catch (error) {
            alert('Terjadi kesalahan saat upload');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!judul || !kategori) {
            alert('Judul dan kategori wajib diisi');
            return;
        }

        setLoading(true);

        try {
            const url = sop ? `/api/admin/sop/${sop.id}` : '/api/admin/sop';
            const method = sop ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    judul,
                    kategori,
                    nomor,
                    tgl_terbit: tglTerbit || null,
                    deskripsi,
                    file,
                    status: parseInt(status.toString()),
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.error || 'Gagal menyimpan');
                return;
            }

            alert('✅ Dokumen SOP berhasil disimpan!');
            router.push('/admin/sop');
            router.refresh();
        } catch (error) {
            alert('❌ Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {/* Judul */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📄 Judul Dokumen <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    required
                    placeholder="Contoh: SOP Pelayanan Pajak Daerah"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Kategori */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🏷️ Kategori <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    >
                        <option value="SOP">SOP</option>
                        <option value="Pajak">Pajak</option>
                        <option value="Retribusi">Retribusi</option>
                        <option value="Aset">Aset</option>
                        <option value="Anggaran">Anggaran</option>
                        <option value="Maklumat">Maklumat</option>
                        <option value="Peraturan">Peraturan</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>

                {/* Nomor */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🔢 Nomor Dokumen
                    </label>
                    <input
                        type="text"
                        value={nomor}
                        onChange={(e) => setNomor(e.target.value)}
                        placeholder="Contoh: 001/SOP/BPKPAD/2025"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Tanggal Terbit */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📅 Tanggal Terbit
                    </label>
                    <input
                        type="date"
                        value={tglTerbit}
                        onChange={(e) => setTglTerbit(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🔄 Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    >
                        <option value={1}>Aktif</option>
                        <option value={0}>Non-Aktif</option>
                    </select>
                </div>
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
                    placeholder="Deskripsi singkat tentang dokumen ini..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none resize-none"
                />
            </div>

            {/* File Upload */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📎 Upload File
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
                    >
                        {uploading ? (
                            <>⏳ Uploading...</>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                {file ? 'Ganti File' : 'Pilih File'}
                            </>
                        )}
                    </label>
                    {(fileName || file) && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{fileName || 'File terupload'}</span>
                        </div>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX max 10MB</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '⏳ Menyimpan...' : '💾 Simpan Dokumen'}
                </button>
                <a
                    href="/admin/sop"
                    className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-all"
                >
                    ❌ Batal
                </a>
            </div>
        </form>
    );
}
