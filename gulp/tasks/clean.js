(function() {
  var config, del, gulp, task;

  gulp = require('gulp');

  del = require('del');

  config = require('../config');

  task = function(cb) {
    return del([config.dist], cb);
  };

  gulp.task('clean', task);

  module.exports = task;

}).call(this);
