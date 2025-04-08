module.exports = {
  displayName: "finance-api",
  preset: "ts-jest", // ✅ Ensure Jest uses ts-jest to handle TypeScript
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/tests/**/*.test.ts", "**/*.test.ts", "**/*.spec.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageReporters: ["json", "lcov", "text", "clover"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/index.ts",
    "/src/errors/",
    "/src/repositories/",
    "/src/providers/",
    "/src/utils/",
    "/src/config/", // ✅ Ignore config files
    "/src/middlewares/", // ✅ Ignore a specific middleware
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"], // ✅ Automatically runs before all tests
  transform: {
    "^.+\\.ts$": "ts-jest", // ✅ Tell Jest to transform TypeScript files
  },
};
