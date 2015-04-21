(function() {
  var browserSync, concat, config, cssmin, gulp, reload, task;

  gulp = require('gulp');

  cssmin = require('gulp-cssmin');

  concat = require('gulp-concat');

  config = require('../config');

  browserSync = require('browser-sync');

  reload = browserSync.reload;

  task = function() {
    return gulp.src(config.css).pipe(cssmin()).pipe(concat('all.css')).pipe(gulp.dest('./dist')).pipe(reload({
      stream: true
    }));
  };

  gulp.task('css', task);

  gulp.task('css-watch', function() {
    return gulp.watch(config.css, task);
  });

  module.exports = task;

}).call(this);
