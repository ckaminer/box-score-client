module.exports = {
  clearMocks: true,
  testPathIgnorePatterns: [
    '/node_modules',
  ],
  moduleNameMapper: {
    '^.*[.](less|svg|png|PNG|css|CSS)$': '<rootDir>/CSSStub.js',
  },
  setupFilesAfterEnv: ['<rootDir>/enzyme.config.js'],
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'ts',
    'tsx',
    'node',
  ],
}
