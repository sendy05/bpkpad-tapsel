import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import SliderForm from "@/components/admin/SliderForm";

export const metadata = {
    title: "Edit Slider",
};

async function getSlider(id: string) {
    const slider = await prisma.tbl_slider.findUnique({
        where: { id: parseInt(id) },
    });

    if (!slider) return null;

    return {
        id: slider.id,
        keterangan: slider.keterangan || "",
        foto: slider.foto || "",
    };
}

export default async function EditSliderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const slider = await getSlider(id);

    if (!slider) notFound();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                    ✏️ Edit Slider
                </h1>
                <p className="text-gray-600">Perbarui informasi slider #{slider.id}</p>
            </div>

            <SliderForm mode="edit" initialData={slider} />
        </div>
    );
}
