"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/helpers';

interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    imageUrl: string;
    link?: string;
    tag?: string;
}

interface HeroCarouselProps {
    slides: HeroSlide[];
    autoPlayInterval?: number;
}

export function HeroCarousel({ slides, autoPlayInterval = 5000 }: HeroCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentSlide === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
        goToSlide(newIndex);
    }, [currentSlide, slides.length, goToSlide]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentSlide === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentSlide + 1;
        goToSlide(newIndex);
    }, [currentSlide, slides.length, goToSlide]);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            goToNext();
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [isAutoPlaying, autoPlayInterval, goToNext]);

    if (!slides || slides.length === 0) return null;

    const currentSlideData = slides[currentSlide];

    return (
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={currentSlideData.imageUrl}
                    alt={currentSlideData.title}
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                {/* Overlay Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-slate-900/80 to-transparent" />
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
            </div>

            <div className="container relative z-10">
                <div className="relative h-[500px] md:h-[600px] flex items-center">
                    {/* Text Content - Modern Minimalist */}
                    <div className="max-w-3xl space-y-8">
                        {/* Tag/Badge */}
                        {currentSlideData.tag && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-semibold">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                {currentSlideData.tag}
                            </div>
                        )}

                        {/* Title - Clean and Bold */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                            {currentSlideData.title}
                        </h1>

                        {/* Subtitle - Elegant */}
                        <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
                            {currentSlideData.subtitle}
                        </p>

                        {/* CTA Button - Modern Gradient */}
                        {currentSlideData.link && (
                            <Link
                                href={currentSlideData.link}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 group"
                            >
                                <span>Selengkapnya</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons - Modern Minimal */}
            <button
                onClick={goToPrevious}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl shadow-lg transition-all hover:scale-110"
                aria-label="Slide sebelumnya"
            >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl shadow-lg transition-all hover:scale-110"
                aria-label="Slide berikutnya"
            >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator - Modern Elegant */}
            <div className="absolute bottom-8 left-0 right-0 z-20">
                <div className="container">
                    <div className="flex gap-2 justify-center md:justify-start">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={cn(
                                    'h-2 rounded-full transition-all duration-300',
                                    index === currentSlide
                                        ? 'w-12 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/50'
                                        : 'w-8 bg-white/30 hover:bg-white/50 backdrop-blur-sm'
                                )}
                                aria-label={`Ke slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

