module.exports = {
  roots: ["<rootDir>/tests"],
  transform: { "^.+\\.ts?$": "ts-jest" },
  coverageDirectory: "coverage",
  testEnvironment: "node",
  testEnvironment: "node",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**"],
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "~/tests/(.*)": "<rootDir>/tests/$1",
    "~/(.*)": "<rootDir>/src/$1",
  },
};
