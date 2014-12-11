var gulp = require('gulp');
var watch = require('gulp-watch');
var jslint = require('gulp-jslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

gulp.task('js', function() {
  gulp.src([
    'js/main.js',
    'js/library.js'
  ])
  .pipe(watch([
    'js/main.js',
    'js/library.js'
  ]))
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

gulp.task('default', function() {
  // place code for your default task here
});
