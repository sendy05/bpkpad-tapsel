import Image from 'next/image';
import { leaders } from '@/data/leaders';

export function GreetingCard() {
    const kepala = leaders[0];
    return (
        <section className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600 shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-32 -mt-32 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300 rounded-full blur-3xl -ml-24 -mb-24 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10">
                <div className="grid md:grid-cols-[160px,1fr] gap-8 items-start">
                    {/* Photo with Glow */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[1.5rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <div className="relative w-[160px] h-[160px] rounded-[1.5rem] overflow-hidden ring-4 ring-white/40 shadow-2xl">
                            <Image src={kepala.foto ?? '/images/kepala-bpkpad.svg'} alt={kepala.nama} fill className="object-cover" />
                        </div>
                        {/* Star Badge */}
                        <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div>
                        <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 border border-white/30">
                            <span className="text-sm font-semibold text-white">Sambutan Pimpinan</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Kepala BPKPAD</h2>
                        <p className="text-lg text-blue-100 font-medium mb-6">
                            {kepala.nama} — <span className="text-blue-50">{kepala.jabatan}</span>
                        </p>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <p className="text-lg leading-relaxed text-white">
                                {kepala.bio ?? 'Selamat datang di Website Resmi BPKPAD Kab. Tapanuli Selatan. Kami berkomitmen untuk memberikan pelayanan terbaik dalam pengelolaan keuangan dan aset daerah.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
