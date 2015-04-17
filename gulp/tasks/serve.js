(function() {
  var browserSync, gulp, reload, task;

  gulp = require('gulp');

  browserSync = require('browser-sync');

  reload = browserSync.reload;

  task = function() {
    browserSync({
      server: {
        baseDir: './'
      }
    });
    return gulp.watch(['index.html', 'dist/**'], {
      cwd: './'
    }, reload);
  };

  gulp.task('serve', task);

  module.exports = task;

}).call(this);
