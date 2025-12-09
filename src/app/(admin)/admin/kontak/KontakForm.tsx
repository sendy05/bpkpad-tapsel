'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface KontakFormProps {
    data?: any;
}

export default function KontakForm({ data }: KontakFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        kategori: data?.kategori || 'kantor',
        nama: data?.nama || '',
        jabatan: data?.jabatan || '',
        telepon: data?.telepon || '',
        email: data?.email || '',
        alamat: data?.alamat || '',
        jam_operasional: data?.jam_operasional || '',
        map_url: data?.map_url || '',
        urutan: data?.urutan || 0,
        status: data?.status || 1,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = data ? `/api/admin/kontak/${data.id}` : '/api/admin/kontak';
            const method = data ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert(data ? 'Kontak berhasil diupdate!' : 'Kontak berhasil ditambahkan!');
                router.push('/admin/kontak');
                router.refresh();
            } else {
                alert('Gagal menyimpan kontak');
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
                        <option value="kantor">Kantor</option>
                        <option value="bidang">Bidang</option>
                        <option value="layanan">Layanan</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urutan
                    </label>
                    <input
                        type="number"
                        value={formData.urutan}
                        onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="0"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="BPKPAD Tapanuli Selatan"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jabatan
                    </label>
                    <input
                        type="text"
                        value={formData.jabatan}
                        onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Kantor Pusat"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telepon
                    </label>
                    <input
                        type="text"
                        value={formData.telepon}
                        onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="0633-21234"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="info@bpkpad.go.id"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alamat
                    </label>
                    <textarea
                        rows={3}
                        value={formData.alamat}
                        onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Jl. Sisingamangaraja No. 1 Padangsidimpuan"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jam Operasional
                    </label>
                    <input
                        type="text"
                        value={formData.jam_operasional}
                        onChange={(e) => setFormData({ ...formData, jam_operasional: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Senin-Jumat: 08:00 - 16:00 WIB"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value={1}>Aktif</option>
                        <option value={0}>Tidak Aktif</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Map URL
                    </label>
                    <input
                        type="text"
                        value={formData.map_url}
                        onChange={(e) => setFormData({ ...formData, map_url: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="https://maps.google.com/..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? 'Menyimpan...' : data ? 'Update Kontak' : 'Simpan Kontak'}
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
