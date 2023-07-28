module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts'],
  testPathIgnorePatterns: ['./node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  }
}
