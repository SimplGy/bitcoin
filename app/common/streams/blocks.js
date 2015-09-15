(function() {
  var Bacon, Moment, allBlocks, config, curPage, get, got, gotErr, pageLimit, pageSize, parse, property, stream, totalBlocks;

  Moment = require('moment');

  Bacon = require('baconjs');

  config = require('config');

  pageLimit = 3;

  curPage = 1;

  pageSize = 200;

  stream = new Bacon.Bus();

  property = stream.toProperty();

  totalBlocks = null;

  property.onValue(function() {});

  allBlocks = [];

  get = function(page) {
    var request;
    page = page || curPage;
    request = new XMLHttpRequest();
    request.open('GET', "" + config.api + "/v1/btc/all-blocks?page=" + page + "&limit=" + pageSize + "&sort_dir=desc&api_key=" + config.blocktrailKey, true);
    request.onerror = gotErr;
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        return got(JSON.parse(request.responseText));
      } else {
        return gotErr(request);
      }
    };
    return request.send();
  };

  gotErr = function() {
    return console.warn("ajax error", arguments);
  };

  got = function(resp) {
    var one, _i, _len, _ref;
    _ref = resp.data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      one = _ref[_i];
      allBlocks.push(parse(one));
    }
    totalBlocks = resp.total;
    curPage++;
    stream.push(allBlocks);
    if (!(curPage > pageLimit)) {
      return get();
    }
  };

  parse = function(one) {
    var m;
    m = new Moment(one.block_time);
    one.date = m.format('YYYY-MM-DD');
    return one;
  };

  get();

  window.get = get;

  module.exports = {
    stream: stream,
    property: property,
    get: get,
    parse: parse
  };

}).call(this);
