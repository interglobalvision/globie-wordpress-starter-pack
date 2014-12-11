var gulp = require('gulp');
var watch = require('gulp-watch');
var jslint = require('gulp-jslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

var stylus = require('gulp-stylus');
var concatCss = require('gulp-concat-css');
var csslint = require('gulp-csslint');

gulp.task('js', function() {
  gulp.src([
    'js/main.js',
    'js/library.js'
  ])
    .pipe(jslint({
      reporter: function (evt) {
        var msg = ' ' + evt.file;
        if (evt.pass) {
            msg = '[PASS]' + msg;
        } else {
            msg = '[FAIL]' + msg;
        }
        console.log(msg);
      }
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'Js task complete' }));
});

gulp.task('style', function() {
  gulp.src([
    'css/reset.styl',
    'css/site.styl',
  ])
    .pipe(stylus())
    .pipe(concatCss('site.css'))
    .pipe(csslint())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Style task complete' }));
});

gulp.task('watch', function() {
  gulp.watch(['js/main.js'], ['js']);
  gulp.watch(['css/site.styl'], ['style']);
});

gulp.task('default', ['watch']);
