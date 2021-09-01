module.exports = {
  testEnvironment: 'jsdom',
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // By default, all files inside `node_modules` are not transformed. But some 3rd party
  // modules are published as untranspiled, Jest will not understand the code in these modules.
  // To overcome this, exclude these modules in the ignore pattern.
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  moduleNameMapper: {
    '^@/api/(.*)': '<rootDir>/src/api/$1',
    '^@/assets/(.*)': '<rootDir>/src/assets/$1',
    '^@/components/(.*)': '<rootDir>/src/components/$1',
    '^@/locales/(.*)': '<rootDir>/locales/$1',
    '^@/navigators/(.*)': '<rootDir>/src/navigators/$1',
    '^@/screens/(.*)': '<rootDir>/src/screens/$1',
    '^@/services/(.*)': '<rootDir>/src/services/$1',
    '^@/styles/(.*)': '<rootDir>/src/styles/$1',
    '^@/utilities/(.*)': '<rootDir>/src/utilities/$1',
  },
};
