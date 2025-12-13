import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kontak',
    description: 'Informasi kontak, alamat, jam operasional, peta lokasi, dan formulir kontak BPKPAD Kab. Tapanuli Selatan.'
};

export default function KontakPage() {
    return (
        <div className="space-y-10 pb-12">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600 p-12 md:p-16 shadow-2xl">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/30 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/30">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-white">Kami Siap Melayani</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">Hubungi Kami</h1>
                    <p className="text-xl text-blue-50 font-light max-w-2xl mx-auto">Sampaikan pertanyaan, saran, atau kritik Anda kepada kami</p>
                </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        icon: (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ),
                        title: 'Alamat',
                        content: 'Jl. Contoh No. 1, Sipirok, Kab. Tapanuli Selatan',
                        gradient: 'from-emerald-500 to-teal-500'
                    },
                    {
                        icon: (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        ),
                        title: 'Telepon',
                        content: '+62-xxx-xxxx-xxxx',
                        gradient: 'from-blue-500 to-cyan-500'
                    },
                    {
                        icon: (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        ),
                        title: 'Email',
                        content: 'humas@bpkpad.tapsel.go.id',
                        gradient: 'from-purple-500 to-pink-500'
                    },
                    {
                        icon: (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                        title: 'Jam Kerja',
                        content: 'Senin–Jumat\n08:00–16:00 WIB',
                        gradient: 'from-amber-500 to-orange-500'
                    }
                ].map((item, i) => (
                    <div
                        key={item.title}
                        className="group relative rounded-[2rem] bg-white border-2 border-gray-100 p-6 shadow-lg hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{item.content}</p>

                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className={`w-2 h-2 bg-gradient-to-r ${item.gradient} rounded-full animate-pulse`}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Map Section */}
            <section className="relative rounded-[2rem] bg-gradient-to-br from-blue-50 to-cyan-50 p-8 shadow-xl overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg text-3xl">
                        📍
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-700">Lokasi Kami</h2>
                        <p className="text-blue-600 font-medium">Temukan kami di peta</p>
                    </div>
                </div>

                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden ring-4 ring-blue-100 shadow-2xl">
                    <iframe
                        title="Lokasi BPKPAD"
                        className="w-full h-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
                    />
                </div>
            </section>

            {/* Contact Form */}
            <section className="relative rounded-[2rem] overflow-hidden bg-white border-2 border-gray-100 shadow-xl">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
                            ✉️
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold">Kirim Pesan</h2>
                            <p className="text-blue-100">Kami akan merespons secepatnya</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <form method="post" action="/api/contact" className="grid gap-6 max-w-3xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6">
                            <label className="grid gap-2">
                                <span className="font-semibold text-gray-900 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
                                    Nama Lengkap
                                </span>
                                <input
                                    name="nama"
                                    required
                                    minLength={2}
                                    placeholder="Masukkan nama Anda"
                                    className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </label>
                            <label className="grid gap-2">
                                <span className="font-semibold text-gray-900 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
                                    Email
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="email@example.com"
                                    className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </label>
                        </div>

                        <label className="grid gap-2">
                            <span className="font-semibold text-gray-900 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
                                Subjek
                            </span>
                            <input
                                name="subjek"
                                required
                                minLength={3}
                                placeholder="Topik pesan Anda"
                                className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </label>

                        <label className="grid gap-2">
                            <span className="font-semibold text-gray-900 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">4</span>
                                Pesan
                            </span>
                            <textarea
                                name="pesan"
                                required
                                minLength={10}
                                placeholder="Tulis pesan Anda di sini..."
                                className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                rows={6}
                            />
                        </label>

                        <button
                            type="submit"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 w-fit mx-auto"
                        >
                            Kirim Pesan
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

