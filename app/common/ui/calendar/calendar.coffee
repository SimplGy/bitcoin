model = require './calendar.model'

init = ->
  console.log 'calendar init()'
  container = d3.select("body").append('ol').attr 'class', 'calendar'






module.exports =
  init: init