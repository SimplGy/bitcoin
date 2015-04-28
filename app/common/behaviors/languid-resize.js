(function() {
  var handlers, languidity, onLanguidResize, _;

  _ = require('lodash');

  languidity = 200;

  handlers = [];

  onLanguidResize = function() {
    var fn, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = handlers.length; _i < _len; _i++) {
      fn = handlers[_i];
      _results.push(fn());
    }
    return _results;
  };

  window.onresize = _.debounce(onLanguidResize, languidity);

  module.exports = {
    on: function(fn) {
      return handlers.push(fn);
    }
  };

}).call(this);
