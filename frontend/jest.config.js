module.exports = {
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		"^.+\\.(css|less|scss)$": "babel-jest",
		"^@src(.*)$": "<rootDir>/src$1",
	}
}
