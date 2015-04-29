
/*
  The Calendar is a view management object.
  It displays calendar-shaped dom nodes and knows the following:
  - [x] What rows are currently visible
  - [ ] What days are currently displayed
  - [ ] How each day corresponds with a dom node
 */

(function() {
  var Size, availableEls, calcVisibleRange, container, dayElsByDate, daysPerRow, init, languidResize, maxDayHeight, model, onPause, onResize, onScroll, previousScrollY, render, resetElements, rowEls, rowElsByDate, size, stylesheet, _,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('lodash');

  model = require('./calendar.model');

  languidResize = require('common/behaviors/languid-resize');

  stylesheet = require('common/behaviors/stylesheet');

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
    this.rows = Math.ceil(window.innerHeight / this.dayHeight);
    return console.log(this);
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
    for (idx in rowEls) {
      row = rowEls[idx];
      if (__indexOf.call(visibleRange, idx) < 0) {
        availableEls.push(row);
        row.style.top = '';
        delete rowEls[idx];
      }
    }
    _results = [];
    for (_i = 0, _len = visibleRange.length; _i < _len; _i++) {
      idx = visibleRange[_i];
      row = availableEls.pop();
      if (!row) {
        console.warn("No row available for " + idx, availableEls);
        continue;
      }
      row.style.top = "" + (idx * size.dayHeight) + "px";
      _results.push(rowEls[idx] = row);
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
