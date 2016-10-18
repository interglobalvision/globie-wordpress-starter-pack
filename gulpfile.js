var gulp = require('gulp');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var util = require('gulp-util');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('main-bower-files');

var cache = require('gulp-cached');

var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var swiss = require('kouto-swiss');
var stylint = require('gulp-stylint');

var imagemin = require('gulp-imagemin');

var phplint = require('gulp-phplint');

function errorNotify(error){
  notify.onError("Error: <%= error.message %>")
  util.log(util.colors.red('Error'), error.message);
}

// PHP

gulp.task('phplint', function() {
  return gulp.src(['**/*.php', '!lib/thirdparty/**/*.php', '!lib/CMB2/**/*.php'])
  .pipe(cache('php'))
  .pipe(phplint())
  .on('error', errorNotify)
  .pipe(notify({ message: 'PHP lint task complete' }));
});

// JAVASCRIPT

gulp.task('javascript', function() {
  return gulp.src('js/main.js')
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
  return gulp.src(mainBowerFiles('**/*.js'))
  .pipe(sourcemaps.init())
  .pipe(concat('library.js'))
  .pipe(gulp.dest('js'))
  .pipe(uglify({mangle: false}))
  .on('error', errorNotify)
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('/'))
  .on('error', errorNotify)
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
  return gulp.src(['css/site.styl'])
  .pipe(plumber())
  .pipe(stylus({
    use: [
      swiss()
    ],
  }))
  .on('error', errorNotify)
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
  }))
  .on('error', errorNotify)
  .pipe(gulp.dest('css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .on('error', errorNotify)
  .pipe(gulp.dest('css'))
  .pipe(notify({ message: 'Style task complete' }));
});

gulp.task('style-library', function() {
  return gulp.src(mainBowerFiles('**/*.css'))
  .pipe(plumber())
  .pipe(concat('library.styl'))
  .on('error', errorNotify)
  .pipe(gulp.dest('css'))
  .pipe(notify({ message: 'Style library task complete' }));
});

// IMAGES

gulp.task('images', function () {
  return gulp.src('img/src/*.*')
  .pipe(cache('images'))
  .pipe(plumber())
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
  gulp.watch(['css/*.styl', 'css/responsive/*.styl'], ['style']);
  gulp.watch(['css/*.styl', 'css/responsive/*.styl'], ['style-lint']);
  gulp.watch(['img/src/*.*'], ['images']);
  gulp.watch(['**/*.php', '!lib/thirdparty/**/*.php', '!lib/CMB2/**/*.php'], ['phplint']);
});

gulp.task('build', ['build-style', 'javascript', 'javascript-library']);
gulp.task('build-style', ['style-library', 'style']);
gulp.task('default', ['watch']);