gulp        = require 'gulp'
requireDir  = require 'require-dir'   # Require all tasks in gulp/tasks

requireDir './gulp/tasks', { recurse: true }

gulp.task 'default', [
  'clean',
  'css',
  'serve'
]