Blocks      = require 'common/collections/blocks'
dataColors  = require 'common/collections/data-colors'
_           = require 'lodash'
Moment      = require 'moment'

blocks = null
container = null
blockSizeLimit = 1000 * 1000
blocksPerHour = 6
blocksPerDay = blocksPerHour * 24


init = ->
  console.log 'BlockDisplay init'

  container = d3.select("body").append('div').attr 'class', 'block-display'
  blocks = new Blocks()
  blocks.onChange draw

  window._info =
    blocks: blocks
    container: container
    Moment: Moment


timeStrToInt = (str) -> (new Date(str)).getTime()


draw = ->
  console.log "block.display draw() #{blocks.length} blocks"

  # What is the range of possible values?
  width = d3.scale.linear().clamp true
  width.range [20, 100]
  width.domain d3.extent(blocks, (d) -> d.transactions)
#  color = d3.scale.ordinal().range [1,2,3,4,5] #dataColors
#  color.domain [0, blockSizeLimit]
  color = d3.scale.quantize()
  color.domain [0, blockSizeLimit]
  color.range dataColors.warn

  window._info.width = width
  window._info.color = color

#  y = d3.scale.linear().range([1000, 0])
#  y.domain d3.extent(blocks, (d) -> timeStrToInt d.block_time)


  # Apply the values to the visual elements
#  circles = container.selectAll('circle').data(blocks).enter().append 'circle'
#  circles
#    .attr("cx", (d) -> x d.transactions )
#    .attr("cy", (d) -> y timeStrToInt d.block_time )
#    .attr("r", 5 )
#    .style("fill", (d) -> 'green' )
#    .append("svg:title")
#      .text((d) -> "Hash: #{d.hash.substr(-8)} \nTransaction Count: #{d.transactions} \nByte Size: #{d.byte_size} \nHeight: #{d.height}" )


  # DATA JOIN
  # Join new data with old elements, if any.
  els = container.selectAll('b').data(blocks)

  # UPDATE
  # Update old elements as needed.
#  els.attr "class", "update"

  # ENTER
  # Create new elements as needed.
  els.enter().append('b')
    .style('width', (d) -> width(d.transactions) + 'px')
    .style('background-color', (d) -> color d.byte_size)
    .attr('tabindex', 0) # focusable
    .attr('title', (d) -> "
      Hash: #{d.hash.substr(-8)}
      \nWhen: #{Moment(d.block_time).fromNow()} (#{Moment(d.block_time).format('YYYY MM-DD h:mma')})
      \nTransaction Count: #{d.transactions}
      \nByte Size: #{d.byte_size}
      \nByte Limit: #{Math.round(d.byte_size/blockSizeLimit*100)}%
      \nHeight: #{d.height}
    ")
    .text((d) -> d.hash.substr(-8))

  # ENTER + UPDATE
  # Appending to the enter selection expands the update selection to include
  # entering elements; so, operations on the update selection after appending to
  # the enter selection will apply to both entering and updating nodes.
#  els.text(function(d) { return d; });

  # EXIT
  # Remove old elements as needed.
#  els.exit().remove()


# External API
module.exports =
  init: init


