var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var series = require('stream-series');
var ngAnnotate = require('gulp-ng-annotate');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

gulp.task('js', function() {
    return series(gulp.src('js/js/*.js'))
      .pipe(concat('angular.js'))
      .pipe(ngAnnotate())
      .pipe(uglify()).on('error', gutil.log)
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js'))
      .pipe(livereload());
});

gulp.task('scripts', function() {
    return series(gulp.src('js/app.js'),
                  gulp.src('js/services/*.js'),
                  gulp.src('js/controllers/*.js'),
                  gulp.src('js/directives/*.js')
                  )
      .pipe(concat('main.js'))
      .pipe(ngAnnotate())
      .pipe(uglify()).on('error', gutil.log)
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js'))
      .pipe(livereload());
});

gulp.task('sass', function() {
  return gulp.src('scss/main.scss')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css/'))
        .pipe(livereload());
});

gulp.task('default', ['sass', 'scripts'], function() {
  livereload.listen();
  gulp.watch(['scss/*.scss', 'scss/**/*.scss', 'js/**/*.js'], ['sass', 'scripts']);
});