import SliderForm from '@/components/admin/SliderForm';
import Link from 'next/link';

export default function NewSliderPage() {
    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <Link href="/admin" className="hover:text-blue-600 transition-colors">Dashboard</Link>
                <span>›</span>
                <Link href="/admin/slider" className="hover:text-blue-600 transition-colors">Slider</Link>
                <span>›</span>
                <span className="text-gray-900 font-medium">Tambah Baru</span>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tambah Slider Baru</h1>
                <p className="text-sm text-gray-600 mt-1">Tambahkan gambar slider baru untuk ditampilkan di halaman utama</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
                <SliderForm />
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                    <span className="text-2xl">💡</span>
                    <div className="flex-1">
                        <h3 className="font-semibold text-blue-900 mb-1">Tips untuk Slider yang Baik:</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Gunakan gambar berkualitas tinggi dengan rasio aspek 16:9</li>
                            <li>• Ukuran rekomendasi: 1920x1080 piksel atau lebih</li>
                            <li>• Hindari terlalu banyak teks dalam gambar</li>
                            <li>• Maksimal 5-7 slider untuk performa optimal</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

