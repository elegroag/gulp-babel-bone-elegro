/*eslint quotes: ["error", "double"]*/
/*eslint-env es6*/
"use strict";

var _ = require("underscore");
var $ = require("jquery");
var Backbone = require("backbone");

class App {
  constructor() {
    console.log("OK Backbone");
    // Initialize the router, showing the selected view
    // Backbone.history.start();
  }
}

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function() {
  new App();
});
