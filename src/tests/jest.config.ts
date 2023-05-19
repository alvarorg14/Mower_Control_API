export default {
  rootDir: "./../..",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/controllers/*controller.ts", "src/repositories/*repository.ts", "src/models/*model.ts"],
  globalSetup: "./src/tests/utils/startTest.ts",
  globalTeardown: "./src/tests/utils/endTest.ts",
  testTimeout: 20000,
};
