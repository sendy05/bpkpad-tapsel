/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable Turbopack configuration
    turbopack: {},
    
    // Experimental features
    experimental: {
        // optimizeCss: true, // Disabled - causing critters module error
        optimizePackageImports: ['@prisma/client', 'react-icons'], // Tree-shake large packages
    },

    // Image optimization
    images: {
        formats: ['image/avif', 'image/webp'], // Modern image formats
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co', // For placeholder images
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com', // Unsplash for hero images
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    },

    // Compiler options
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },

    // Headers for security and caching
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
            {
                // Cache static assets aggressively
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // Cache fonts
                source: '/fonts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },

    // Webpack configuration
    webpack: (config, { dev, isServer }) => {
        // Suppress findDOMNode warnings from react-quill
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                'react-dom': 'react-dom/profiling',
            };
        }

        // Production optimizations
        if (!dev && !isServer) {
            config.optimization = {
                ...config.optimization,
                moduleIds: 'deterministic', // Better long-term caching
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        default: false,
                        vendors: false,
                        // Vendor chunk
                        vendor: {
                            name: 'vendor',
                            chunks: 'all',
                            test: /node_modules/,
                            priority: 20,
                        },
                        // Common chunk
                        common: {
                            name: 'common',
                            minChunks: 2,
                            chunks: 'all',
                            priority: 10,
                            reuseExistingChunk: true,
                            enforce: true,
                        },
                    },
                },
            };
        }

        return config;
    },

    // Performance budgets
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },

    // Compression
    compress: true,

    // PoweredBy header removal
    poweredByHeader: false,

    // React strict mode - Disabled to prevent react-quill findDOMNode warnings
    reactStrictMode: false,

    // Generate ETags
    generateEtags: true,

    // Trailing slash
    trailingSlash: false,
};

export default nextConfig;
