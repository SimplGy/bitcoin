gulp        = require 'gulp'
browserify  = require 'browserify'
source      = require 'vinyl-source-stream'
config      = require '../config'
plumber     = require 'gulp-plumber'
glob        = require 'glob'


# Get browserify to accept a glob of entry points
# http://stackoverflow.com/questions/24087791/browserify-multiple-entry-points
task = ->
  testFiles = glob.sync './app/**/*.test.js'
  console.log "Found #{testFiles.length} test files"
  browserify(
    entries: testFiles
    paths: [ './node_modules','./app/' ] # https://github.com/greypants/gulp-starter/issues/17
  )
  .bundle()
  .pipe( source('test.js') )
  .pipe( plumber() )
  .pipe( gulp.dest('./dist/') )



gulp.task 'prepare-tests', task
gulp.task 'prepare-tests-watch', -> gulp.watch config.js, task
module.exports = task