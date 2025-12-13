"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface TopBarItem {
    label: string;
    href: string;
    icon?: string;
}

const quickAccess: TopBarItem[] = [
    { label: 'Kurs Pajak', href: '/layanan/kurs-pajak', icon: '💱' },
    { label: 'Peraturan', href: '/regulasi', icon: '📜' },
    { label: 'APBD Kita', href: '/data-statistik', icon: '📊' },
    { label: 'Pengumuman', href: '/berita?kategori=Pengumuman', icon: '📢' },
];

export function TopBar() {
    const [currentDate, setCurrentDate] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const dateOptions: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            const timeOptions: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };

            setCurrentDate(now.toLocaleDateString('id-ID', dateOptions));
            setCurrentTime(now.toLocaleTimeString('id-ID', timeOptions));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 text-white border-b border-emerald-600">
            <div className="container">
                <div className="flex items-center justify-between py-2 text-sm">
                    {/* Date Time */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">{currentDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-mono">{currentTime} WIB</span>
                        </div>
                    </div>

                    {/* Empty spacer */}
                    <div></div>
                </div>
            </div>
        </div>
    );
}

