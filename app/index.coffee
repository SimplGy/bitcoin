calendar = require 'common/ui/calendar/calendar'
require 'common/ui/bitcoin-tip/bitcoin-tip'

onReady = ->
  FastClick.attach document.body
  calendar.init()


if document.readyState != 'loading'
  onReady()
else
  document.addEventListener 'DOMContentLoaded', onReady
