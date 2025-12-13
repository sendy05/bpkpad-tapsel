import ProfilOrganisasiForm from '../ProfilOrganisasiForm';

export default function NewProfilOrganisasiPage() {
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Buat Profil Organisasi</h1>
                    <p className="text-sm text-gray-600 mt-1">Lengkapi informasi profil organisasi BPKPAD</p>
                </div>

                <ProfilOrganisasiForm />
            </div>
        </div>
    );
}

