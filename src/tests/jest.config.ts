export default {
	rootDir: "./../..",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	collectCoverage: true,
	collectCoverageFrom: ["src/controllers/*controller.ts"],
	globalSetup: "./src/tests/utils/startTest.ts",
	globalTeardown: "./src/tests/utils/endTest.ts",
	testTimeout: 20000,
};