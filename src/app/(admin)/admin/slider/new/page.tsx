import SliderForm from "@/components/admin/SliderForm";

export const metadata = {
    title: "Tambah Slider",
};

export default function NewSliderPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                    ➕ Tambah Slider Baru
                </h1>
                <p className="text-gray-600">Tambahkan gambar slider untuk homepage</p>
            </div>

            <SliderForm mode="create" />
        </div>
    );
}
