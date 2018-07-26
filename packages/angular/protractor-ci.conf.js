const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: [
      '--no-sandbox',
      '--headless',
      '--disable-gpu',
      '--window-size=800,600'
    ]
  }
};

exports.config = config;
