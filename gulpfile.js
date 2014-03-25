var jade = require('gulp-jade');
var rename = require("gulp-rename");
var path = require('path');
var gulp = require('gulp');

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('./jade/index.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./'))
});


gulp.task('default', ['templates'])