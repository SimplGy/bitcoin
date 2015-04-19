(function() {
  var blockDisplay, onReady;

  blockDisplay = require('common/ui/block-display/block-display');

  onReady = function() {
    FastClick.attach(document.body);
    return blockDisplay.init();
  };

  if (document.readyState !== 'loading') {
    onReady();
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }

}).call(this);
