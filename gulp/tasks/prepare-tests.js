(function() {
  var browserify, config, glob, gulp, plumber, source, task;

  gulp = require('gulp');

  browserify = require('browserify');

  source = require('vinyl-source-stream');

  config = require('../config');

  plumber = require('gulp-plumber');

  glob = require('glob');

  task = function() {
    var testFiles;
    testFiles = glob.sync('./app/**/*.test.js');
    console.log("Found " + testFiles.length + " test files");
    return browserify({
      entries: testFiles,
      paths: ['./node_modules', './app/', './test/']
    }).bundle().pipe(source('test.js')).pipe(plumber()).pipe(gulp.dest('./dist/'));
  };

  gulp.task('prepare-tests', task);

  gulp.task('prepare-tests-watch', function() {
    return gulp.watch(config.js, task);
  });

  module.exports = task;

}).call(this);
