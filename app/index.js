(function() {
  var blockDisplay, onReady;

  blockDisplay = require('common/ui/block-display/block-display');
  require('common/ui/bitcoin-tip/bitcoin-tip');

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
