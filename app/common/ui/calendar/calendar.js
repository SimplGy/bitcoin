(function() {
  var Size, availableRows, calcVisibleRange, container, daysPerRow, init, languidResize, maxDayHeight, model, onResize, onScroll, previousScrollY, render, resetElements, rows, size, stylesheet, _,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('lodash');

  model = require('./calendar.model');

  languidResize = require('common/behaviors/languid-resize');

  stylesheet = require('common/behaviors/stylesheet');

  size = null;

  container = null;

  rows = null;

  availableRows = null;

  maxDayHeight = 100;

  daysPerRow = 7;

  previousScrollY = 0;

  Size = function() {
    this.dayWidth = Math.floor((1 / daysPerRow) * container.offsetWidth);
    this.dayHeight = Math.min(this.dayWidth, maxDayHeight);
    this.cols = daysPerRow;
    this.topOffset = container.offsetTop;
    this.rows = Math.ceil(window.innerHeight / this.dayHeight);
    this.totalRows = Math.ceil(model.totalDays / 7) + 1;
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
    availableRows = [];
    rows = {};
    container.style.height = "" + (size.totalRows * size.dayHeight) + "px";
    i = 0;
    _results = [];
    while (i++ <= size.rows * 2) {
      row = document.createElement('ol');
      for (dayOfWeek = _i = 1; _i <= 7; dayOfWeek = ++_i) {
        day = document.createElement('li');
        day.className = "day-" + dayOfWeek;
        row.appendChild(day);
      }
      availableRows.push(row);
      _results.push(container.appendChild(row));
    }
    return _results;
  };

  render = function() {
    var idx, row, visibleRange, _i, _len, _results;
    visibleRange = calcVisibleRange();
    for (idx in rows) {
      row = rows[idx];
      if (__indexOf.call(visibleRange, idx) < 0) {
        availableRows.push(row);
        row.style.top = null;
        delete rows[idx];
      }
    }
    _results = [];
    for (_i = 0, _len = visibleRange.length; _i < _len; _i++) {
      idx = visibleRange[_i];
      row = availableRows.pop();
      if (!row) {
        console.warn("No row available for " + idx, availableRows);
        continue;
      }
      row.style.top = "" + (idx * size.dayHeight) + "px";
      _results.push(rows[idx] = row);
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
    end = Math.min(end, size.totalRows);
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

  onScroll = render;

  module.exports = {
    init: init
  };

}).call(this);
