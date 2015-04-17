(function() {
  var browserify, gulp, source, task;

  gulp = require('gulp');

  browserify = require('browserify');

  source = require('vinyl-source-stream');

  task = function() {
    return browserify({
      entries: './app/index.js',
      paths: ['./node_modules', './app/']
    }).bundle().pipe(source('all.js')).pipe(gulp.dest('./dist/'));
  };

  gulp.task('browserify', task);

  module.exports = task;

}).call(this);
