module.exports = {
  moduleDirectories: ['dist', 'node_modules'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/server/'],
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
