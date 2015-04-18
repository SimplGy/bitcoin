gulp        = require 'gulp'
browserify  = require 'browserify'
source      = require('vinyl-source-stream')
config      = require '../config'

task = ->
  browserify(
    entries: './app/index.js'
    paths: [ './node_modules','./app/' ] # https://github.com/greypants/gulp-starter/issues/17
  )
    .bundle()
    .pipe(source('all.js'))      # Pass desired output filename to vinyl-source-stream
    .pipe(gulp.dest('./dist/'))  # Start piping stream to tasks!


gulp.task 'browserify', task
gulp.task 'browserify-watch', -> gulp.watch config.js, task
module.exports = task