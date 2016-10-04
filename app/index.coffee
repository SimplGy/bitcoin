blockDisplay = require 'common/ui/block-display/block-display'
require 'common/ui/bitcoin-tip/bitcoin-tip'

onReady = ->
  FastClick.attach document.body
  blockDisplay.init()


if document.readyState != 'loading'
  onReady()
else
  document.addEventListener 'DOMContentLoaded', onReady
