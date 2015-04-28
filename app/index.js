(function() {
  var calendar, onReady;

  calendar = require('common/ui/calendar/calendar');

  onReady = function() {
    FastClick.attach(document.body);
    return calendar.init();
  };

  if (document.readyState !== 'loading') {
    onReady();
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }

}).call(this);
