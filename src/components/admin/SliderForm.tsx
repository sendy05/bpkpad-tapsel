"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SliderFormData {
    id?: number;
    keterangan: string;
    foto: string;
}

interface SliderFormProps {
    initialData?: SliderFormData;
    mode: "create" | "edit";
}

export default function SliderForm({ initialData, mode }: SliderFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<SliderFormData>({
        keterangan: initialData?.keterangan || "",
        foto: initialData?.foto || "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const url = mode === "create"
                ? "/api/admin/slider"
                : `/api/admin/slider/${initialData?.id}`;

            const method = mode === "create" ? "POST" : "PUT";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to save");

            router.push("/admin/slider");
            router.refresh();
        } catch (err) {
            setError("Gagal menyimpan data. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                    {error}
                </div>
            )}

            {/* Preview Image */}
            {formData.foto && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Preview:</label>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                        <Image
                            src={formData.foto}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                </div>
            )}

            {/* Foto URL */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    URL Foto <span className="text-red-500">*</span>
                </label>
                <input
                    type="url"
                    required
                    value={formData.foto}
                    onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                    placeholder="https://example.com/image.jpg"
                />
                <p className="mt-2 text-sm text-gray-500">
                    Masukkan URL gambar slider (idealnya ukuran 1920x1080px)
                </p>
            </div>

            {/* Keterangan */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Keterangan Slider
                </label>
                <textarea
                    value={formData.keterangan}
                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none resize-none"
                    placeholder="Deskripsi atau judul slider..."
                />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {mode === "create" ? "Tambah Slider" : "Simpan Perubahan"}
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-4 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold transition-all"
                >
                    Batal
                </button>
            </div>
        </form>
    );
}
