import { NextResponse } from 'next/server';
import { announcements } from '@/data/announcements';

export function GET() {
    return NextResponse.json(announcements);
}

