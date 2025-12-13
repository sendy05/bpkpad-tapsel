export type OrgUnit = { id: string; nama: string; deskripsi: string; parent_id?: string };

export const orgUnits: OrgUnit[] = [
    { id: 'o1', nama: 'Bidang Anggaran', deskripsi: 'Mengelola perencanaan dan pelaksanaan anggaran daerah.' },
    { id: 'o2', nama: 'Bidang Aset', deskripsi: 'Pengelolaan barang milik daerah dan aset tetap.' },
    { id: 'o3', nama: 'Bidang Akuntansi', deskripsi: 'Penyusunan laporan keuangan dan akuntansi pemerintah daerah.' }
];

