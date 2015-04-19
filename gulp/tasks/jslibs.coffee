gulp        = require 'gulp'
concat      = require 'gulp-concat'
config      = require '../config'

task = ->
  gulp.src(config.jslibs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist'))

gulp.task 'jslibs', task
gulp.task 'jslibs-watch', -> gulp.watch config.jslibs, task
module.exports = task
