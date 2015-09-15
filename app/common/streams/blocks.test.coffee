blocks = require './blocks'

describe 'common/streams/blocks', ->

  it 'exists', ->
    expect(blocks).toBeDefined()

  describe 'property', ->
    it 'exists', ->
      expect(blocks.property).toBeDefined()

  describe 'property.onValue() and stream.push()', ->
    it 'Can send and recieve values', (done) ->
      val = null
      blocks.property.onValue ->
        expect(arguments[0]).toBe 'test msg'
        done()
      blocks.stream.push 'test msg'

