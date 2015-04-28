model = require './calendar.model'
languidResize = require 'common/behaviors/languid-resize'
_ = require 'lodash'



maxDayHeight = 100
size = null
container = null
daysPerRow = 7 # A week
rows = {} # A hash of rendered row DOM elements, keyed by index
availableRows = [] # An array of DOM elements that are off screen and can be reused
previousScrollY = 0

Size = ->
  @dayWidth = Math.floor (1/daysPerRow) * container.offsetWidth # because window.innerWidth doesn't include the scroll bar
  @dayHeight = Math.min @dayWidth, maxDayHeight
  @cols = daysPerRow
  @topOffset = container.offsetTop
  @rows = Math.ceil window.innerHeight / @dayHeight
  console.log @

init = ->
  container = document.createElement 'div'
  container.className = 'calendar'
  document.body.appendChild container
  languidResize.on onResize
  window.onscroll = onScroll
  _.defer -> # Don't measure until the container is in the dom
    onResize()
    render()

# Reset the dom elements. This should only need to be done when the screen size changes, because this means the number of elements that fit will have changed.
resetElements = ->
  container.innerHTML = ''
  i = 0
  while i++ < size.rows * 2 # Create twice as many rows as will fit on screen
    row = document.createElement 'ol'
    row.className = 'row'
    row.style.height = "#{size.dayHeight}px"
    for dayOfWeek in [1..7]
      day = document.createElement 'li'
      day.className = "day-#{dayOfWeek}"
      row.appendChild day
    availableRows.push row
    container.appendChild row



# Look at the scroll position to determine which row indexes to draw.
# Add those dom elements, TODO: remove old ones
render = ->
  scrollY = window.scrollY
  start = Math.floor (scrollY - size.topOffset) / size.dayHeight
  end = start + Math.ceil (window.innerHeight + size.topOffset) / size.dayHeight

  # Adjust the visible range to draw more ahead in the direction of the scroll
#  scrollDirection = if scrollY > previousScrollY then 1 else -1
  if scrollY > previousScrollY
    end   += (size.rows - 1)
  else
    start -= (size.rows - 1)
  previousScrollY = scrollY

  visibleRange = [start..end]

  # What is off screen? mark it unrendered
  for idx, row of rows
    unless idx in visibleRange
      availableRows.push row
      delete rows[idx]

  # What is on screen but not yet rendered? render it
  for idx in visibleRange
    continue if idx < 0
    row = availableRows.pop()
    unless row
      console.warn "No row available for #{idx}", availableRows
      continue
    row.style.top = "#{idx * size.dayHeight}px"
#    console.log "Set top of row #{idx} to #{row.style.top}"
    rows[idx] = row

  console.log 'render()',
    visible: "#{end - start}: [#{start}-#{end}]"
    available: availableRows.length
    rendered: Object.keys rows
    domRows: container.children.length

#  if (Object.keys(rows).length isnt container.children.length)
#    console.warn "Number of rows in data structure doesn't match count in DOM",
#      rows: rows
#      rowEls: container.children

# Remove any old rows
# Rows are old if they are in the rows cache but not in the new range
markOffScreenRows = (visibleRange) ->
#  renderedRange = Object.keys rows
#  expired = _.difference renderedRange, newRange
#  console.log "cleanUp", expired
#  for idx in expired
#    el = rows[idx]






# ---------------------------------------------------- Event Handlers

onResize = ->
  size = new Size()
  resetElements()

onScroll = render
#onScroll = _.debounce ->
#  render()
#, 20





#  container = d3.select("body").append('ol').attr 'class', 'calendar'
#  els = container.selectAll('li').data(d3.entries(model), (d) -> d.key) # blocks are uniquely identified by their `hash` property
#  els.enter().append('li').text (d) -> d.key





module.exports =
  init: init