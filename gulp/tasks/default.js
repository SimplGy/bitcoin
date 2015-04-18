(function() {
  var gulp;

  gulp = require('gulp');

  gulp.task('default', ['clean', 'css', 'css-watch', 'jslibs', 'jslibs-watch', 'browserify', 'browserify-watch', 'serve']);

}).call(this);
