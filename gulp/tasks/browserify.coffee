gulp        = require 'gulp'
browserify  = require 'browserify'
source      = require('vinyl-source-stream');

task = ->
  browserify('./app/index.js')
  .bundle()
  # Pass desired output filename to vinyl-source-stream
  .pipe(source('all.js'))
  # Start piping stream to tasks!
  .pipe(gulp.dest('./dist/'))

gulp.task('browserify', task);
module.exports = task;