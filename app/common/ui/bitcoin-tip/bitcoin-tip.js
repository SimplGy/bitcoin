(function() {
  var address, attr, init, makeQr, sel;

  attr = 'bitcoin-tip-address';

  sel = "[" + attr + "]";

  address = null;

  makeQr = function(addr) {
    return "https://chart.googleapis.com/chart?cht=qr&chl=bitcoin:" + addr + "?amount=0.02&choe=UTF-8&chs=300x300";
  };

  init = function() {
    var el;
    el = document.querySelector(sel);
    if (!el) {
      return console.warn("Can't create a tip button without an element " + sel);
    }
    address = el.getAttribute(attr);
    if (!address) {
      return console.warn("Can't make a meaningful tip button without an address", el);
    }
    el.className += ' bitcoin-tip';
    el.href = makeQr(address);
    return el.target = '_blank';
  };

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

}).call(this);
