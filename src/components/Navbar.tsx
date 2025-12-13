"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/helpers';

interface MenuItem {
    label: string;
    href: string;
    icon?: string;
    children?: MenuItem[];
}

const menuItems: MenuItem[] = [
    { label: 'Beranda', href: '/', icon: '🏠' },
    {
        label: 'Profil',
        href: '/profil',
        icon: '📋',
        children: [
            { label: 'Visi & Misi', href: '/profil#visi-misi' },
            { label: 'Struktur Organisasi', href: '/profil#struktur' },
            { label: 'Profil Pejabat', href: '/profil#pejabat' },
            { label: 'SOP & Maklumat', href: '/profil#sop' },
            { label: 'Prestasi', href: '/profil#prestasi' },
        ]
    },
    {
        label: 'Informasi Publik',
        href: '/ppid',
        icon: '📂',
        children: [
            { label: 'PPID', href: '/ppid' },
            { label: 'Info Berkala', href: '/ppid#berkala' },
            { label: 'Info Serta Merta', href: '/ppid#serta-merta' },
            { label: 'Info Setiap Saat', href: '/ppid#setiap-saat' },
        ]
    },
    {
        label: 'Layanan',
        href: '/layanan',
        icon: '💼',
        children: [
            { label: 'Pajak Daerah', href: '/layanan/pajak' },
            { label: 'Retribusi', href: '/layanan/retribusi' },
            { label: 'Aset Daerah', href: '/layanan/aset' },
            { label: 'Pengaduan', href: '/layanan/pengaduan' },
        ]
    },
    {
        label: 'Regulasi',
        href: '/regulasi',
        icon: '⚖️',
    },
    {
        label: 'Data & Statistik',
        href: '/data-statistik',
        icon: '📊',
    },
    {
        label: 'Berita & Publikasi',
        href: '/berita',
        icon: '📰',
        children: [
            { label: 'Berita', href: '/berita' },
            { label: 'Agenda', href: '/agenda' },
            { label: 'Video', href: '/video' },
        ]
    },
    { label: 'Galeri', href: '/galeri', icon: '📷' },
    { label: 'Kontak', href: '/kontak', icon: '📞' },
];

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-all duration-300',
                scrolled
                    ? 'bg-white/95 backdrop-blur-lg shadow-md'
                    : 'bg-white/90 backdrop-blur-sm border-b border-neutral-200'
            )}
        >
            <nav aria-label="Menu utama" className="container">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-lg"
                        aria-label="Kembali ke Beranda BPKPAD"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-md group-hover:shadow-lg transition-shadow">
                            BP
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-display font-bold text-neutral-900 text-base md:text-lg leading-tight group-hover:text-primary-600 transition-colors">
                                BPKPAD
                            </div>
                            <div className="text-xs text-neutral-600">Tapanuli Selatan</div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center gap-1" role="list">
                        {menuItems.map((item) => (
                            <li key={item.href} className="relative group">
                                {item.children ? (
                                    <div>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all',
                                                isActive(item.href)
                                                    ? 'text-primary-600 bg-primary-50'
                                                    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                                            )}
                                        >
                                            <span>{item.icon}</span>
                                            <span>{item.label}</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </Link>

                                        {/* Dropdown - Show on hover */}
                                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-hard border border-neutral-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                    onClick={() => setOpenDropdown(null)}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all',
                                            isActive(item.href)
                                                ? 'text-primary-600 bg-primary-50'
                                                : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                                        )}
                                        aria-current={isActive(item.href) ? 'page' : undefined}
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
                        aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Menu Panel */}
                        <div
                            id="mobile-menu"
                            className="fixed top-16 md:top-20 left-0 right-0 bottom-0 bg-white lg:hidden overflow-y-auto animate-slide-in-left"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu navigasi mobile"
                        >
                            <ul className="p-4 space-y-2" role="list">
                                {menuItems.map((item) => (
                                    <li key={item.href}>
                                        {item.children ? (
                                            <div>
                                                <button
                                                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                                                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-neutral-700 hover:bg-neutral-50 transition-colors"
                                                    aria-expanded={openDropdown === item.label}
                                                >
                                                    <span className="flex items-center gap-2 font-semibold">
                                                        <span className="text-xl">{item.icon}</span>
                                                        <span>{item.label}</span>
                                                    </span>
                                                    <svg
                                                        className={cn('w-5 h-5 transition-transform', openDropdown === item.label && 'rotate-180')}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                {openDropdown === item.label && (
                                                    <ul className="mt-2 ml-8 space-y-1">
                                                        {item.children.map((child) => (
                                                            <li key={child.href}>
                                                                <Link
                                                                    href={child.href}
                                                                    className="block px-4 py-2 rounded-lg text-sm text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                                >
                                                                    {child.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    'flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all',
                                                    isActive(item.href)
                                                        ? 'text-primary-600 bg-primary-50'
                                                        : 'text-neutral-700 hover:bg-neutral-50'
                                                )}
                                                aria-current={isActive(item.href) ? 'page' : undefined}
                                            >
                                                <span className="text-xl">{item.icon}</span>
                                                <span>{item.label}</span>
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </nav>
        </header>
    );
}

