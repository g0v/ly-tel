var jade = require('gulp-jade');
var less = require('gulp-less');
var rename = require("gulp-rename");
var path = require('path');
var gulp = require('gulp');

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('./static/jade/index.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('less', function () {
  gulp.src('./static/less/index.less')
  	.pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});


gulp.task('default', ['templates', 'less'])