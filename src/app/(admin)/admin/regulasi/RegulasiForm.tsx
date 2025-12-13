'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RegulasiFormProps {
    data?: any;
}

export default function RegulasiForm({ data }: RegulasiFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        no_dokumen: data?.no_dokumen || '',
        judul: data?.judul || '',
        nomor: data?.nomor || '',
        tahun: data?.tahun || new Date().getFullYear().toString(),
        jns_dokumen: data?.jns_dokumen || 'Perda',
        file: data?.file || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = data ? `/api/admin/regulasi/${data.id}` : '/api/admin/regulasi';
            const method = data ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert(data ? 'Regulasi berhasil diupdate!' : 'Regulasi berhasil ditambahkan!');
                router.push('/admin/regulasi');
                router.refresh();
            } else {
                alert('Gagal menyimpan regulasi');
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        No Dokumen <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.no_dokumen}
                        onChange={(e) => setFormData({ ...formData, no_dokumen: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="001/DOK/BPKPAD/2025"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jenis Dokumen <span className="text-red-500">*</span>
                    </label>
                    <select
                        required
                        value={formData.jns_dokumen}
                        onChange={(e) => setFormData({ ...formData, jns_dokumen: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="Perda">Perda (Peraturan Daerah)</option>
                        <option value="Perbup">Perbup (Peraturan Bupati)</option>
                        <option value="SK">SK (Surat Keputusan)</option>
                        <option value="SE">SE (Surat Edaran)</option>
                        <option value="Instruksi">Instruksi</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Judul <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.judul}
                        onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Peraturan Daerah tentang..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor
                    </label>
                    <input
                        type="text"
                        value={formData.nomor}
                        onChange={(e) => setFormData({ ...formData, nomor: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tahun
                    </label>
                    <input
                        type="text"
                        value={formData.tahun}
                        onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="2025"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        File URL
                    </label>
                    <input
                        type="text"
                        value={formData.file}
                        onChange={(e) => setFormData({ ...formData, file: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="/uploads/regulasi/perda-01-2025.pdf"
                    />
                    <p className="text-sm text-gray-500 mt-1">Path atau URL ke file PDF regulasi</p>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? 'Menyimpan...' : data ? 'Update Regulasi' : 'Simpan Regulasi'}
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

