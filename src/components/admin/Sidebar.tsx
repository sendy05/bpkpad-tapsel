'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const menuKonten = [
        { href: '/admin/berita', label: 'Berita', icon: '📰' },
        { href: '/admin/slider', label: 'Slider', icon: '🖼️' },
        { href: '/admin/galeri', label: 'Galeri', icon: '📷' },
        { href: '/admin/video', label: 'Video', icon: '🎥' },
    ];

    const menuLayanan = [
        { href: '/admin/layanan', label: 'Layanan', icon: '🏢' },
        { href: '/admin/aplikasi', label: 'Aplikasi', icon: '🚀' },
        { href: '/admin/ppid', label: 'PPID', icon: '📋' },
        { href: '/admin/regulasi', label: 'Regulasi', icon: '📜' },
    ];

    const menuProfil = [
        { href: '/admin/pejabat', label: 'Pejabat', icon: '👥' },
        { href: '/admin/struktur', label: 'Struktur', icon: '🏛️' },
        { href: '/admin/sop', label: 'SOP', icon: '📑' },
        { href: '/admin/prestasi', label: 'Prestasi', icon: '🏆' },
    ];

    const menuLainnya = [
        { href: '/admin/agenda', label: 'Agenda', icon: '📅' },
        { href: '/admin/kontak', label: 'Kontak', icon: '📞' },
        { href: '/admin/data-statistik', label: 'Data Statistik', icon: '📊' },
        { href: '/admin/profil-organisasi', label: 'Profil Organisasi', icon: '🏢' },
        { href: '/admin/audit-log', label: 'Audit Log', icon: '📝' },
    ];

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 h-screen z-40
                w-72 lg:w-64 shrink-0
                border-r border-gray-200 bg-white
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                overflow-y-auto
            `}>
                {/* Logo */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg">
                        BP
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">BPKPAD</div>
                        <div className="text-xs text-gray-500">Tapanuli Selatan</div>
                    </div>
                </div>

                <nav className="px-3 py-4 space-y-6">
                    {/* Dashboard */}
                    <div>
                        <Link
                            href="/admin"
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                isActive('/admin') && pathname === '/admin'
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <span className="text-xl">🏠</span>
                            <span className="font-medium">Dashboard</span>
                        </Link>
                    </div>

                    {/* Menu Konten */}
                    <div>
                        <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Konten
                        </div>
                        {menuKonten.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                    isActive(item.href)
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Menu Layanan */}
                    <div>
                        <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Layanan
                        </div>
                        {menuLayanan.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                    isActive(item.href)
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Menu Profil */}
                    <div>
                        <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Profil & Organisasi
                        </div>
                        {menuProfil.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                    isActive(item.href)
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Menu Lainnya */}
                    <div>
                        <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Lainnya
                        </div>
                        {menuLainnya.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                    isActive(item.href)
                                        ? 'bg-gradient-to-r from-gray-600 to-slate-700 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </nav>
            </aside>
        </>
    );
}

