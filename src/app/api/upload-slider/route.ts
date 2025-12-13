import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'File must be an image' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'File size must be less than 5MB' },
                { status: 400 }
            );
        }

        // Create upload directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'sliders');
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Generate unique filename
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const ext = file.name.split('.').pop();
        const filename = `slider_${timestamp}_${randomString}.${ext}`;
        
        const filepath = join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return the public URL
        const publicUrl = `/uploads/sliders/${filename}`;
        
        return NextResponse.json({ 
            success: true,
            url: publicUrl 
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}
