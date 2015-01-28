var gulp = require('gulp');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var util = require('gulp-util');

var jslint = require('gulp-jslint');
var uglify = require('gulp-uglify');

var stylus = require('gulp-stylus');
// var csslint = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

function errorNotify(error){
  notify.onError("Error: <%= error.message %>")
  util.log(util.colors.red('Error'), error.message);
}

gulp.task('js', function() {
  gulp.src([
    'js/main.js',
    'js/library.js'
  ])
  .pipe(jslint())
  .on('error', function (error) {
    console.error(String(error));
  })
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('js'))
  .pipe(notify({ message: 'Js task complete' }));
});

gulp.task('style', function() {
  return gulp.src('css/site.styl')
  .pipe(stylus())
  .on('error', errorNotify)
  .pipe(autoprefixer())
  .on('error', errorNotify)
  //     .pipe(csslint())
  .pipe(gulp.dest('css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .on('error', errorNotify)
  .pipe(gulp.dest('css'))
  .pipe(notify({ message: 'Style task complete' }));
});

gulp.task('watch', function() {
  gulp.watch(['js/main.js'], ['js']);
  gulp.watch(['css/site.styl'], ['style']);
});

gulp.task('default', ['watch']);
