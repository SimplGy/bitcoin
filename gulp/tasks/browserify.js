(function() {
  var browserify, config, gulp, source, task;

  gulp = require('gulp');

  browserify = require('browserify');

  source = require('vinyl-source-stream');

  config = require('../config');

  task = function() {
    return browserify({
      entries: './app/index.js',
      paths: ['./node_modules', './app/']
    }).bundle().pipe(source('all.js')).pipe(gulp.dest('./dist/'));
  };

  gulp.task('browserify', task);

  gulp.task('browserify-watch', function() {
    return gulp.watch(config.js, task);
  });

  module.exports = task;

}).call(this);
