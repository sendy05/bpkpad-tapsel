"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const schema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
});

type FormValues = z.infer<typeof schema>;

export default function NewCategoryForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, watch, setValue } = useForm<FormValues>({
        resolver: zodResolver(schema) as any,
    });

    const onSubmit = async (data: FormValues) => {
        const res = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            if (err?.error?.toLowerCase().includes('slug')) {
                setError('slug', { type: 'server', message: err.error });
            } else if (err?.error?.toLowerCase().includes('nama')) {
                setError('name', { type: 'server', message: err.error });
            } else {
                alert(err.error || 'Gagal menyimpan kategori');
            }
            return;
        }
        window.location.href = '/admin/kategori';
    };

    const name = watch('name');
    const slug = watch('slug');
    // Auto-generate slug if empty
    React.useEffect(() => {
        if (!name) return;
        if (!slug || slug.trim() === '') {
            const s = name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            setValue('slug', s, { shouldValidate: true });
        }
    }, [name, slug, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">🏷️ Nama Kategori</label>
                    <input
                        {...register('name')}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                        placeholder="Masukkan nama kategori"
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">🔗 Slug URL</label>
                    <input
                        {...register('slug')}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none font-mono text-sm"
                        placeholder="slug-kategori"
                    />
                    {errors.slug && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.slug.message}</p>}
                </div>
            </div>
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? '⏳ Menyimpan...' : '💾 Simpan Kategori'}
                </button>
                <button
                    type="button"
                    onClick={() => history.back()}
                    className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                >
                    ❌ Batal
                </button>
            </div>
        </form>
    );
}

