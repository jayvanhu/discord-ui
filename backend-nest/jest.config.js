module.exports = {
	testEnvironment: 'node',
	moduleNameMapper: {
		"^src(.*)$": "<rootDir>/src$1",
	},
	transform: {
		'ts$': 'ts-jest',
	}
}
