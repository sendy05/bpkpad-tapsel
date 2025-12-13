import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 text-gray-900">
            <div className="flex">
                <Sidebar />
                <div className="flex-1 min-w-0">
                    <TopBar />
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</div>
                </div>
            </div>
        </div>
    );
}

