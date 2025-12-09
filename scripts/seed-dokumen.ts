import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dokumenData = [
    // PERDA
    {
        no_dokumen: 'PERDA-001-2024',
        jns_dokumen: 'PERDA',
        judul: 'Peraturan Daerah tentang Pajak Daerah',
        nomor: '1',
        tahun: '2024',
        pramakarsa: 'DPRD Kabupaten Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: 'Perda No. 5 Tahun 2020',
        dicabut: null,
        status: 'Active',
        deskripsi: 'Peraturan tentang pajak daerah yang meliputi pajak hotel, pajak restoran, pajak hiburan, pajak reklame, pajak penerangan jalan, pajak mineral bukan logam dan batuan, pajak parkir, pajak air tanah, pajak sarang burung walet, PBB perdesaan dan perkotaan, dan BPHTB',
        tgl_upload: new Date('2024-01-15'),
        file: 'perda-1-2024-pajak-daerah.pdf',
        size: 2500000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'PERDA-002-2024',
        jns_dokumen: 'PERDA',
        judul: 'Peraturan Daerah tentang Retribusi Daerah',
        nomor: '2',
        tahun: '2024',
        pramakarsa: 'DPRD Kabupaten Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: 'Perda No. 6 Tahun 2020',
        dicabut: null,
        status: 'Active',
        deskripsi: 'Peraturan tentang retribusi jasa umum, retribusi jasa usaha, dan retribusi perizinan tertentu di Kabupaten Tapanuli Selatan',
        tgl_upload: new Date('2024-01-20'),
        file: 'perda-2-2024-retribusi-daerah.pdf',
        size: 2300000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'PERDA-003-2023',
        jns_dokumen: 'PERDA',
        judul: 'Peraturan Daerah tentang APBD Tahun Anggaran 2024',
        nomor: '8',
        tahun: '2023',
        pramakarsa: 'Bupati Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Anggaran Pendapatan dan Belanja Daerah Kabupaten Tapanuli Selatan Tahun Anggaran 2024',
        tgl_upload: new Date('2023-12-28'),
        file: 'perda-8-2023-apbd-2024.pdf',
        size: 3200000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'PERDA-004-2023',
        jns_dokumen: 'PERDA',
        judul: 'Peraturan Daerah tentang Pertanggungjawaban Pelaksanaan APBD TA 2022',
        nomor: '3',
        tahun: '2023',
        pramakarsa: 'Bupati Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Pertanggungjawaban pelaksanaan Anggaran Pendapatan dan Belanja Daerah Tahun Anggaran 2022',
        tgl_upload: new Date('2023-06-15'),
        file: 'perda-3-2023-lkpj-2022.pdf',
        size: 4500000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },

    // PERBUP
    {
        no_dokumen: 'PERBUP-001-2024',
        jns_dokumen: 'PERBUP',
        judul: 'Peraturan Bupati tentang Petunjuk Teknis Pemungutan Pajak Daerah',
        nomor: '15',
        tahun: '2024',
        pramakarsa: 'Bupati Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: 'Perbup No. 20 Tahun 2020',
        dicabut: null,
        status: 'Active',
        deskripsi: 'Petunjuk teknis pelaksanaan pemungutan pajak daerah sebagai tindak lanjut Perda No. 1 Tahun 2024',
        tgl_upload: new Date('2024-02-10'),
        file: 'perbup-15-2024-juknis-pajak.pdf',
        size: 1800000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'PERBUP-002-2024',
        jns_dokumen: 'PERBUP',
        judul: 'Peraturan Bupati tentang Standar Operasional Prosedur Pelayanan Pajak dan Retribusi',
        nomor: '18',
        tahun: '2024',
        pramakarsa: 'Bupati Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'SOP pelayanan pajak dan retribusi daerah di lingkungan BPKPAD Kabupaten Tapanuli Selatan',
        tgl_upload: new Date('2024-03-05'),
        file: 'perbup-18-2024-sop-pelayanan.pdf',
        size: 2100000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'PERBUP-003-2024',
        jns_dokumen: 'PERBUP',
        judul: 'Peraturan Bupati tentang Tarif Layanan BLU BPKPAD',
        nomor: '22',
        tahun: '2024',
        pramakarsa: 'Bupati Tapanuli Selatan',
        mengubah: 'Perbup No. 25 Tahun 2023',
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Penetapan tarif layanan Badan Layanan Umum pada Badan Pengelolaan Keuangan dan Pajak Daerah',
        tgl_upload: new Date('2024-04-12'),
        file: 'perbup-22-2024-tarif-blu.pdf',
        size: 1500000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'PERBUP-004-2023',
        jns_dokumen: 'PERBUP',
        judul: 'Peraturan Bupati tentang Tata Cara Pemberian Insentif Pemungutan Pajak Daerah',
        nomor: '35',
        tahun: '2023',
        pramakarsa: 'Bupati Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Tata cara pemberian insentif kepada pemungut pajak daerah yang berprestasi',
        tgl_upload: new Date('2023-08-20'),
        file: 'perbup-35-2023-insentif-pemungut.pdf',
        size: 1200000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'PERBUP-005-2023',
        jns_dokumen: 'PERBUP',
        judul: 'Peraturan Bupati tentang Sistem Informasi Manajemen Aset Daerah',
        nomor: '42',
        tahun: '2023',
        pramakarsa: 'Bupati Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Pedoman implementasi Sistem Informasi Manajemen Aset Daerah (SIMDA) di lingkungan Pemerintah Kabupaten Tapanuli Selatan',
        tgl_upload: new Date('2023-10-05'),
        file: 'perbup-42-2023-simda.pdf',
        size: 2800000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },

    // SK Kepala BPKPAD
    {
        no_dokumen: 'SK-001-2024',
        jns_dokumen: 'SK',
        judul: 'SK Kepala BPKPAD tentang Penetapan Target PAD Tahun 2024',
        nomor: '050/SK/BPKPAD',
        tahun: '2024',
        pramakarsa: 'Kepala BPKPAD',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Penetapan target Pendapatan Asli Daerah per jenis pajak dan retribusi untuk Tahun Anggaran 2024',
        tgl_upload: new Date('2024-01-05'),
        file: 'sk-050-2024-target-pad.pdf',
        size: 800000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'SK-002-2024',
        jns_dokumen: 'SK',
        judul: 'SK Kepala BPKPAD tentang Pembentukan Tim Intensifikasi dan Ekstensifikasi PAD',
        nomor: '125/SK/BPKPAD',
        tahun: '2024',
        pramakarsa: 'Kepala BPKPAD',
        mengubah: null,
        diubah: null,
        mencabut: 'SK No. 180/SK/BPKPAD/2023',
        dicabut: null,
        status: 'Active',
        deskripsi: 'Pembentukan tim untuk meningkatkan intensifikasi dan ekstensifikasi Pendapatan Asli Daerah',
        tgl_upload: new Date('2024-03-15'),
        file: 'sk-125-2024-tim-intensifikasi.pdf',
        size: 650000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'SK-003-2024',
        jns_dokumen: 'SK',
        judul: 'SK Kepala BPKPAD tentang Penetapan Petugas Pemungut Pajak dan Retribusi',
        nomor: '210/SK/BPKPAD',
        tahun: '2024',
        pramakarsa: 'Kepala BPKPAD',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Penetapan dan penunjukan petugas pemungut pajak dan retribusi daerah di wilayah Kabupaten Tapanuli Selatan',
        tgl_upload: new Date('2024-05-20'),
        file: 'sk-210-2024-petugas-pemungut.pdf',
        size: 950000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },

    // RENSTRA
    {
        no_dokumen: 'RENSTRA-2024-2026',
        jns_dokumen: 'RENSTRA',
        judul: 'Rencana Strategis BPKPAD Tahun 2024-2026',
        nomor: 'RENSTRA/2024-2026',
        tahun: '2024',
        pramakarsa: 'BPKPAD Kabupaten Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Dokumen perencanaan strategis BPKPAD yang memuat visi, misi, tujuan, sasaran, strategi, kebijakan, dan program periode 2024-2026',
        tgl_upload: new Date('2024-02-01'),
        file: 'renstra-bpkpad-2024-2026.pdf',
        size: 5200000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'RENSTRA-2021-2023',
        jns_dokumen: 'RENSTRA',
        judul: 'Rencana Strategis BPKPAD Tahun 2021-2023',
        nomor: 'RENSTRA/2021-2023',
        tahun: '2021',
        pramakarsa: 'BPKPAD Kabupaten Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Inactive',
        deskripsi: 'Dokumen perencanaan strategis BPKPAD periode 2021-2023 (sudah berakhir)',
        tgl_upload: new Date('2021-03-10'),
        file: 'renstra-bpkpad-2021-2023.pdf',
        size: 4800000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },

    // RKPD
    {
        no_dokumen: 'RKPD-2024',
        jns_dokumen: 'RKPD',
        judul: 'Rencana Kerja BPKPAD Tahun 2024',
        nomor: 'RKPD/2024',
        tahun: '2024',
        pramakarsa: 'BPKPAD Kabupaten Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Rencana Kerja Tahunan BPKPAD yang memuat program dan kegiatan prioritas untuk Tahun Anggaran 2024',
        tgl_upload: new Date('2023-11-15'),
        file: 'rkpd-bpkpad-2024.pdf',
        size: 3500000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'RKPD-2023',
        jns_dokumen: 'RKPD',
        judul: 'Rencana Kerja BPKPAD Tahun 2023',
        nomor: 'RKPD/2023',
        tahun: '2023',
        pramakarsa: 'BPKPAD Kabupaten Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Rencana Kerja Tahunan BPKPAD untuk Tahun Anggaran 2023',
        tgl_upload: new Date('2022-11-20'),
        file: 'rkpd-bpkpad-2023.pdf',
        size: 3200000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    },
    {
        no_dokumen: 'RKPD-2025',
        jns_dokumen: 'RKPD',
        judul: 'Rencana Kerja BPKPAD Tahun 2025',
        nomor: 'RKPD/2025',
        tahun: '2025',
        pramakarsa: 'BPKPAD Kabupaten Tapanuli Selatan',
        mengubah: null,
        diubah: null,
        mencabut: null,
        dicabut: null,
        status: 'Active',
        deskripsi: 'Rencana Kerja Tahunan BPKPAD yang memuat program dan kegiatan prioritas untuk Tahun Anggaran 2025',
        tgl_upload: new Date('2024-11-10'),
        file: 'rkpd-bpkpad-2025.pdf',
        size: 3700000,
        type: 'application/pdf',
        user: 'admin',
        aksi: 'create'
    }
];

async function main() {
    console.log('🚀 Starting seed data for Dokumen (Regulasi)...');

    for (const data of dokumenData) {
        const dokumen = await prisma.dokumen.create({
            data: data
        });
        console.log(`✅ Created: ${dokumen.jns_dokumen} - ${dokumen.judul}`);
    }

    console.log('\n✅ Seeding completed!');
    console.log(`📊 Summary:`);
    console.log(`   - PERDA: ${dokumenData.filter(d => d.jns_dokumen === 'PERDA').length} dokumen`);
    console.log(`   - PERBUP: ${dokumenData.filter(d => d.jns_dokumen === 'PERBUP').length} dokumen`);
    console.log(`   - SK: ${dokumenData.filter(d => d.jns_dokumen === 'SK').length} dokumen`);
    console.log(`   - RENSTRA: ${dokumenData.filter(d => d.jns_dokumen === 'RENSTRA').length} dokumen`);
    console.log(`   - RKPD: ${dokumenData.filter(d => d.jns_dokumen === 'RKPD').length} dokumen`);
    console.log(`   Total: ${dokumenData.length} dokumen`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
