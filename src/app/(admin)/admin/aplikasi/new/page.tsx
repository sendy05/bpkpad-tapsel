import AplikasiForm from '@/components/admin/AplikasiForm';

export default function NewAplikasiPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    ➕ Tambah Aplikasi Baru
                </h1>
                <p className="text-gray-600 mt-2">Tambahkan aplikasi baru yang akan ditampilkan di homepage</p>
            </div>

            <AplikasiForm mode="create" />
        </div>
    );
}
