gulp    = require 'gulp'
fs      = require 'fs'
chalk   = require 'chalk'
path    = require 'path'
_       = require 'lodash'

filenames = fs.readdirSync './gulp/tasks'
filenames = _.unique _.map filenames, (name) -> path.parse(name).name
filenames.forEach (name) ->
  console.log chalk.blue name
  gulp.task(name, require('./tasks/' + name));

module.exports = gulp