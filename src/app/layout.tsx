import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SkipLink } from '@/components/SkipLink';
import Breadcrumbs from '@/components/Breadcrumbs';
import { baseUrl, defaultDescription } from '@/lib/seo';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: 'BPKPAD Kab. Tapanuli Selatan',
        template: '%s | BPKPAD Kab. Tapanuli Selatan',
    },
    description: defaultDescription,
    robots: { index: true, follow: true },
    openGraph: { type: 'website', siteName: 'BPKPAD Kab. Tapanuli Selatan' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="id">
            <body className="min-h-screen flex flex-col">
                <SkipLink />
                <Navbar />
                <main id="content" className="flex-1 container mx-auto px-4 py-6">
                    <StructuredData
                        data={{
                            '@context': 'https://schema.org',
                            '@type': 'GovernmentOrganization',
                            name: 'BPKPAD Kab. Tapanuli Selatan',
                            url: baseUrl,
                            sameAs: [
                                'https://facebook.com/bpkpad.tapsel',
                                'https://instagram.com/bpkpad.tapsel',
                                'https://twitter.com/bpkpadtapsel',
                                'https://youtube.com/@bpkpadtapsel'
                            ]
                        }}
                    />
                    <Breadcrumbs />
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}

