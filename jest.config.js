module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': ['ts-jest', {
        tsconfig: 'tsconfig.json',
        babelConfig: false,
      }],
    },
    testMatch: ['**/?(*.)+(test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/app/$1',
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };