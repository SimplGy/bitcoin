moment      = require 'moment'

# A data model that matches the needs of the calendar exactly
# Stores data per day in this format:
# {
#   "2015-04-28": {
#     month: "Apr"
#     blocks: [...], // Array of blocks for Apr 28th
#   }
# }
#
# Persists data to localstorage when a day is older than 3 days, because blocks are practically unchangeable once confirmed that long.

# Genesis was 3 Jan 2009. Round to 1 Jan and assume there are no blocks before that.
genesis = 2009
genesisMoment = moment("#{genesis}-01-01", 'YYYY-MM-MM')
monthNames = {
  '01': 'Jan'
  '02': 'Feb'
  '03': 'Mar'
  '04': 'Apr'
  '05': 'May'
  '06': 'Jun'
  '07': 'Jul'
  '08': 'Aug'
  '09': 'Sep'
  '10': 'Oct'
  '11': 'Nov'
  '12': 'Dec'
}



Model = ->
  @buildEmptyStructure()
  @cacheLoad()
  @cacheSave()
  console.log 'calendar.model', @
  return undefined


Model.prototype =

  # Build empty placeholders for all dates from now until the beginning of bitcoin
  # Adds the month name for convenience
  buildEmptyStructure: ->
    now = new Date()
    @totalDays  = moment().diff genesisMoment, 'days'
    @totalWeeks = Math.ceil(@totalDays / 7) + 1
    curYear  = now.getFullYear()
    curMonth = now.getMonth() + 1 # JS months are 0 indexed
    for year in [genesis .. curYear]
      endingMonth = if year is curYear then curMonth else 12
      for month in [1..endingMonth]
        if month < 10 then month = '0' + month
        endingDay = moment("#{year}-#{month}", 'YYYY-MM').daysInMonth()
        for day in [1..endingDay]
          if day < 10 then day = '0' + day
          dateKey = "#{year}-#{month}-#{day}"
          @[dateKey] = month: monthNames[month]
#          name: m('2009-04', 'YYYY-MM').format('MMM') # The name of this month


  # Check localStorage and fill in our data structure with anything that exists there
  cacheLoad: ->
    for own key of @
      continue unless item = localStorage?[key]
      item = JSON.parse item
      console.log "Cache Contained #{key}", item
      @[key] = item


  cacheClear: ->
    localStorage?.clear()


  # Store the data structure in localStorage
  # Only store months which have some data populated
  cacheSave: ->
    for own key, val of @
      continue unless val.blocks?
      localStorage?[key] = JSON.stringify val



# Given a month in the format "2015-04", pull it out of localstorage.
# TODO: request the data for the month if it's not in there.
#getMonth = (str) ->




m = new Model()
window._cal = m # debugging
module.exports = m




