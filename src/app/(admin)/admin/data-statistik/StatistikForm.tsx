'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface StatistikFormProps {
    data?: any;
}

export default function StatistikForm({ data }: StatistikFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        kategori: data?.kategori || 'pajak',
        judul: data?.judul || '',
        deskripsi: data?.deskripsi || '',
        periode: data?.periode || '',
        nilai: data?.nilai ? String(data.nilai) : '',
        satuan: data?.satuan || 'Rupiah',
        file_data: data?.file_data || '',
        tahun: data?.tahun || new Date().getFullYear(),
        bulan: data?.bulan || null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = data ? `/api/admin/data-statistik/${data.id}` : '/api/admin/data-statistik';
            const method = data ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert(data ? 'Data statistik berhasil diupdate!' : 'Data statistik berhasil ditambahkan!');
                router.push('/admin/data-statistik');
                router.refresh();
            } else {
                alert('Gagal menyimpan data statistik');
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
                        Kategori <span className="text-red-500">*</span>
                    </label>
                    <select
                        required
                        value={formData.kategori}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="pajak">Pajak</option>
                        <option value="retribusi">Retribusi</option>
                        <option value="aset">Aset</option>
                        <option value="pendapatan">Pendapatan</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Satuan <span className="text-red-500">*</span>
                    </label>
                    <select
                        required
                        value={formData.satuan}
                        onChange={(e) => setFormData({ ...formData, satuan: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="Rupiah">Rupiah</option>
                        <option value="Unit">Unit</option>
                        <option value="Persentase">Persentase</option>
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
                        placeholder="Penerimaan Pajak Hotel"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi
                    </label>
                    <textarea
                        rows={3}
                        value={formData.deskripsi}
                        onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Deskripsi data statistik..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Periode
                    </label>
                    <input
                        type="text"
                        value={formData.periode}
                        onChange={(e) => setFormData({ ...formData, periode: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="November 2024"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nilai
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.nilai}
                        onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="125000000.00"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tahun <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        required
                        value={formData.tahun}
                        onChange={(e) => setFormData({ ...formData, tahun: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="2024"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bulan (1-12, opsional)
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="12"
                        value={formData.bulan || ''}
                        onChange={(e) => setFormData({ ...formData, bulan: e.target.value ? parseInt(e.target.value) : null })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="11"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Data (Excel/PDF)
                    </label>
                    <input
                        type="text"
                        value={formData.file_data}
                        onChange={(e) => setFormData({ ...formData, file_data: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="/uploads/statistik/data-nov-2024.xlsx"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? 'Menyimpan...' : data ? 'Update Data' : 'Simpan Data'}
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
