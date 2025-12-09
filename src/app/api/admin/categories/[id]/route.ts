// Legacy route - table tidak ada di database
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ error: 'Endpoint tidak tersedia' }, { status: 410 });
}

export async function PUT() {
    return NextResponse.json({ error: 'Endpoint tidak tersedia' }, { status: 410 });
}

export async function PATCH() {
    return NextResponse.json({ error: 'Endpoint tidak tersedia' }, { status: 410 });
}

export async function DELETE() {
    return NextResponse.json({ error: 'Endpoint tidak tersedia' }, { status: 410 });
}
