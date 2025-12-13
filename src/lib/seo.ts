export const defaultSiteName = 'BPKPAD Kab. Tapanuli Selatan';
export const defaultDescription = 'Website resmi BPKPAD Kab. Tapanuli Selatan: informasi pajak, retribusi, aset daerah, berita, dan layanan publik.';
export const baseUrl = 'https://example.com'; // TODO: ganti ke domain resmi

export function jsonLd<T extends object>(data: T) {
    return JSON.stringify(data);
}

