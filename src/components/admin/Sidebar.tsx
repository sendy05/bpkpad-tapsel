import Link from 'next/link';

export default function Sidebar() {
    const items = [
        { href: '/admin', label: '🏠 Dashboard' },
        { href: '/admin/berita', label: '📰 Berita' },
        { href: '/admin/agenda', label: '📅 Agenda' },
        { href: '/admin/layanan', label: '🔧 Layanan' },
        { href: '/admin/regulasi', label: '📋 Regulasi' },
        { href: '/admin/ppid', label: '📂 PPID' },
        { href: '/admin/profil-organisasi', label: '👁️ Profil' },
        { href: '/admin/pejabat', label: '👥 Pejabat' },
        { href: '/admin/struktur', label: '🏢 Struktur' },
        { href: '/admin/sop', label: '📄 SOP' },
        { href: '/admin/prestasi', label: '🏆 Prestasi' },
        { href: '/admin/galeri', label: '🖼️ Galeri' },
        { href: '/admin/video', label: '🎥 Video' },
        { href: '/admin/kontak', label: '📞 Kontak' },
        { href: '/admin/data-statistik', label: '📊 Statistik' },
        { href: '/admin/kategori', label: 'Kategori' },
        { href: '/admin/halaman', label: 'Halaman' },
        { href: '/admin/files', label: 'Download' },
        { href: '/admin/audit-log', label: 'Audit Log' },
        { href: '/admin/pengaturan', label: 'Pengaturan' },
    ];
    return (
        <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
            <div className="px-4 py-4 text-lg font-semibold">BPKPAD Admin</div>
            <nav className="px-2 pb-4 space-y-1">
                {items.map((it) => (
                    <Link key={it.href} href={it.href} className="block rounded px-3 py-2 text-sm hover:bg-gray-100">
                        {it.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
