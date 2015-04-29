require 'spoof-dom'
calendar = require './calendar.model'
moment   = require 'moment'


console.log 'testing common/ui/calendar.model'

describe "common/ui/calendar.model", ->

  it 'exists', ->
    expect(calendar).toBeDefined()

  describe 'getDatesByWeek()', ->
    it 'Returns 7 dates for this week', ->
      results = calendar.getDatesByWeek 0
      expect(results.length).toBe 7

    it 'Returns 7 dates for a week far in the past', ->
      results = calendar.getDatesByWeek 99
      expect(results.length).toBe 7

    it 'Returns the correct dates for the current week', ->
      results = calendar.getDatesByWeek 0
      now = moment()
      expectedDates = []
      for i in [0..6]
        expectedDates.push now.day(i).format calendar.formatStr
      expect(results).toEqual expectedDates
#

#    it 'returns continuous, non-overlapping days for continuous weeks', ->


#    it 'Returns the correct dates for 3 weeks ago', ->
#      results = calendar.getDatesByWeek 3
#      m = moment().subtract 3, 'weeks'
#      expectedDates = []
#      for i in [0..6]
#        expectedDates.push m.day(i).format calendar.formatStr
#      console.log "expectedDates", expectedDates
#      expect(results).toEqual expectedDates
