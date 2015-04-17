var browserify, gulp, source, task;

gulp = require('gulp');

browserify = require('browserify');

source = require('vinyl-source-stream');

task = function() {
  return browserify('./app/index.js').bundle().pipe(source('all.js')).pipe(gulp.dest('./dist/'));
};

gulp.task('browserify', task);

module.exports = task;
