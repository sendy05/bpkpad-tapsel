import RegulasiForm from '../RegulasiForm';

export default function NewRegulasiPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Tambah Regulasi Baru
                </h1>
                <p className="text-gray-600 mt-1">Tambahkan dokumen regulasi dan peraturan daerah</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <RegulasiForm />
            </div>
        </div>
    );
}

