var chalk, filenames, fs, gulp, path, _;

gulp = require('gulp');

fs = require('fs');

chalk = require('chalk');

path = require('path');

_ = require('lodash');

filenames = fs.readdirSync('./gulp/tasks');

filenames = _.unique(_.map(filenames, function(name) {
  return path.parse(name).name;
}));

filenames.forEach(function(name) {
  console.log(chalk.blue(name));
  return gulp.task(name, require('./tasks/' + name));
});

module.exports = gulp;
