module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.svg$': '<rootDir>/src/svgTransformer.js',
        '^.+\\.scss$': '<rootDir>/src/svgTransformer.js'
    },
    extensionsToTreatAsEsm: ['.jsx, .tsx'],

    transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
};