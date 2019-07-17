module.exports = {
  "roots": [
    "<rootDir>/src",
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "setupFiles": ["<rootDir>/jest.setup.js"],
  "testURL": "http://localhost/",
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)sx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}
