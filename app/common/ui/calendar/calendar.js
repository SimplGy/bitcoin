(function() {
  var init, model;

  model = require('./calendar.model');

  init = function() {
    var container;
    console.log('calendar init()');
    return container = d3.select("body").append('ol').attr('class', 'calendar');
  };

  module.exports = {
    init: init
  };

}).call(this);
