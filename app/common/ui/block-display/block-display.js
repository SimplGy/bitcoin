(function() {
  var Blocks, Moment, blockSizeLimit, blocks, blocksPerDay, blocksPerHour, container, dataColors, draw, init, timeStrToInt, _;

  Blocks = require('common/collections/blocks');

  dataColors = require('common/collections/data-colors');

  _ = require('lodash');

  Moment = require('moment');

  blocks = null;

  container = null;

  blockSizeLimit = 1000 * 1000;

  blocksPerHour = 6;

  blocksPerDay = blocksPerHour * 24;

  init = function() {
    console.log('BlockDisplay init');
    container = d3.select("body").append('div').attr('class', 'block-display');
    blocks = new Blocks();
    blocks.onChange(draw);
    return window._info = {
      blocks: blocks,
      container: container,
      Moment: Moment
    };
  };

  timeStrToInt = function(str) {
    return (new Date(str)).getTime();
  };

  draw = function() {
    var blocksByDay, color, data, day, dayEl, dayEls, days, els, width, _results;
    console.log("block.display draw() " + blocks.length + " blocks", blocks);
    width = d3.scale.linear().clamp(true);
    width.range([20, 100]);
    width.domain(d3.extent(blocks, function(d) {
      return d.transactions;
    }));
    color = d3.scale.quantize();
    color.domain([0, blockSizeLimit]);
    color.range(dataColors.warn);
    blocksByDay = _.groupBy(blocks, 'date');
    days = Object.keys(blocksByDay);
    dayEls = container.selectAll('.day').data(days, String).enter().append('div').attr('class', function(d) {
      return "day day-" + d;
    });
    dayEls.append('h3').text(function(d) {
      return Moment(d).format('LL');
    });
    _results = [];
    for (day in blocksByDay) {
      data = blocksByDay[day];
      dayEl = container.select('.day-' + day);
      els = dayEl.selectAll('b').data(data, function(d) {
        return d.hash;
      });
      _results.push(els.enter().append('b').style('width', function(d) {
        return width(d.transactions) + 'px';
      }).style('background-color', function(d) {
        return color(d.byte_size);
      }).attr('tabindex', 0).attr('class', function(d) {
        var className, curDay;
        if (d.date !== curDay) {
          className = 'newDay';
        }
        curDay = d.date;
        return className;
      }).attr('title', function(d) {
        return "Hash: " + (d.hash.substr(-8)) + " \nWhen: " + (Moment(d.block_time).fromNow()) + " (" + (Moment(d.block_time).format('YYYY MM-DD h:mma')) + ") \nTransaction Count: " + d.transactions + " \nByte Size: " + d.byte_size + " \nByte Limit: " + (Math.round(d.byte_size / blockSizeLimit * 100)) + "% \nHeight: " + d.height;
      }).text(function(d) {
        return d.hash.substr(-8);
      }));
    }
    return _results;
  };

  module.exports = {
    init: init
  };

}).call(this);
