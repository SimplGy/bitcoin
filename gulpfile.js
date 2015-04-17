var gulp, requireDir;

gulp = require('gulp');

requireDir = require('require-dir');

requireDir('./gulp/tasks', {
  recurse: true
});

gulp.task('default', ['clean', 'css', 'serve']);
