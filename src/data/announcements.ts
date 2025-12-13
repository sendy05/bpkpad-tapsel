export type Announcement = {
    id: string;
    judul: string;
    isi: string;
    mulai: string;
    selesai?: string;
};

export const announcements: Announcement[] = [
    { id: 'a1', judul: 'Pemberitahuan Pemeliharaan Sistem', isi: 'Sistem akan mengalami pemeliharaan pada 28 Okt 2025 pukul 19.00-21.00 WIB.', mulai: '2025-10-28T19:00:00+07:00', selesai: '2025-10-28T21:00:00+07:00' },
    { id: 'a2', judul: 'Batas Akhir Pelaporan', isi: 'Batas akhir pelaporan retribusi Q4 adalah 15 Desember 2025.', mulai: '2025-12-01T00:00:00+07:00' }
];

