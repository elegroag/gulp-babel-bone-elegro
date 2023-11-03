/*eslint-env es6*/
'use strict';

var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');

var App = {
  start() {
    console.log('OK Backbone');
    document.querySelector('body').innerHTML =
      '<h1>Init Bone Project</h1><p>With live reload</p>';
    // Initialize the router, showing the selected view
    // Backbone.history.start();
  },
};

_.extend(App, Backbone.Events);

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function () {
  App.start();
});
