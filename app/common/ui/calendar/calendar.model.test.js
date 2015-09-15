(function() {
  var calendar, moment;

  require('spoof-dom');

  calendar = require('./calendar.model');

  moment = require('moment');

  describe("common/ui/calendar.model", function() {
    it('exists', function() {
      return expect(calendar).toBeDefined();
    });
    return describe('getDatesByWeek()', function() {
      it('Returns 7 dates for this week', function() {
        var results;
        results = calendar.getDatesByWeek(0);
        return expect(results.length).toBe(7);
      });
      it('Returns 7 dates for a week far in the past', function() {
        var results;
        results = calendar.getDatesByWeek(99);
        return expect(results.length).toBe(7);
      });
      return it('Returns the correct dates for the current week', function() {
        var expectedDates, i, now, results, _i;
        results = calendar.getDatesByWeek(0);
        now = moment();
        expectedDates = [];
        for (i = _i = 0; _i <= 6; i = ++_i) {
          expectedDates.push(now.day(i).format(calendar.formatStr));
        }
        return expect(results).toEqual(expectedDates);
      });
    });
  });

}).call(this);
