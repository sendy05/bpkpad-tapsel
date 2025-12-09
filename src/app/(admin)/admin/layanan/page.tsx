'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    FileText,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    DollarSign,
    Building2,
    MessageSquare,
    CheckCircle2,
    XCircle,
} from 'lucide-react';

interface Layanan {
    id: number;
    kategori: string;
    judul: string;
    deskripsi: string | null;
    prosedur: string | null;
    persyaratan: string | null;
    biaya: string | null;
    waktu_penyelesaian: string | null;
    link_url: string | null;
    icon: string | null;
    status: number;
    tgl_update: string | null;
    user: string | null;
}

interface Stats {
    total: number;
    active: number;
    inactive: number;
    retribusi: number;
    aset: number;
    pengaduan: number;
}

export default function AdminLayananPage() {
    const router = useRouter();
    const [layanan, setLayanan] = useState<Layanan[]>([]);
    const [stats, setStats] = useState<Stats>({
        total: 0,
        active: 0,
        inactive: 0,
        retribusi: 0,
        aset: 0,
        pengaduan: 0,
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterKategori, setFilterKategori] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        fetchLayanan();
    }, [filterKategori, filterStatus]);

    const fetchLayanan = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filterKategori) params.append('kategori', filterKategori);
            if (filterStatus) params.append('status', filterStatus);
            if (searchTerm) params.append('search', searchTerm);

            const response = await fetch(`/api/admin/layanan?${params}`);
            const data = await response.json();

            if (response.ok) {
                setLayanan(data.layanan);
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Error fetching layanan:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchLayanan();
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus layanan ini?')) return;

        try {
            const response = await fetch(`/api/admin/layanan/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchLayanan();
                alert('Layanan berhasil dihapus');
            } else {
                alert('Gagal menghapus layanan');
            }
        } catch (error) {
            console.error('Error deleting layanan:', error);
            alert('Terjadi kesalahan');
        }
    };

    const getKategoriIcon = (kategori: string) => {
        switch (kategori) {
            case 'retribusi':
                return <DollarSign className="w-5 h-5" />;
            case 'aset':
                return <Building2 className="w-5 h-5" />;
            case 'pengaduan':
                return <MessageSquare className="w-5 h-5" />;
            default:
                return <FileText className="w-5 h-5" />;
        }
    };

    const getKategoriColor = (kategori: string) => {
        switch (kategori) {
            case 'retribusi':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'aset':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'pengaduan':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const filteredLayanan = layanan;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                Manajemen Layanan BPKPAD
                            </h1>
                            <p className="text-slate-600">
                                Kelola layanan retribusi, aset, dan pengaduan
                            </p>
                        </div>
                        <Link
                            href="/admin/layanan/new"
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="font-semibold">Tambah Layanan</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-600 text-sm font-medium">Total</span>
                            <FileText className="w-5 h-5 text-slate-400" />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm border border-green-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-green-700 text-sm font-medium">Aktif</span>
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-green-900">{stats.active}</p>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 shadow-sm border border-red-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-red-700 text-sm font-medium">Nonaktif</span>
                            <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <p className="text-2xl font-bold text-red-900">{stats.inactive}</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-sm border border-blue-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-700 text-sm font-medium">Retribusi</span>
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-blue-900">{stats.retribusi}</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 shadow-sm border border-purple-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-700 text-sm font-medium">Aset</span>
                            <Building2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-purple-900">{stats.aset}</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 shadow-sm border border-orange-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-orange-700 text-sm font-medium">Pengaduan</span>
                            <MessageSquare className="w-5 h-5 text-orange-600" />
                        </div>
                        <p className="text-2xl font-bold text-orange-900">{stats.pengaduan}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari layanan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </form>

                        {/* Filter Kategori */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <select
                                value={filterKategori}
                                onChange={(e) => setFilterKategori(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Semua Kategori</option>
                                <option value="retribusi">Retribusi</option>
                                <option value="aset">Aset</option>
                                <option value="pengaduan">Pengaduan</option>
                            </select>
                        </div>

                        {/* Filter Status */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Semua Status</option>
                                <option value="1">Aktif</option>
                                <option value="0">Nonaktif</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-slate-600">Memuat data...</p>
                        </div>
                    ) : filteredLayanan.length === 0 ? (
                        <div className="p-12 text-center">
                            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                Belum ada layanan
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Mulai tambahkan layanan untuk ditampilkan di website
                            </p>
                            <Link
                                href="/admin/layanan/new"
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah Layanan Pertama
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                            Layanan
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                            Biaya
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                            Waktu
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {filteredLayanan.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-semibold text-slate-900">
                                                        {item.judul}
                                                    </div>
                                                    {item.deskripsi && (
                                                        <div className="text-sm text-slate-600 line-clamp-1">
                                                            {item.deskripsi}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getKategoriColor(
                                                        item.kategori
                                                    )}`}
                                                >
                                                    {getKategoriIcon(item.kategori)}
                                                    {item.kategori.charAt(0).toUpperCase() + item.kategori.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-900">
                                                {item.biaya || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-900">
                                                {item.waktu_penyelesaian || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${item.status === 1
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {item.status === 1 ? (
                                                        <>
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            Aktif
                                                        </>
                                                    ) : (
                                                        <>
                                                            <XCircle className="w-3.5 h-3.5" />
                                                            Nonaktif
                                                        </>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/layanan/${item.id}`}
                                                        target="_blank"
                                                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Lihat"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/layanan/${item.id}/edit`}
                                                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
