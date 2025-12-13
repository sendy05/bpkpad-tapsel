import Link from 'next/link';

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t mt-12 bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">BPKPAD Kab. Tapanuli Selatan</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">Badan Pengelola Keuangan dan Aset Daerah Kabupaten Tapanuli Selatan</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Kontak</h3>
                        <p className="text-sm text-gray-600">Jl. Contoh No. 1, Sipirok</p>
                        <p className="text-sm text-gray-600">Email: humas@bpkpad.tapsel.go.id</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Tautan</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li><Link href="/profil" className="hover:text-blue-700 transition">Profil</Link></li>
                            <li><Link href="/berita" className="hover:text-blue-700 transition">Berita</Link></li>
                            <li><Link href="/kontak" className="hover:text-blue-700 transition">Kontak</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t pt-4 text-center text-sm text-gray-600">
                    <p>© {year} BPKPAD Kab. Tapanuli Selatan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

