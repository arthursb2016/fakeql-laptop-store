module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/*.test.(ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}
