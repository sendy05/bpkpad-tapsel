import StatistikForm from '../StatistikForm';

export default function NewStatistikPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Tambah Data Statistik Baru
                </h1>
                <p className="text-gray-600 mt-1">Tambahkan data statistik pendapatan dan aset BPKPAD</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <StatistikForm />
            </div>
        </div>
    );
}

