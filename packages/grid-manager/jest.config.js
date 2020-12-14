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
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  testURL: "http://localhost:9000"
};