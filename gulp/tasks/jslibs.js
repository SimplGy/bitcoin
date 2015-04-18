(function() {
  var concat, config, gulp, task;

  gulp = require('gulp');

  concat = require('gulp-concat');

  config = require('../config');

  task = function() {
    return gulp.src(config.jslibs).pipe(concat('lib.js')).pipe(gulp.dest('./dist'));
  };

  gulp.task('jslibs', task);

  gulp.task('jslibs-watch', function() {
    return gulp.watch(config.jslibs, task);
  });

  module.exports = task;

}).call(this);
