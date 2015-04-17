Blocks = require 'common/collections/blocks'
_ = require 'lodash'
blocks = null
container = null

init = ->
  console.log 'BlockDisplay init'

  container = d3.select("#DataVis")
  container.attr "width",  1000
  container.attr "height", 1000
  blocks = new Blocks()
  blocks.onChange draw

  window._blocks = blocks
  window._container = container


timeStrToInt = (str) -> (new Date(str)).getTime()


draw = ->
  console.log "block.display draw() #{blocks.length} blocks"

  # What is the range of possible values?
  x = d3.scale.linear().range([0, 1000])
  x.domain d3.extent(blocks, (d) -> d.transactions)

  y = d3.scale.linear().range([1000, 0])
  y.domain d3.extent(blocks, (d) -> timeStrToInt d.block_time)


  # Apply the values to the visual elements
  circles = container.selectAll('circle').data(blocks).enter().append 'circle'
  circles
    .attr("cx", (d) -> x d.transactions )
    .attr("cy", (d) -> y timeStrToInt d.block_time )
    .attr("r", 5 )
    .style("fill", (d) -> 'green' )
    .append("svg:title")
      .text((d) -> "Hash: #{d.hash.substr(-8)} \nTransaction Count: #{d.transactions} \nByte Size: #{d.byte_size} \nHeight: #{d.height}" )





# External API
module.exports =
  init: init


