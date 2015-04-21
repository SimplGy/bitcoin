gulp        = require 'gulp'
cssmin      = require 'gulp-cssmin'
concat      = require 'gulp-concat'
config      = require '../config'
browserSync = require 'browser-sync'
reload      = browserSync.reload

task = ->
  gulp.src(config.css)
    .pipe(cssmin())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist'))
    .pipe( reload stream:true )


gulp.task 'css', task
gulp.task 'css-watch', -> gulp.watch config.css, task
module.exports = task