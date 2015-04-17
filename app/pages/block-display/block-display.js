(function() {
  var Blocks, blocks, container, draw, init, timeStrToInt, _;

  Blocks = require('common/collections/blocks');

  _ = require('lodash');

  blocks = null;

  container = null;

  init = function() {
    console.log('BlockDisplay init');
    container = d3.select("#DataVis");
    container.attr("width", 1000);
    container.attr("height", 1000);
    blocks = new Blocks();
    blocks.onChange(draw);
    window._blocks = blocks;
    return window._container = container;
  };

  timeStrToInt = function(str) {
    return (new Date(str)).getTime();
  };

  draw = function() {
    var circles, x, y;
    console.log("block.display draw() " + blocks.length + " blocks");
    x = d3.scale.linear().range([0, 1000]);
    x.domain(d3.extent(blocks, function(d) {
      return d.transactions;
    }));
    y = d3.scale.linear().range([1000, 0]);
    y.domain(d3.extent(blocks, function(d) {
      return timeStrToInt(d.block_time);
    }));
    circles = container.selectAll('circle').data(blocks).enter().append('circle');
    return circles.attr("cx", function(d) {
      return x(d.transactions);
    }).attr("cy", function(d) {
      return y(timeStrToInt(d.block_time));
    }).attr("r", 5).style("fill", function(d) {
      return 'green';
    }).append("svg:title").text(function(d) {
      return "Hash: " + (d.hash.substr(-8)) + " \nTransaction Count: " + d.transactions + " \nByte Size: " + d.byte_size + " \nHeight: " + d.height;
    });
  };

  module.exports = {
    init: init
  };

}).call(this);
