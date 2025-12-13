export type Photo = { id: string; url: string; judul: string; event?: string; tahun: number; diunggah_pada: string };

export const photos: Photo[] = [
    { id: 'p1', url: '/images/kegiatan-1.svg', judul: 'Rapat Koordinasi', event: 'Rakoor', tahun: 2025, diunggah_pada: '2025-10-09' },
    { id: 'p2', url: '/images/kegiatan-2.svg', judul: 'Sosialisasi Pajak', event: 'Sosialisasi', tahun: 2025, diunggah_pada: '2025-10-06' },
    { id: 'p3', url: '/images/kegiatan-3.svg', judul: 'Pelatihan Aset', event: 'Pelatihan', tahun: 2025, diunggah_pada: '2025-10-02' }
];

