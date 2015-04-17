gulp        = require 'gulp'
concat      = require 'gulp-concat'

task = ->
  gulp.src(['bower_components/d3/d3.js'])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist'))

gulp.task 'jslibs', task
module.exports = task