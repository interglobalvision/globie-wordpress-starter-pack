var gulp = require('gulp');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var util = require('gulp-util');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

var stylus = require('gulp-stylus');
// var csslint = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

var jpegoptim = require('imagemin-jpegoptim');
var pngquant = require('imagemin-pngquant');
var optipng = require('imagemin-optipng');
var svgo = require('imagemin-svgo');

function errorNotify(error){
  notify.onError("Error: <%= error.message %>")
  util.log(util.colors.red('Error'), error.message);
}

gulp.task('js', function() {
  gulp.src([
    'js/main.js',
    'js/library.js'
  ])
  .pipe(jshint({
    browser: true,
    devel: true,
    unused: true,
    indent: 2,
  }))
  .pipe(jshint.reporter('jshint-stylish'))
  .on('error', errorNotify)
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

gulp.task('images', function () {
  return gulp.src('img/src/**/*.{png,jpg,jpeg,gif,svg}')
  .pipe(optipng({optimizationLevel: 3})())
  .pipe(pngquant({quality: '65-80', speed: 4})())
  .pipe(jpegoptim({max: 70})())
  .pipe(svgo()())
  .pipe(gulp.dest('img/dist'));
});

gulp.task('watch', function() {
  gulp.watch(['js/main.js'], ['js']);
  gulp.watch(['css/site.styl'], ['style']);
  gulp.watch(['img/src/**'], ['images']);
});

gulp.task('default', ['watch']);
