import Image from 'next/image';
import Link from 'next/link';

type Props = {
    image: string;
    tagline: string;
    ctaPrimary?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
};

export function HeroSection({ image, tagline, ctaPrimary, ctaSecondary }: Props) {
    return (
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-8 md:p-16">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    {/* Live Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/30">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-white">BPKPAD Kab. Tapanuli Selatan</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
                        {tagline}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-blue-50 font-light leading-relaxed mb-8">
                        Badan Pengelola Keuangan dan Aset Daerah<br />
                        <span className="font-semibold">Kabupaten Tapanuli Selatan</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4">
                        {ctaPrimary && (
                            <Link
                                href={ctaPrimary.href}
                                className="group relative inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3.5 rounded-2xl font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                            >
                                {ctaPrimary.label}
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        )}
                        {ctaSecondary && (
                            <Link
                                href={ctaSecondary.href}
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-6 py-3.5 rounded-2xl font-semibold hover:bg-white/20 transition-all"
                            >
                                {ctaSecondary.label}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Image with Glassmorphism Frame */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-[2rem] blur-2xl"></div>
                    <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden ring-4 ring-white/20 shadow-2xl backdrop-blur-sm">
                        <Image src={image} alt="Kantor BPKPAD" fill className="object-cover" priority />
                    </div>
                </div>
            </div>
        </section>
    );
}
