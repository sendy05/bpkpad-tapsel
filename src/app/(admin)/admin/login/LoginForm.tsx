"use client";

import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function LoginForm() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();
    const params = useSearchParams();
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
            const res = await signIn('credentials', {
                redirect: false,
                identifier,
                password,
            });
            if (res?.error) {
                setError('Login gagal. Periksa kembali kredensial Anda.');
                return;
            }
            // Berhasil: arahkan ke dashboard admin
            router.replace('/admin');
        });
    };

    const reason = params.get('reason');

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-blue-200 shadow-xl bg-white/95 backdrop-blur-sm p-8">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Masuk Admin</h1>
                        <p className="text-sm text-gray-600 mt-2">BPKPAD Kab. Tapanuli Selatan</p>
                    </div>

                    {reason === 'idle' && (
                        <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 text-sm">
                            <strong>Sesi berakhir:</strong> Silakan login kembali.
                        </div>
                    )}
                    {reason === 'auth' && (
                        <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 text-sm">
                            Silakan login untuk melanjutkan.
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                            <strong>Login gagal:</strong> {error}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email atau Username
                            </label>
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="Masukkan email atau username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="Masukkan password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={pending}
                            className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3.5 text-sm font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 transition-all"
                        >
                            {pending ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memproses…
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Masuk
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
                        <p>Sistem Admin BPKPAD Kab. Tapanuli Selatan</p>
                        <p className="mt-1">© 2025 • Secure Access</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

