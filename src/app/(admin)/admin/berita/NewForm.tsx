"use client";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import Image from 'next/image';

// Note: react-quill-new package not installed
// const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
// import 'react-quill-new/dist/quill.snow.css';

const schema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    categoryId: z.string().min(1),
    content: z.string().min(10),
    excerpt: z.string().optional(),
    featuredImage: z.string().url().optional(),
    status: z.enum(['DRAFT', 'PUBLISHED']),
});

type FormValues = z.infer<typeof schema>;

export default function NewForm({ categories }: { categories: { id: string; name: string }[] }) {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, setError } = useForm<FormValues>({
        resolver: zodResolver(schema) as any,
        defaultValues: { status: 'DRAFT' as const },
    });

    const [uploading, setUploading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onSubmit = async (data: FormValues) => {
        const res = await fetch('/api/admin/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({} as any));
            if (err?.error?.toLowerCase().includes('slug')) {
                setError('slug', { type: 'server', message: err.error });
            } else {
                alert(err.error || 'Gagal menyimpan');
            }
            return;
        }
        window.location.href = '/admin/berita';
    };

    const onUpload = async (file: File) => {
        const form = new FormData();
        form.append('file', file);
        setUploading(true);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: form });
            const json = await res.json();
            if (res.ok && json.url) {
                setValue('featuredImage', json.url);
            } else {
                alert('Upload gagal');
            }
        } finally {
            setUploading(false);
        }
    };

    const content = watch('content');
    const title = watch('title');
    const slug = watch('slug');
    useEffect(() => {
        // ensure RHF knows content changes
        setValue('content', content || '');
    }, [content, setValue]);

    // Auto-slugify when title changes and slug untouched or matches previous
    useEffect(() => {
        if (!title) return;
        if (!slug || slug.trim() === '') {
            const s = title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            setValue('slug', s, { shouldValidate: true });
        }
    }, [title, slug, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">📝 Judul Berita</label>
                    <input
                        {...register('title')}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                        placeholder="Masukkan judul berita"
                    />
                    {errors.title && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">🔗 Slug URL</label>
                    <input
                        {...register('slug')}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none font-mono text-sm"
                        placeholder="slug-url-berita"
                    />
                    {errors.slug && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.slug.message}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">📁 Kategori</label>
                    <select
                        {...register('categoryId')}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                    >
                        <option value="">Pilih Kategori</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.categoryId && <p className="text-xs text-red-600 mt-1.5 font-medium">Wajib pilih kategori</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">📌 Status Publikasi</label>
                    <select
                        {...register('status')}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                    >
                        <option value="DRAFT">📝 Draft</option>
                        <option value="PUBLISHED">✅ Published</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">📊 Ringkasan</label>
                <textarea
                    {...register('excerpt')}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none resize-none"
                    placeholder="Ringkasan singkat berita (opsional)"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">✏️ Konten Berita</label>
                {mounted ? (
                    <div className="rounded-lg border-2 border-gray-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all overflow-hidden">
                        <textarea
                            {...register('content')}
                            rows={15}
                            className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            placeholder="Konten berita..."
                        />
                    </div>
                ) : (
                    <div className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-500 text-center">
                        Loading editor...
                    </div>
                )}
                {errors.content && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.content.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">🖼️ Gambar Unggulan</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && onUpload(e.target.files[0])}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-semibold hover:file:bg-emerald-100"
                />
                <p className="text-xs text-gray-500 mt-1.5">{uploading ? '⏳ Mengunggah gambar...' : '📂 Pilih gambar untuk diunggah ke Cloudinary'}</p>
                {!!watch('featuredImage') && (
                    <div className="mt-3 p-4 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                        <p className="text-xs font-semibold text-emerald-700 mb-2">Preview:</p>
                        <Image src={watch('featuredImage') as any} alt="Featured" width={320} height={180} className="w-full max-w-sm h-auto rounded-lg border-2 border-emerald-300 shadow-md" />
                    </div>
                )}
            </div>
            <div className="pt-4 border-t border-gray-200">
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? '⏳ Menyimpan...' : '💾 Simpan Berita'}
                    </button>
                    <button
                        type="button"
                        onClick={() => history.back()}
                        className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                    >
                        ❌ Batal
                    </button>
                </div>
            </div>
        </form>
    );
}
