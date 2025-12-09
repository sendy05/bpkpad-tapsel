import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const base = 'https://example.com';
    return [
        { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
        { url: `${base}/profil`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/berita`, changeFrequency: 'daily', priority: 0.8 },
        { url: `${base}/informasi-layanan`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/galeri`, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${base}/kontak`, changeFrequency: 'yearly', priority: 0.6 }
    ];
}
