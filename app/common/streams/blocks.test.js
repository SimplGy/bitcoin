(function() {
  var blocks;

  blocks = require('./blocks');

  describe('common/streams/blocks', function() {
    it('exists', function() {
      return expect(blocks).toBeDefined();
    });
    describe('property', function() {
      return it('exists', function() {
        return expect(blocks.property).toBeDefined();
      });
    });
    return describe('property.onValue() and stream.push()', function() {
      return it('Can send and recieve values', function(done) {
        var val;
        val = null;
        blocks.property.onValue(function() {
          expect(arguments[0]).toBe('test msg');
          return done();
        });
        return blocks.stream.push('test msg');
      });
    });
  });

}).call(this);
