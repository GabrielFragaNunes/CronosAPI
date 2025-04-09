exports.config = {
    runner: 'local',

    specs: ['./test/specs/*.js'],  // Já cobre todos os testes, incluindo filmesActivity.e2e.js

    suites: {
        filmes: ['./test/specs/filmesActivity.e2e.js']
    },

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Medium Phone API 36',
        'appium:appPackage': 'com.example.cronos',
        'appium:appActivity': '.FilmesActivity',
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300
    }],

    services: ['appium'],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
