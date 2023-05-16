export default {
	rootDir: "./../..",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	collectCoverage: true,
	collectCoverageFrom: ["src/controllers/*controller.ts"],
	testTimeout: 20000,
};