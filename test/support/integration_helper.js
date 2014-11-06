/*global beforeEach browser*/
// This file is run before all other specs
// mocha is already global here
var fs = require('fs');
var Promise = require('promise');

global.chai = require("chai");
global.chai.use(require("sinon-chai"));
global.chai.use(require("chai-as-promised"));
global.expect = require("chai").expect;
global.manifest = require('../../src/manifest');
global.Tests = {};

// Test non angular apps by ignoring synchronozation
beforeEach(function() {
  browser.ignoreSynchronization = true;
});

//
// HELPER function to make live easier:
//

// abstract writing screen shot to a file
global.Tests.writeScreenShot = function(data, filename) {
  var stream = fs.createWriteStream(filename);
  stream.write(new Buffer(data, 'base64'));
  stream.end();
};

var Tests = {
  // Logs the current page source to the console
  showPageSource: function() {
    browser.driver.getPageSource().then(function (source) {
      console.log(source);
    });
  },
  // Go to a testing URL and give the extension some time to inject its HTML
  visit: function(htmlPage) {
    return new Promise(function(resolve) {
      browser.driver.get("http://localhost:8889/form-o-fill-testing/" + htmlPage + ".html")
      .then(function () {
        browser.driver.sleep(500).then(resolve);
      });
    });
  },
  // import rules
  importRules: function() {
    return new Promise(function (resolve) {
      $("#form-o-fill-testing-import-submit").click().then(function () {
        browser.driver.sleep(1200).then(resolve);
      });
    });
  }
};

global.Tests = Tests;
