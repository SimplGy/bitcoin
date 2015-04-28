calendar = require 'common/ui/calendar/calendar'

onReady = ->
  FastClick.attach document.body
  calendar.init()


if document.readyState != 'loading'
  onReady()
else
  document.addEventListener 'DOMContentLoaded', onReady
