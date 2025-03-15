module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    },
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
    maxWorkers: 1,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
