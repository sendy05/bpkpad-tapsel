export type News = {
    id: string;
    slug: string;
    judul: string;
    konten: string;
    kategori: 'Pengumuman' | 'Kegiatan' | 'Informasi' | 'Pencapaian';
    penulis: string;
    featured_image?: string;
    published_at: string;
};

export const news: News[] = [
    {
        id: '1',
        slug: 'bpkpad-luncurkan-portal-informasi-pajak',
        judul: 'BPKPAD Luncurkan Portal Informasi Pajak',
        konten: 'BPKPAD Kab. Tapanuli Selatan meluncurkan portal informasi pajak untuk memudahkan masyarakat...',
        kategori: 'Informasi',
        penulis: 'Admin',
        featured_image: '/images/berita-1.svg',
        published_at: '2025-10-10'
    },
    {
        id: '2',
        slug: 'pengumuman-penyesuaian-jam-layanan',
        judul: 'Pengumuman Penyesuaian Jam Layanan',
        konten: 'Sehubungan dengan ... jam layanan kantor BPKPAD disesuaikan menjadi ...',
        kategori: 'Pengumuman',
        penulis: 'Humas',
        featured_image: '/images/berita-2.svg',
        published_at: '2025-10-05'
    },
    {
        id: '3',
        slug: 'capaian-pad-triwulan-iii-2025',
        judul: 'Capaian PAD Triwulan III 2025',
        konten: 'Capaian Pendapatan Asli Daerah (PAD) hingga triwulan III mencapai ...',
        kategori: 'Pencapaian',
        penulis: 'BPKPAD',
        featured_image: '/images/berita-3.svg',
        published_at: '2025-10-01'
    }
];
