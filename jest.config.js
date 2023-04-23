// jest.config.js

module.exports = {

    testEnvironment: "jsdom",
   
    // The file extensions that Jest should look for when running tests
    moduleFileExtensions: ['js'],

    // The patterns that Jest should use to find test files
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?)$',

    // The transform configuration that Jest should use to transpile your code
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },

    // The directories that Jest should search for modules
    moduleDirectories: ['node_modules', 'src'],

    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
};
  