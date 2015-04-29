###
  The Calendar is a view management object.
  It displays calendar-shaped dom nodes and knows the following:
  - [x] What rows are currently visible
  - [ ] What days are currently displayed
  - [ ] How each day corresponds with a dom node
###

_             = require 'lodash'
model         = require './calendar.model'
languidResize = require 'common/behaviors/languid-resize'
stylesheet    = require 'common/behaviors/stylesheet'


# --------------------------------------------------------- Variables
size = null               # An object which has precalculated the amounts and sizes of days and weeks based on screen size
container = null          # The containing `.calendar` dom element
rowEls = null             # A hash of rendered row DOM elements, keyed by index
availableEls = null       # An array of DOM elements that are off screen and can be reused
dayElsByDate = null
rowElsByDate = null
maxDayHeight = 90
daysPerRow = 7            # 7 days, so `row === week`
previousScrollY = 0       # For calculating scroll direction



Size = ->
  @dayWidth = Math.floor (1/daysPerRow) * container.offsetWidth # because window.innerWidth doesn't include the scroll bar
  @dayHeight = Math.min @dayWidth, maxDayHeight
  @topOffset = container.offsetTop
  @cols = daysPerRow
  @rows = Math.ceil window.innerHeight / @dayHeight
  console.log @

init = ->
  container = document.createElement 'div'
  container.className = 'calendar'
  document.body.appendChild container
  languidResize.on onResize
  window.onscroll = onScroll
  _.defer onResize # Don't measure until the container is in the dom

# Reset the dom elements. This should only need to be done when the screen size changes, because this means the number of elements that fit will have changed.
resetElements = ->
  container.innerHTML = ''
  availableEls = []
  rowEls = {}
  container.style.height = "#{model.totalWeeks * size.dayHeight}px"
  i = 0
  while i++ <= size.rows * 2 # Create twice as many rows as will fit on screen
    row = document.createElement 'ol'
    for dayOfWeek in [0..6]
      day = document.createElement 'li'
      day.className = "day-#{dayOfWeek}"
      row.appendChild day
    availableEls.push row
    container.appendChild row



# Look at the scroll position to determine which row indexes to draw.
# Use a pool of avaialable offscreen row elements to draw with
render = ->

  visibleRange = calcVisibleRange()

  # What is off screen? mark it unrendered
  for idx, row of rowEls
    unless idx in visibleRange
      availableEls.push row
      row.style.top = ''
      delete rowEls[idx]

  # What is on screen but not yet rendered? render it
  for idx in visibleRange
    row = availableEls.pop()
    unless row
      console.warn "No row available for #{idx}", availableEls
      continue
    row.style.top = "#{idx * size.dayHeight}px"
#    console.log "Set top of row #{idx} to #{row.style.top}"
    rowEls[idx] = row

#  console.log 'render()',
#    available: availableEls.length
#    rendered: Object.keys rows
#    domRows: container.children.length


# Calculate a visible range of rows based on sizing data, scroll position, and window height
# Returns a range of indices
calcVisibleRange = ->
  scrollY = window.scrollY
  start = Math.floor (scrollY - size.topOffset) / size.dayHeight
  end = start + Math.ceil (window.innerHeight + size.topOffset) / size.dayHeight

  # Adjust the visible range to draw more rows in the direction of the scroll
  if scrollY > previousScrollY
    end   += (size.rows - 1)
  else
    start -= (size.rows - 1)
  previousScrollY = scrollY

  # Bound the start and end by the total number of rows in the data
  end = Math.min end, model.totalWeeks
  start = Math.max start, 0

  console.log "calcVisibleRange() #{end - start}: [#{start}-#{end}]"
  return [start..end]



# ---------------------------------------------------- Event Handlers

onResize = ->
  size = new Size()
  stylesheet.remove ".calendar ol"
  stylesheet.add    ".calendar ol", "height: #{size.dayHeight}px;"
  resetElements()
  render()

onScroll = ->
  render()
  onPause()

onPause = _.debounce ->
  console.log "paused on #{calcVisibleRange()}"
, 100


#  container = d3.select("body").append('ol').attr 'class', 'calendar'
#  els = container.selectAll('li').data(d3.entries(model), (d) -> d.key) # blocks are uniquely identified by their `hash` property
#  els.enter().append('li').text (d) -> d.key





module.exports =
  init: init