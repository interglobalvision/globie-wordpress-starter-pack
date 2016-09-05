var gulp = require('gulp');
  watch = require('gulp-watch'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  util = require('gulp-util'),
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),

  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),

  cache = require('gulp-cached'),

  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  swiss = require('kouto-swiss'),
  stylint = require('gulp-stylint'),

  imagemin = require('gulp-imagemin'),

  phplint = require('gulp-phplint');

function errorNotify(error){
  notify.onError("Error: <%= error.message %>")
  util.log(util.colors.red('Error'), error.message);
}

// PHP

gulp.task('phplint', function() {
  gulp.src(['**/*.php', '!lib/thirdparty/**/*.php', '!lib/CMB2/**/*.php'])
  .pipe(cache('php'))
  .pipe(phplint())
  .on('error', errorNotify)
  .pipe(notify({ message: 'PHP lint task complete' }));
});

// JAVASCRIPT

gulp.task('javascript', function() {
  gulp.src('js/main.js')
  .pipe(sourcemaps.init())
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jscs('.jscsrc'))
  .on('error', errorNotify)
  .pipe(uglify())
  .on('error', errorNotify)
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('/'))
  .on('error', errorNotify)
  .pipe(gulp.dest('js'))
  .pipe(notify({ message: 'Javascript task complete' }));
});

gulp.task('javascript-library', function() {
  gulp.src('js/library/*.js')
  .pipe(concat('library.js'))
  .pipe(gulp.dest('js'))
  .pipe(notify({ message: 'Javascript Library task complete' }));
});

// STYLES

gulp.task('style-lint', function () {
  return gulp.src(['css/site.styl', 'css/responsive/*.styl'])
  .pipe(cache('style-lint'))
  .pipe(plumber())
  .pipe(stylint({config: '.stylintrc'}))
  .on('error', errorNotify)
  .pipe(stylint.reporter())
  .on('error', errorNotify)
  .pipe(notify({ message: 'Style lint task complete' }));
});

gulp.task('style', function() {
  return gulp.src('css/site.styl')
  .pipe(plumber())
  .pipe(stylus({
      use: [
        swiss()
      ],
    }))
  .on('error', errorNotify)
  .pipe(autoprefixer())
  .on('error', errorNotify)
  .pipe(gulp.dest('css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .on('error', errorNotify)
  .pipe(gulp.dest('css'))
  .pipe(notify({ message: 'Style task complete' }));
});

// IMAGES

gulp.task('images', function () {
  return gulp.src('img/src/*.*')
  .pipe(cache('images'))
  .pipe(imagemin({
    progressive: false
  }))
  .on('error', errorNotify)
  .pipe(gulp.dest('img/dist'))
	.pipe(notify({ message: 'Images task complete' }));
});

// TASKS

gulp.task('watch', function() {
  gulp.watch(['js/main.js'], ['javascript']);
  gulp.watch(['js/library/*.js'], ['javascript-library']);
  gulp.watch(['css/*.styl', 'css/responsive/*.styl'], ['style']);
  gulp.watch(['css/*.styl', 'css/responsive/*.styl'], ['style-lint']);
  gulp.watch(['img/src/*.*'], ['images']);
  gulp.watch(['**/*.php', '!lib/thirdparty/**/*.php', '!lib/CMB2/**/*.php'], ['phplint']);
});

gulp.task('build', ['style', 'javascript', 'javascript-library']);
gulp.task('default', ['watch']);
