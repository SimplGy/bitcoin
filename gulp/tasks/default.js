var gulp;

gulp = require('gulp');

gulp.task('default', ['clean', 'css', 'jslibs', 'browserify', 'serve']);
