/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
                useESM: true,
            },
        ],
    },
    transformIgnorePatterns: [
        // Allow ESM-only packages like jose to be loaded
        'node_modules/(?!jose/.*)'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        // Fix ESM path mapping for TS transpiled files
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};

export default config;
