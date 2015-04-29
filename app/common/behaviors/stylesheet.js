(function() {
  var css, onReady;

  css = null;

  onReady = function() {
    css = document.createElement('style');
    css.type = "text/css";
    return document.body.appendChild(css);
  };

  if (document.readyState !== 'loading') {
    onReady();
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }

  module.exports = {
    add: function(selector, rules) {
      css.innerHTML += "" + selector + " { " + rules + " }\n";
      return selector;
    },
    remove: function(selector) {
      var i, line, lines, removeCount;
      lines = css.innerHTML.split('\n');
      i = lines.length - 1;
      removeCount = 0;
      while (i >= 0) {
        line = lines[i];
        if (line.indexOf("" + selector + " { ") !== -1) {
          lines.splice(i, 1);
          removeCount++;
        }
        i--;
      }
      css.innerHTML = lines.join('\n');
      return removeCount;
    }
  };

}).call(this);
