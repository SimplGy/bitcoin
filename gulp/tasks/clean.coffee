gulp        = require 'gulp'
del         = require 'del'
config      = require '../config'

task = (cb) -> del [ config.dist ], cb
gulp.task 'clean', task
module.exports = task