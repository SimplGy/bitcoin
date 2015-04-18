(function() {
  var Blocks, blockSizeLimit, blocks, container, dataColors, draw, init, timeStrToInt, _;

  Blocks = require('common/collections/blocks');

  dataColors = require('common/collections/data-colors');

  _ = require('lodash');

  blocks = null;

  container = null;

  blockSizeLimit = 1000 * 1000;

  init = function() {
    console.log('BlockDisplay init');
    container = d3.select("body").append('div').attr('class', 'block-display');
    blocks = new Blocks();
    blocks.onChange(draw);
    return window._info = {
      blocks: blocks,
      container: container
    };
  };

  timeStrToInt = function(str) {
    return (new Date(str)).getTime();
  };

  draw = function() {
    var color, els, width;
    console.log("block.display draw() " + blocks.length + " blocks");
    width = d3.scale.linear().range([2, 100]);
    width.domain([0, blockSizeLimit]);
    color = d3.scale.ordinal().range(dataColors);
    color.domain([0, blockSizeLimit]);
    window._info.width = width;
    window._info.color = color;
    els = container.selectAll('b').data(blocks);
    return els.enter().append('b').style('width', function(d) {
      return (width(d.transactions)) + '%';
    }).style('background-color', function(d, i) {
      console.log("" + i + ": " + d.transactions + " -> " + (color(d.transactions)));
      return color(d.transactions);
    }).attr('title', function(d) {
      return "Hash: " + (d.hash.substr(-8)) + " \nTransaction Count: " + d.transactions + " \nByte Size: " + d.byte_size + " \nHeight: " + d.height;
    }).text(function(d) {
      return d.hash.substr(-8);
    });
  };

  module.exports = {
    init: init
  };

}).call(this);
