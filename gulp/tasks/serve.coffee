gulp        = require 'gulp'
browserSync = require 'browser-sync'
reload      = browserSync.reload

# watch files for changes and reload
task = ->
  browserSync server: baseDir: './'
  gulp.watch ['index.html', 'dist/**'], {cwd: './'}, reload

gulp.task 'serve', task
module.exports = task