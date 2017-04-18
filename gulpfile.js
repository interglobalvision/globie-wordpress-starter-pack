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
var cleanCSS = require('gulp-clean-css');
var swiss = require('kouto-swiss');
var stylint = require('gulp-stylint');

var imagemin = require('gulp-imagemin');

function errorNotify(error){
  notify.onError("Error: <%= error.message %>")
  util.log(util.colors.red('Error'), error.message);
}

// JAVASCRIPT

gulp.task('javascript', function() {
  return gulp.src('src/js/main.js')
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
  .pipe(gulp.dest('dist/js'))
  .pipe(notify({ message: 'Javascript task complete' }));
});

gulp.task('javascript-library', function() {
  return gulp.src(mainBowerFiles('**/*.js'))
  .pipe(sourcemaps.init())
  .pipe(concat('library.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(uglify({mangle: false}))
  .on('error', errorNotify)
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('/'))
  .on('error', errorNotify)
  .pipe(gulp.dest('dist/js'))
  .pipe(notify({ message: 'Javascript Library task complete' }));
});

// STYLES

gulp.task('style-lint', function () {
  return gulp.src(['src/styl/site.styl', 'src/styl/responsive/*.styl'])
  .pipe(cache('style-lint'))
  .pipe(plumber())
  .pipe(stylint({config: '.stylintrc'}))
  .on('error', errorNotify)
  .pipe(stylint.reporter())
  .on('error', errorNotify)
  .pipe(notify({ message: 'Style lint task complete' }));
});

gulp.task('style', function() {
  return gulp.src(['src/styl/site.styl'])
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
  .pipe(rename({suffix: '.min'}))
  .pipe(cleanCSS())
  .on('error', errorNotify)
  .pipe(gulp.dest('dist/css'))
  .pipe(notify({ message: 'Style task complete' }));
});

gulp.task('style-library', function() {
  return gulp.src(mainBowerFiles('**/*.css'))
  .pipe(plumber())
  .pipe(concat('library.styl'))
  .on('error', errorNotify)
  .pipe(gulp.dest('src/styl/library'))
  .pipe(notify({ message: 'Style library task complete' }));
});

// IMAGES

gulp.task('images', function () {
  return gulp.src('src/img/**.*')
  .pipe(cache('images'))
  .pipe(plumber())
  .pipe(imagemin({
    progressive: false
  }))
  .on('error', errorNotify)
  .pipe(gulp.dest('dist/img'))
	.pipe(notify({ message: 'Images task complete' }));
});

// TASKS

gulp.task('watch', function() {
  gulp.watch(['src/js/main.js'], ['javascript']);
  gulp.watch(['src/styl/**.styl', 'css/responsive/*.styl'], ['style']);
  gulp.watch(['src/styl/**.styl', 'css/responsive/*.styl'], ['style-lint']);
  gulp.watch(['src/img/**.*'], ['images']);
});

gulp.task('build', ['style', 'style-library', 'javascript', 'javascript-library', 'images']);
gulp.task('build-style', ['style-library', 'style']);
gulp.task('default', ['watch']);
