var browserify, gulp, task;

gulp = require('gulp');

browserify = require('browserify');

task = function() {
  return browserify('./app/index.js').bundle().pipe(source('all.js')).pipe(gulp.dest('./dist/'));
};

gulp.task('browserify', task);

module.exports = task;
