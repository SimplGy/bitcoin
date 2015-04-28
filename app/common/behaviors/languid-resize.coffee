_ = require 'lodash'


languidity = 200
handlers = []

onLanguidResize = ->
  fn() for fn in handlers






window.onresize = _.debounce onLanguidResize, languidity

module.exports =
  on: (fn) -> handlers.push fn
  #TODO: off: ->


