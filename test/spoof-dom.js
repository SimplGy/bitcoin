(function() {
  var document, window;

  window = {};

  document = {
    createElement: function() {
      return {};
    },
    body: {
      appendChild: function() {}
    }
  };

  global.window = window;

  global.document = document;

}).call(this);
