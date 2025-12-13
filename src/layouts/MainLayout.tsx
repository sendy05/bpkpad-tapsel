import type { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            {/* Skip to main content - Accessibility */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            <div className="flex flex-col min-h-screen">
                {/* Main content */}
                <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
                    {children}
                </main>
            </div>
        </>
    );
}

