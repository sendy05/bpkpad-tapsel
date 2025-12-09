import { stats } from '@/data/stats';
import { formatCurrency } from '@/lib/utils';

export function StatCards() {
    const items = [
        {
            label: 'Target PAD 2024',
            value: formatCurrency(stats.total_pad),
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            label: 'Total Aset Daerah',
            value: formatCurrency(stats.total_aset),
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            label: 'Jumlah Pegawai',
            value: stats.jumlah_pegawai.toLocaleString('id-ID'),
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
    ];

    return (
        <section aria-label="Statistik Utama" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((it, i) => (
                <div
                    key={it.label}
                    className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
                    <div className="relative">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform">
                            {it.icon}
                        </div>
                        <div className="text-white">
                            <p className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wide">{it.label}</p>
                            <p className="text-4xl font-bold">{it.value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
