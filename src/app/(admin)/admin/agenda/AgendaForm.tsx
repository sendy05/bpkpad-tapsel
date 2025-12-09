'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AgendaFormProps {
    data?: any;
}

export default function AgendaForm({ data }: AgendaFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Format dates for input[type="datetime-local"]
    const formatDateTime = (date: any) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().slice(0, 16);
    };

    const [formData, setFormData] = useState({
        judul: data?.judul || '',
        deskripsi: data?.deskripsi || '',
        tanggal_mulai: formatDateTime(data?.tanggal_mulai) || '',
        tanggal_selesai: formatDateTime(data?.tanggal_selesai) || '',
        lokasi: data?.lokasi || '',
        penyelenggara: data?.penyelenggara || '',
        kategori: data?.kategori || 'rapat',
        foto: data?.foto || '',
        status: data?.status || 'upcoming',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = data ? `/api/admin/agenda/${data.id}` : '/api/admin/agenda';
            const method = data ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert(data ? 'Agenda berhasil diupdate!' : 'Agenda berhasil ditambahkan!');
                router.push('/admin/agenda');
                router.refresh();
            } else {
                alert('Gagal menyimpan agenda');
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
                        placeholder="Rapat Koordinasi..."
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi
                    </label>
                    <textarea
                        rows={4}
                        value={formData.deskripsi}
                        onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Deskripsi agenda..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Mulai <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        required
                        value={formData.tanggal_mulai}
                        onChange={(e) => setFormData({ ...formData, tanggal_mulai: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Selesai
                    </label>
                    <input
                        type="datetime-local"
                        value={formData.tanggal_selesai}
                        onChange={(e) => setFormData({ ...formData, tanggal_selesai: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lokasi
                    </label>
                    <input
                        type="text"
                        value={formData.lokasi}
                        onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Ruang Rapat BPKPAD"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Penyelenggara
                    </label>
                    <input
                        type="text"
                        value={formData.penyelenggara}
                        onChange={(e) => setFormData({ ...formData, penyelenggara: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Kepala BPKPAD"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kategori
                    </label>
                    <select
                        value={formData.kategori}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="rapat">Rapat</option>
                        <option value="sosialisasi">Sosialisasi</option>
                        <option value="pelatihan">Pelatihan</option>
                        <option value="workshop">Workshop</option>
                        <option value="seminar">Seminar</option>
                        <option value="lainnya">Lainnya</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="upcoming">Akan Datang</option>
                        <option value="ongoing">Sedang Berjalan</option>
                        <option value="completed">Selesai</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foto URL
                    </label>
                    <input
                        type="text"
                        value={formData.foto}
                        onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="/uploads/agenda/foto.jpg"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? 'Menyimpan...' : data ? 'Update Agenda' : 'Simpan Agenda'}
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
