import InformasiPublikForm from '../InformasiPublikForm';

export default function NewInformasiPublikPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">➕ Tambah Informasi Publik</h1>
                <p className="text-gray-600 mt-1">Tambahkan informasi baru untuk PPID</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <InformasiPublikForm />
            </div>
        </div>
    );
}
