import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
        return NextResponse.json({ error: 'Content-Type harus multipart/form-data' }, { status: 400 });
    }
    const form = await req.formData();
    const file = form.get('file');
    if (!file || !(file instanceof Blob)) return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    try {
        const res = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: 'bpkpad' }, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                })
                .end(buffer);
        });
        return NextResponse.json({ url: res.secure_url, publicId: res.public_id });
    } catch (e) {
        return NextResponse.json({ error: 'Upload gagal' }, { status: 500 });
    }
}
