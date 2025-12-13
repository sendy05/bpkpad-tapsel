import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import SliderEditForm from './SliderEditForm';
import Link from 'next/link';

export default async function EditSliderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const slider = await prisma.tbl_slider.findUnique({
        where: { id: parseInt(id) }
    });

    if (!slider) {
        notFound();
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <Link href="/admin" className="hover:text-blue-600 transition-colors">Dashboard</Link>
                <span>›</span>
                <Link href="/admin/slider" className="hover:text-blue-600 transition-colors">Slider</Link>
                <span>›</span>
                <span className="text-gray-900 font-medium">Edit</span>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Slider</h1>
                <p className="text-sm text-gray-600 mt-1">Perbarui informasi slider</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
                <SliderEditForm slider={slider} />
            </div>
        </div>
    );
}
