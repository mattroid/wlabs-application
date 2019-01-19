const path = require('path');
const appModulePath = require('app-module-path');
const bluebird = require('bluebird');

// Bluebird promise is much faster than native ES6 promises.
global.Promise = bluebird;

// Must happen before require is called.
appModulePath.addPath(path.join(__dirname, '../dist')); // eslint-disable-line
appModulePath.addPath(path.join(__dirname, '../conf')); // eslint-disable-line

// setup our logging
const log = require('helpers/log');
global.logger = log.default;

require('main');
