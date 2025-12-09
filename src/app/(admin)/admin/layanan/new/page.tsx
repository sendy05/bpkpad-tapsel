'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Save,
    DollarSign,
    Building2,
    MessageSquare,
    FileText,
    Clock,
    Link2,
    Image,
} from 'lucide-react';

export default function NewLayananPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        kategori: 'retribusi',
        judul: '',
        deskripsi: '',
        prosedur: '',
        persyaratan: '',
        biaya: '',
        waktu_penyelesaian: '',
        link_url: '',
        icon: '',
        status: true,
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/admin/layanan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Layanan berhasil ditambahkan');
                router.push('/admin/layanan');
            } else {
                const data = await response.json();
                alert(data.error || 'Gagal menambahkan layanan');
            }
        } catch (error) {
            console.error('Error creating layanan:', error);
            alert('Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin/layanan"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Daftar Layanan
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Tambah Layanan Baru
                    </h1>
                    <p className="text-slate-600">
                        Isi form di bawah untuk menambahkan layanan baru
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Card 1: Informasi Dasar */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            Informasi Dasar
                        </h2>

                        <div className="space-y-4">
                            {/* Kategori */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="kategori"
                                    value={formData.kategori}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="retribusi">Retribusi</option>
                                    <option value="aset">Aset</option>
                                    <option value="pengaduan">Pengaduan</option>
                                </select>
                            </div>

                            {/* Judul */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Judul Layanan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="judul"
                                    value={formData.judul}
                                    onChange={handleChange}
                                    required
                                    placeholder="Contoh: Pembayaran Retribusi Parkir"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Deskripsi Singkat
                                </label>
                                <textarea
                                    name="deskripsi"
                                    value={formData.deskripsi}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Deskripsi singkat tentang layanan ini..."
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Detail Layanan */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-purple-600" />
                            Detail Layanan
                        </h2>

                        <div className="space-y-4">
                            {/* Prosedur */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Prosedur Layanan
                                </label>
                                <textarea
                                    name="prosedur"
                                    value={formData.prosedur}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Masukkan prosedur dengan numbered list, contoh:&#10;1. Datang ke kantor BPKPAD&#10;2. Ambil nomor antrian&#10;3. Isi formulir permohonan&#10;4. Serahkan ke loket pelayanan&#10;5. Tunggu proses verifikasi"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Gunakan numbered list (1. 2. 3.) untuk prosedur bertahap
                                </p>
                            </div>

                            {/* Persyaratan */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Persyaratan
                                </label>
                                <textarea
                                    name="persyaratan"
                                    value={formData.persyaratan}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Masukkan persyaratan dengan bullet points, contoh:&#10;• KTP asli dan fotocopy&#10;• NPWP&#10;• Surat keterangan usaha&#10;• Pas foto 3x4 2 lembar&#10;• Materai 10.000"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Gunakan bullet points (• atau -) untuk daftar persyaratan
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Informasi Tambahan */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            Informasi Tambahan
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Biaya */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <DollarSign className="w-4 h-4 inline mr-1" />
                                    Biaya
                                </label>
                                <input
                                    type="text"
                                    name="biaya"
                                    value={formData.biaya}
                                    onChange={handleChange}
                                    placeholder="Contoh: Gratis atau Rp 50.000"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Waktu Penyelesaian */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    Waktu Penyelesaian
                                </label>
                                <input
                                    type="text"
                                    name="waktu_penyelesaian"
                                    value={formData.waktu_penyelesaian}
                                    onChange={handleChange}
                                    placeholder="Contoh: 1-3 hari kerja"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Link URL */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <Link2 className="w-4 h-4 inline mr-1" />
                                    Link URL (Opsional)
                                </label>
                                <input
                                    type="url"
                                    name="link_url"
                                    value={formData.link_url}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Icon */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <span className="inline-block w-4 h-4 mr-1 align-middle">📦</span>
                                    Icon Name (Opsional)
                                </label>
                                <input
                                    type="text"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    placeholder="Contoh: FileText, DollarSign"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Icon dari Lucide React
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                                className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <div>
                                <span className="text-sm font-medium text-slate-900">
                                    Aktifkan Layanan
                                </span>
                                <p className="text-xs text-slate-600">
                                    Layanan akan langsung ditampilkan di website
                                </p>
                            </div>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Menyimpan...' : 'Simpan Layanan'}
                        </button>
                        <Link
                            href="/admin/layanan"
                            className="px-8 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
