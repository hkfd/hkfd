const baseConfig = require('./protractor.conf').config;

config = {
  ...baseConfig,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--no-sandbox',
        '--headless',
        '--disable-gpu',
        '--window-size=800,600'
      ]
    }
  },
  baseUrl: 'http://localhost:4000/'
};

exports.config = config;
