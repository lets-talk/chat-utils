module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ["ts", "js"],
  transform: {"\\.ts$": ['ts-jest']},
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage/",
  coverageReporters: [
    "json",
    "html"
  ],
  collectCoverageFrom: [
    "**/src/*.{js,jsx,ts,tsx}",
    "**/src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
    "!**/src/mocks/**"
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  testURL: "http://localhost:9000"
};