import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'File tidak ditemukan' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'File harus berupa gambar' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB after compression)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'File terlalu besar (maksimal 5MB)' },
                { status: 400 }
            );
        }

        // Create upload directory if not exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const ext = path.extname(file.name) || '.jpg';
        const filename = `img_${timestamp}_${randomString}${ext}`;
        const filepath = path.join(uploadDir, filename);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Return public URL
        const url = `/uploads/images/${filename}`;

        return NextResponse.json({
            success: true,
            url,
            filename,
            size: file.size,
            type: file.type,
        });

    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Gagal mengupload gambar: ' + error.message },
            { status: 500 }
        );
    }
}

