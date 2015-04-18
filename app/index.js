(function() {
  var blockDisplay;

  blockDisplay = require('common/ui/block-display/block-display');

  if (document.readyState !== 'loading') {
    blockDisplay.init();
  } else {
    document.addEventListener('DOMContentLoaded', blockDisplay.init);
  }

}).call(this);
