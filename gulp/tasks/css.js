(function() {
  var concat, config, cssmin, gulp, task;

  gulp = require('gulp');

  cssmin = require('gulp-cssmin');

  concat = require('gulp-concat');

  config = require('../config');

  task = function() {
    return gulp.src(config.css).pipe(cssmin()).pipe(concat('all.css')).pipe(gulp.dest('./dist'));
  };

  gulp.task('css', task);

  gulp.task('css-watch', function() {
    return gulp.watch(config.css, task);
  });

  module.exports = task;

}).call(this);
