Moment = require 'moment'
Bacon = require 'baconjs'
config = require 'config'


pageLimit = 3 # Should bump this up but don't want to wear out my welcome on the free API
curPage  = 1
pageSize = 200
stream = new Bacon.Bus()
property = stream.toProperty()
totalBlocks = null # updated every response
property.onValue -> # You have to add an empty subscriber, otherwise future onValues will not recieve the initial value. https://github.com/baconjs/bacon.js/wiki/FAQ#why-isnt-my-property-updated
allBlocks = [] # alternative: `.scan([], '.concat()')` http://stackoverflow.com/questions/27257780/combining-all-values-in-a-bacon-stream-into-a-single-array?rq=1

# Seed with cache
# Request the first page of data
get = (page) ->
  page = page || curPage
  request = new XMLHttpRequest()
  request.open 'GET', "#{config.api}/v1/btc/all-blocks?page=#{page}&limit=#{pageSize}&sort_dir=desc&api_key=#{config.blocktrailKey}", true
  request.onerror = gotErr
  request.onload = ->
    if (request.status >= 200 && request.status < 400)
      got JSON.parse request.responseText
    else
      gotErr request
  request.send()

gotErr = -> console.warn "ajax error", arguments
got = (resp) ->
  for one in resp.data
    allBlocks.push parse one
  totalBlocks = resp.total
  curPage++
  stream.push allBlocks
  get() unless curPage > pageLimit


# Every element is parsed before it is published to the stream
parse = (one) ->
  m = new Moment one.block_time
  one.date = m.format 'YYYY-MM-DD' # css classname safe date stamp (not time), so we can detect boundaries of day by locale
  one




get() # prime the cache
window.get = get

module.exports =
  stream: stream
  property: property
  get: get
  parse: parse
