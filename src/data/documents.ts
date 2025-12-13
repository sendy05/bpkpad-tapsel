export type Document = { id: string; judul: string; tipe: 'regulasi' | 'formulir' | 'laporan_keuangan'; file_url: string; ukuran?: string; published_at: string };

export const documents: Document[] = [
    { id: 'd1', judul: 'Perbup Pajak Daerah 2025', tipe: 'regulasi', file_url: '/docs/perbup-pajak-2025.pdf', ukuran: '1.2MB', published_at: '2025-09-01' },
    { id: 'd2', judul: 'Formulir Pendaftaran Wajib Pajak', tipe: 'formulir', file_url: '/docs/formulir-wp.pdf', ukuran: '350KB', published_at: '2025-08-15' }
];

