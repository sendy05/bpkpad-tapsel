"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Note: react-quill-new package not installed
// const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
// import 'react-quill-new/dist/quill.snow.css';

export default function ProfilForm({ profil }: { profil: any }) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [visi, setVisi] = useState(profil?.visi || '');
    const [misi, setMisi] = useState(profil?.misi || '');
    const [sejarah, setSejarah] = useState(profil?.sejarah || '');
    const [tugasPokok, setTugasPokok] = useState(profil?.tugas_pokok || '');

    useEffect(() => {
        setMounted(true);
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/profil-organisasi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    visi,
                    misi,
                    sejarah,
                    tugas_pokok: tugasPokok,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.error || 'Gagal menyimpan');
                return;
            }

            alert('✅ Profil berhasil disimpan!');
            router.refresh();
        } catch (error) {
            alert('❌ Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {/* Visi */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👁️ Visi Organisasi
                </label>
                <textarea
                    value={visi}
                    onChange={(e) => setVisi(e.target.value)}
                    rows={6}
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                    placeholder="Tuliskan visi organisasi..."
                />
            </div>

            {/* Misi */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📝 Misi Organisasi
                </label>
                <textarea
                    value={misi}
                    onChange={(e) => setMisi(e.target.value)}
                    rows={8}
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="Tuliskan misi organisasi..."
                />
            </div>

            {/* Sejarah */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📜 Sejarah Singkat
                </label>
                <textarea
                    value={sejarah}
                    onChange={(e) => setSejarah(e.target.value)}
                    rows={10}
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    placeholder="Tuliskan sejarah organisasi..."
                />
            </div>

            {/* Tugas Pokok */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📋 Tugas Pokok & Fungsi
                </label>
                <textarea
                    value={tugasPokok}
                    onChange={(e) => setTugasPokok(e.target.value)}
                    rows={10}
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    placeholder="Tuliskan tugas pokok dan fungsi..."
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '⏳ Menyimpan...' : '💾 Simpan Profil'}
                </button>
                <a
                    href="/profil"
                    target="_blank"
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    👁️ Lihat Preview
                </a>
            </div>
        </form>
    );
}
