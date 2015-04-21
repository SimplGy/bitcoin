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
  console.log "block.display draw() #{blocks.length} blocks", blocks

  # What is the range of possible values?
  width = d3.scale.linear().clamp true
  width.range [20, 100]
  width.domain d3.extent(blocks, (d) -> d.transactions)
#  color = d3.scale.ordinal().range [1,2,3,4,5] #dataColors
#  color.domain [0, blockSizeLimit]
  color = d3.scale.quantize()
  color.domain [0, blockSizeLimit]
  color.range dataColors.warn

  # Group the blocks by day, render days one at a time
  blocksByDay = _.groupBy blocks, 'date'
  days = Object.keys blocksByDay
  dayEls = container.selectAll('.day').data(days, String).enter().append('div').attr('class', (d) -> "day day-#{d}")
  dayEls.append('h3').text (d) -> Moment(d).format 'LL'

  for day, data of blocksByDay
    dayEl = container.select('.day-' + day)

    # DATA JOIN
    # Join new data with old elements, if any.
    els = dayEl.selectAll('b').data(data, (d) -> d.hash) # blocks are uniquely identified by their `hash` property

    # UPDATE
    # Update old elements as needed.
    # els.attr "class", "update"

    # ENTER
    # Create new elements as needed.
    els.enter().append('b')
      .style('width',             (d) -> width(d.transactions) + 'px')
      .style('background-color',  (d) -> color d.byte_size)
      .attr('tabindex', 0)        # focusable
      .attr('class',              (d) ->
        if d.date isnt curDay then className = 'newDay'
        curDay = d.date
        return className
      )
      .attr('title',              (d) -> "
        Hash: #{d.hash.substr(-8)}
        \nWhen: #{Moment(d.block_time).fromNow()} (#{Moment(d.block_time).format('YYYY MM-DD h:mma')})
        \nTransaction Count: #{d.transactions}
        \nByte Size: #{d.byte_size}
        \nByte Limit: #{Math.round(d.byte_size/blockSizeLimit*100)}%
        \nHeight: #{d.height}
      ")
      .text((d) -> d.hash.substr(-8))
#
    # ENTER + UPDATE
    # Appending to the enter selection expands the update selection to include
    # entering elements; so, operations on the update selection after appending to
    # the enter selection will apply to both entering and updating nodes.
  #  els.text(function(d) { return d; });

    # EXIT
    # Remove old elements as needed.
    # els.exit().remove()


# External API
module.exports =
  init: init


