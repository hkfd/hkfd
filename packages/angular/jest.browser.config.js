module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setupJest.ts',
  moduleNameMapper: {
    '^shared$': '<rootDir>/src/app/shared',
    'shared/(.*)': '<rootDir>/src/app/shared/$1',
    '^environment$': '<rootDir>/src/environments/environment.testing',
    '^generic$': '<rootDir>/src/app/shared/generic',
    '^prismic$': '<rootDir>/src/app/shared/prismic',
    '^testing$': '<rootDir>/src/testing'
  },
  testPathIgnorePatterns: ['<rootDir>/server.spec.ts'],
  coveragePathIgnorePatterns: ['/testing/', 'setupJest', 'jestGlobalMocks'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        output: '<rootDir>/jest/results.xml'
      }
    ]
  ]
};
