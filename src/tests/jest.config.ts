import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/src/tests"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setup.ts",
  ],

  clearMocks: true,
  restoreMocks: true,
};

export default config;