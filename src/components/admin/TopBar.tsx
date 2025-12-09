import { auth, signOut } from '@/auth';

export default async function TopBar() {
    const session = await auth();
    return (
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
                <div className="font-medium">Panel Admin</div>
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600">{session?.user?.name}</span>
                    <form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/admin/login' });
                        }}
                    >
                        <button className="rounded bg-gray-800 text-white px-3 py-1.5 hover:bg-black">Keluar</button>
                    </form>
                </div>
            </div>
        </header>
    );
}
