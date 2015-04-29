
/*
  The Calendar is a view management object.
  It displays calendar-shaped dom nodes and knows the following:
  - [x] What rows are currently visible
  - [ ] What days are currently displayed
  - [ ] How each day corresponds with a dom node
 */

(function() {
  var Size, availableEls, calcVisibleRange, cleanUp, container, dayElsByDate, daysPerRow, init, languidResize, maxDayHeight, model, moment, onPause, onResize, onScroll, previousScrollY, render, renderRow, resetElements, rowEls, rowElsByDate, size, stylesheet, _,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('lodash');

  model = require('./calendar.model');

  languidResize = require('common/behaviors/languid-resize');

  stylesheet = require('common/behaviors/stylesheet');

  moment = require('moment');

  size = null;

  container = null;

  rowEls = null;

  availableEls = null;

  dayElsByDate = null;

  rowElsByDate = null;

  maxDayHeight = 90;

  daysPerRow = 7;

  previousScrollY = 0;

  Size = function() {
    this.dayWidth = Math.floor((1 / daysPerRow) * container.offsetWidth);
    this.dayHeight = Math.min(this.dayWidth, maxDayHeight);
    this.topOffset = container.offsetTop;
    this.cols = daysPerRow;
    return this.rows = Math.ceil(window.innerHeight / this.dayHeight);
  };

  init = function() {
    container = document.createElement('div');
    container.className = 'calendar';
    document.body.appendChild(container);
    languidResize.on(onResize);
    window.onscroll = onScroll;
    return _.defer(onResize);
  };

  resetElements = function() {
    var day, dayOfWeek, i, row, _i, _results;
    container.innerHTML = '';
    availableEls = [];
    rowEls = {};
    container.style.height = "" + (model.totalWeeks * size.dayHeight) + "px";
    i = 0;
    _results = [];
    while (i++ <= size.rows * 2) {
      row = document.createElement('ol');
      for (dayOfWeek = _i = 0; _i <= 6; dayOfWeek = ++_i) {
        day = document.createElement('li');
        day.className = "day-" + dayOfWeek;
        row.appendChild(day);
      }
      availableEls.push(row);
      _results.push(container.appendChild(row));
    }
    return _results;
  };

  render = function() {
    var idx, row, visibleRange, _i, _len, _results;
    visibleRange = calcVisibleRange();
    cleanUp(visibleRange);
    _results = [];
    for (_i = 0, _len = visibleRange.length; _i < _len; _i++) {
      idx = visibleRange[_i];
      row = availableEls.pop();
      if (!row) {
        console.warn("No row available for " + idx, availableEls);
        continue;
      }
      renderRow(idx, row);
      _results.push(rowEls[idx] = row);
    }
    return _results;
  };

  cleanUp = function(range) {
    var idx, row, _results;
    _results = [];
    for (idx in rowEls) {
      row = rowEls[idx];
      if (__indexOf.call(range, idx) < 0) {
        availableEls.push(row);
        row.style.top = '';
        _results.push(delete rowEls[idx]);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  renderRow = function(idx, row) {
    var day, days, i, m, _i, _results;
    row.style.top = "" + (idx * size.dayHeight) + "px";
    if (row.children.length !== daysPerRow) {
      return console.warn("incorrect child elements in this row", row);
    }
    days = model.getDatesByWeek(idx);
    _results = [];
    for (i = _i = 0; 0 <= daysPerRow ? _i < daysPerRow : _i > daysPerRow; i = 0 <= daysPerRow ? ++_i : --_i) {
      day = row.children[i];
      m = moment(days[i], model.formatStr);
      if (m.date() === 1 && m.month() === 0) {
        day.innerText = m.format('MMM D, YYYY');
      } else {
        day.innerText = m.format('MMM D');
      }
      _results.push(day.setAttribute('title', "" + (m.format('ddd, MMMM Do YYYY')) + " (" + (m.fromNow()) + ")"));
    }
    return _results;
  };

  calcVisibleRange = function() {
    var end, scrollY, start, _i, _results;
    scrollY = window.scrollY;
    start = Math.floor((scrollY - size.topOffset) / size.dayHeight);
    end = start + Math.ceil((window.innerHeight + size.topOffset) / size.dayHeight);
    if (scrollY > previousScrollY) {
      end += size.rows - 1;
    } else {
      start -= size.rows - 1;
    }
    previousScrollY = scrollY;
    end = Math.min(end, model.totalWeeks);
    start = Math.max(start, 0);
    console.log("calcVisibleRange() " + (end - start) + ": [" + start + "-" + end + "]");
    return (function() {
      _results = [];
      for (var _i = start; start <= end ? _i <= end : _i >= end; start <= end ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this);
  };

  onResize = function() {
    size = new Size();
    stylesheet.remove(".calendar ol");
    stylesheet.add(".calendar ol", "height: " + size.dayHeight + "px;");
    resetElements();
    return render();
  };

  onScroll = function() {
    render();
    return onPause();
  };

  onPause = _.debounce(function() {
    return console.log("paused on " + (calcVisibleRange()));
  }, 100);

  module.exports = {
    init: init
  };

}).call(this);
