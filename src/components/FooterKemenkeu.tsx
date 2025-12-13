import Link from 'next/link';

export function FooterKemenkeu() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        'Tentang Kami': [
            { label: 'Visi & Misi', href: '/profil#visi-misi' },
            { label: 'Struktur Organisasi', href: '/profil#struktur' },
            { label: 'Profil Pejabat', href: '/profil#pejabat' },
            { label: 'Prestasi', href: '/profil#prestasi' },
        ],
        'Layanan': [
            { label: 'Pajak Daerah', href: '/layanan/pajak' },
            { label: 'Retribusi', href: '/layanan/retribusi' },
            { label: 'Aset Daerah', href: '/layanan/aset' },
            { label: 'Pengaduan', href: '/layanan/pengaduan' },
        ],
        'Informasi': [
            { label: 'PPID', href: '/ppid' },
            { label: 'Berita', href: '/berita' },
            { label: 'Regulasi', href: '/regulasi' },
            { label: 'Data & Statistik', href: '/data-statistik' },
        ],
        'Bantuan': [
            { label: 'Hubungi Kami', href: '/kontak' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Peta Situs', href: '/sitemap' },
            { label: 'Prasyarat', href: '/prasyarat' },
        ],
    };

    const socialMedia = [
        { name: 'Facebook', icon: 'facebook', href: 'https://facebook.com/bpkpad.tapsel' },
        { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com/bpkpadtapsel' },
        { name: 'Instagram', icon: 'instagram', href: 'https://instagram.com/bpkpad.tapsel' },
        { name: 'YouTube', icon: 'youtube', href: 'https://youtube.com/@bpkpadtapsel' },
        { name: 'TikTok', icon: 'tiktok', href: 'https://tiktok.com/@bpkpadtapsel' },
    ];

    return (
        <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
            {/* Main Footer */}
            <div className="container py-12 md:py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Logo & Description */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                BP
                            </div>
                            <div>
                                <div className="font-bold text-lg leading-tight">BPKPAD</div>
                                <div className="text-xs text-neutral-400">Tapanuli Selatan</div>
                            </div>
                        </div>
                        <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                            Badan Pengelola Keuangan dan Aset Daerah Kabupaten Tapanuli Selatan
                        </p>
                        <div className="space-y-2 text-sm text-neutral-300">
                            <div className="flex items-start gap-2">
                                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Jl. Sisingamangaraja No. 1, Sipirok, Kabupaten Tapanuli Selatan, Sumatera Utara</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:bpkpad@tapanuliselatankab.go.id" className="hover:text-emerald-400 transition-colors">
                                    bpkpad@tapanuliselatankab.go.id
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+6263420001" className="hover:text-emerald-400 transition-colors">
                                    +62 634 20001
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-bold text-lg mb-4 text-emerald-400">{title}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-300 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group"
                                        >
                                            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Social Media */}
                <div className="border-t border-neutral-700 pt-8">
                    <h3 className="font-bold text-lg mb-4 text-center text-emerald-400">Ikuti Kami</h3>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {socialMedia.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-neutral-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                                aria-label={social.name}
                            >
                                {social.icon === 'facebook' && (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                )}
                                {social.icon === 'twitter' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                )}
                                {social.icon === 'instagram' && (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                )}
                                {social.icon === 'youtube' && (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                )}
                                {social.icon === 'tiktok' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                    </svg>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-700 bg-neutral-900/50">
                <div className="container py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
                        <p>
                            &copy; {currentYear} BPKPAD Kabupaten Tapanuli Selatan. Hak Cipta Dilindungi.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                                Kebijakan Privasi
                            </Link>
                            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                                Syarat & Ketentuan
                            </Link>
                            <Link href="/sitemap" className="hover:text-emerald-400 transition-colors">
                                Peta Situs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

