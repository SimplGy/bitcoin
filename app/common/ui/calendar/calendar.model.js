(function() {
  var Model, genesis, m, moment, monthNames,
    __hasProp = {}.hasOwnProperty;

  moment = require('moment');

  genesis = 2009;

  monthNames = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  };

  Model = function() {
    this.buildEmptyStructure();
    this.cacheLoad();
    this.cacheSave();
    return void 0;
  };

  Model.prototype = {
    buildEmptyStructure: function() {
      var curMonth, curYear, dateKey, day, endingDay, endingMonth, month, now, year, _i, _results;
      now = new Date();
      curYear = now.getFullYear();
      curMonth = now.getMonth() + 1;
      _results = [];
      for (year = _i = genesis; genesis <= curYear ? _i <= curYear : _i >= curYear; year = genesis <= curYear ? ++_i : --_i) {
        endingMonth = year === curYear ? curMonth : 12;
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (month = _j = 1; 1 <= endingMonth ? _j <= endingMonth : _j >= endingMonth; month = 1 <= endingMonth ? ++_j : --_j) {
            if (month < 10) {
              month = '0' + month;
            }
            endingDay = moment("" + year + "-" + month, 'YYYY-MM').daysInMonth();
            _results1.push((function() {
              var _k, _results2;
              _results2 = [];
              for (day = _k = 1; 1 <= endingDay ? _k <= endingDay : _k >= endingDay; day = 1 <= endingDay ? ++_k : --_k) {
                if (day < 10) {
                  day = '0' + day;
                }
                dateKey = "" + year + "-" + month + "-" + day;
                _results2.push(this[dateKey] = {
                  month: monthNames[month]
                });
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    },
    cacheLoad: function() {
      var item, key, _results;
      _results = [];
      for (key in this) {
        if (!__hasProp.call(this, key)) continue;
        if (!(item = typeof localStorage !== "undefined" && localStorage !== null ? localStorage[key] : void 0)) {
          continue;
        }
        item = JSON.parse(item);
        console.log("Cache Contained " + key, item);
        _results.push(this[key] = item);
      }
      return _results;
    },
    cacheClear: function() {
      return typeof localStorage !== "undefined" && localStorage !== null ? localStorage.clear() : void 0;
    },
    cacheSave: function() {
      var key, val, _results;
      _results = [];
      for (key in this) {
        if (!__hasProp.call(this, key)) continue;
        val = this[key];
        if (val.blocks == null) {
          continue;
        }
        _results.push(typeof localStorage !== "undefined" && localStorage !== null ? localStorage[key] = JSON.stringify(val) : void 0);
      }
      return _results;
    }
  };

  m = new Model();

  window._cal = m;

  window.m = moment;

  module.exports = m;

}).call(this);
