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
    var color, els, width;
    console.log("block.display draw() " + blocks.length + " blocks");
    width = d3.scale.linear().clamp(true);
    width.range([20, 100]);
    width.domain(d3.extent(blocks, function(d) {
      return d.transactions;
    }));
    color = d3.scale.quantize();
    color.domain([0, blockSizeLimit]);
    color.range(dataColors.warn);
    window._info.width = width;
    window._info.color = color;
    els = container.selectAll('b').data(blocks);
    return els.enter().append('b').style('width', function(d) {
      return width(d.transactions) + 'px';
    }).style('background-color', function(d) {
      return color(d.byte_size);
    }).attr('tabindex', 0).attr('title', function(d) {
      return "Hash: " + (d.hash.substr(-8)) + " \nWhen: " + (Moment(d.block_time).fromNow()) + " (" + (Moment(d.block_time).format('YYYY MM-DD h:mma')) + ") \nTransaction Count: " + d.transactions + " \nByte Size: " + d.byte_size + " \nByte Limit: " + (Math.round(d.byte_size / blockSizeLimit * 100)) + "% \nHeight: " + d.height;
    }).text(function(d) {
      return d.hash.substr(-8);
    });
  };

  module.exports = {
    init: init
  };

}).call(this);
